import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Canvas as FabricCanvas, FabricImage, IText, FabricObject } from 'fabric';
import { useEditor } from '../../context/EditorContext';
import { FORMAT_PRESETS } from '../../types/project';
import type { PageFormat } from '../../types/project';
import type { LibraryAsset } from '../../types/asset';
import type { SceneTemplate } from '../../types/scene';
import type { CanvasLayerInfo } from '../../types/canvas';
import { SAMPLE_ASSETS } from '../../data/sampleAssets';
import { createId } from '../../utils/id';
import { CanvasToolbar } from './CanvasToolbar';

export interface CanvasEditorHandle {
  addAsset: (asset: LibraryAsset) => void;
  addImageFile: (file: File) => void;
  addImageUrl: (url: string) => void;
  loadScene: (scene: SceneTemplate) => void;
  addText: (type: 'title' | 'caption') => void;
  addBubble: () => void;
  deleteSelected: () => void;
  duplicateSelected: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  updateTextProp: (prop: string, val: unknown) => void;
  updateColor: (color: string) => void;
  updateOpacity: (opacity: number) => void;
  setBackgroundColor: (color: string) => void;
  selectLayer: (layerId: string) => void;
  undo: () => void;
  redo: () => void;
  fitToScreen: () => void;
  getExportDataURL: (multiplier?: number) => string | null;
}

interface CanvasEditorProps {
  onLayersChange?: (layers: CanvasLayerInfo[]) => void;
  onHistoryChange?: (state: { canUndo: boolean; canRedo: boolean }) => void;
}

const IMAGE_CORNER_PROPS = {
  cornerColor: '#4F46E5',
  cornerStyle: 'circle' as const,
  borderColor: '#4F46E5',
  cornerSize: 10,
  transparentCorners: false
};

type LayerMeta = FabricObject & { layerId?: string; layerLabel?: string };

function tagObject(obj: FabricObject, label: string) {
  const id = createId('layer');
  const meta = obj as LayerMeta;
  meta.layerId = id;
  meta.layerLabel = label;
  return id;
}

function readLayerId(obj: FabricObject): string {
  return (obj as LayerMeta).layerId || '';
}

function layerLabelFor(obj: FabricObject, fallbackIndex: number): string {
  const custom = (obj as LayerMeta).layerLabel;
  if (custom) return custom;
  const t = (obj.type || '').toLowerCase();
  if (t.includes('text')) {
    const text = ((obj as IText).text || 'Texte').trim();
    return text.slice(0, 28) || 'Texte';
  }
  if (t.includes('image')) return `Image ${fallbackIndex + 1}`;
  return `Élément ${fallbackIndex + 1}`;
}

export const CanvasEditor = forwardRef<CanvasEditorHandle, CanvasEditorProps>(
  ({ onLayersChange, onHistoryChange }, ref) => {
  const {
    format,
    formatRevision,
    setSelectedProperties,
    project,
    setProject,
    commitCanvasJson,
    changeFormat
  } = useEditor();
  const workspaceRef = useRef<HTMLDivElement | null>(null);
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<FabricCanvas | null>(null);
  const isHydratingRef = useRef(false);
  const isHistoryReplayRef = useRef(false);
  const loadedProjectIdRef = useRef<string | null>(null);
  const lastFormatRevisionRef = useRef(0);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const historyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const layersCbRef = useRef(onLayersChange);
  const historyCbRef = useRef(onHistoryChange);
  layersCbRef.current = onLayersChange;
  historyCbRef.current = onHistoryChange;
  const [canvasReady, setCanvasReady] = useState(false);
  const [zoom, setZoom] = useState(0.7);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const formatConfig = FORMAT_PRESETS[format];

  const emitHistoryState = () => {
    const next = {
      canUndo: historyIndexRef.current > 0,
      canRedo: historyIndexRef.current >= 0 && historyIndexRef.current < historyRef.current.length - 1
    };
    setCanUndo(next.canUndo);
    setCanRedo(next.canRedo);
    historyCbRef.current?.(next);
  };

  const refreshLayers = () => {
    const canvas = fabricRef.current;
    if (!canvas) {
      layersCbRef.current?.([]);
      return;
    }
    const objects = canvas.getObjects();
    const layers: CanvasLayerInfo[] = objects
      .map((obj, index) => ({
        id: readLayerId(obj) || `obj_${index}`,
        label: layerLabelFor(obj, index),
        type: obj.type || 'object',
        index
      }))
      .reverse();
    layersCbRef.current?.(layers);
  };

  const syncCanvasJson = () => {
    const canvas = fabricRef.current;
    if (!canvas || isHydratingRef.current || isHistoryReplayRef.current) return;
    commitCanvasJson(canvas.toJSON() as Record<string, unknown>);
  };

  const pushHistory = (immediate = false) => {
    const canvas = fabricRef.current;
    if (!canvas || isHydratingRef.current || isHistoryReplayRef.current) return;

    const run = () => {
      const json = JSON.stringify(canvas.toJSON());
      const stack = historyRef.current.slice(0, historyIndexRef.current + 1);
      if (stack[stack.length - 1] === json) {
        emitHistoryState();
        return;
      }
      stack.push(json);
      if (stack.length > 40) stack.shift();
      historyRef.current = stack;
      historyIndexRef.current = stack.length - 1;
      emitHistoryState();
      refreshLayers();
    };

    if (immediate) {
      if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
      run();
      return;
    }

    if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
    historyTimerRef.current = setTimeout(run, 120);
  };

  const restoreHistoryAt = async (index: number) => {
    const canvas = fabricRef.current;
    const snapshot = historyRef.current[index];
    if (!canvas || !snapshot) return;
    isHistoryReplayRef.current = true;
    try {
      historyIndexRef.current = index;
      await canvas.loadFromJSON(JSON.parse(snapshot) as Record<string, unknown>);
      canvas.renderAll();
      setSelectedProperties(null);
      commitCanvasJson(canvas.toJSON() as Record<string, unknown>);
      canvas.getObjects().forEach((obj, i) => {
        if (!readLayerId(obj)) tagObject(obj, layerLabelFor(obj, i));
      });
      emitHistoryState();
      refreshLayers();
    } finally {
      isHistoryReplayRef.current = false;
    }
  };

  const userZoomLockRef = useRef(false);

  const fitToScreen = () => {
    userZoomLockRef.current = false;
    const stage = workspaceRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    // Viewport pas encore prêt
    if (rect.width < 80 || rect.height < 80) return;

    const pad = 48;
    const availableW = Math.max(120, rect.width - pad);
    const availableH = Math.max(120, rect.height - pad);
    const targetZoom = Math.min(
      availableW / formatConfig.width,
      availableH / formatConfig.height
    );
    setZoom(Math.max(0.2, Math.min(1.5, parseFloat((targetZoom * 0.96).toFixed(2)))));
  };

  // Auto-fit au montage / changement de format / resize fenêtre — pas quand l’utilisateur zoome à la main
  useEffect(() => {
    userZoomLockRef.current = false;
    const run = () => {
      if (!userZoomLockRef.current) fitToScreen();
    };
    const timer = setTimeout(run, 60);
    const stage = workspaceRef.current;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    const ro =
      typeof ResizeObserver !== 'undefined' && stage
        ? new ResizeObserver(() => {
            clearTimeout(debounce);
            debounce = setTimeout(run, 80);
          })
        : null;
    if (stage && ro) ro.observe(stage);
    window.addEventListener('resize', run);
    return () => {
      clearTimeout(timer);
      clearTimeout(debounce);
      ro?.disconnect();
      window.removeEventListener('resize', run);
    };
  }, [formatConfig.width, formatConfig.height]);

  // Initialize Fabric once — format changes only resize
  useEffect(() => {
    if (!canvasElRef.current || fabricRef.current) return;

    const initialFormat = FORMAT_PRESETS[format];
    const canvas = new FabricCanvas(canvasElRef.current, {
      width: initialFormat.width,
      height: initialFormat.height,
      backgroundColor: project.metadata.backgroundColor || '#FFFFFF',
      preserveObjectStacking: true
    });

    fabricRef.current = canvas;

    const updateSelection = () => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) {
        setSelectedProperties(null);
        return;
      }

      setSelectedProperties({
        type: activeObj.type || '',
        left: Math.round(activeObj.left || 0),
        top: Math.round(activeObj.top || 0),
        width: Math.round((activeObj.width || 0) * (activeObj.scaleX || 1)),
        height: Math.round((activeObj.height || 0) * (activeObj.scaleY || 1)),
        scaleX: activeObj.scaleX || 1,
        scaleY: activeObj.scaleY || 1,
        angle: Math.round(activeObj.angle || 0),
        opacity: activeObj.opacity ?? 1,
        fill: (activeObj.get('fill') as string) || '#000000',
        fontSize: (activeObj as IText).fontSize,
        fontFamily: (activeObj as IText).fontFamily,
        fontWeight: (activeObj as IText).fontWeight as string,
        textAlign: (activeObj as IText).textAlign,
        layerId: readLayerId(activeObj) || undefined
      });
    };

    canvas.on('selection:created', updateSelection);
    canvas.on('selection:updated', updateSelection);
    canvas.on('selection:cleared', () => setSelectedProperties(null));
    canvas.on('object:modified', () => {
      updateSelection();
      syncCanvasJson();
      pushHistory();
    });
    canvas.on('object:added', () => {
      syncCanvasJson();
      pushHistory();
    });
    canvas.on('object:removed', () => {
      syncCanvasJson();
      pushHistory();
    });
    // Sync pendant l’édition inline du texte (pas seulement au blur)
    canvas.on('text:changed', () => {
      syncCanvasJson();
      pushHistory();
      refreshLayers();
    });

    // Snapshot initial vide
    historyRef.current = [JSON.stringify(canvas.toJSON())];
    historyIndexRef.current = 0;
    emitHistoryState();
    refreshLayers();

    setCanvasReady(true);

    return () => {
      setCanvasReady(false);
      if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
      canvas.dispose();
      fabricRef.current = null;
      loadedProjectIdRef.current = null;
      historyRef.current = [];
      historyIndexRef.current = -1;
    };
  }, []);

  // Apply page size (load / restore) without scaling objects
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !canvasReady) return;
    if (canvas.getWidth() === formatConfig.width && canvas.getHeight() === formatConfig.height) return;
    canvas.setDimensions({
      width: formatConfig.width,
      height: formatConfig.height
    });
    canvas.renderAll();
  }, [formatConfig.width, formatConfig.height, canvasReady]);

  // User-driven format change only: rescale object positions to the new page
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !canvasReady) return;
    if (formatRevision === 0 || formatRevision === lastFormatRevisionRef.current) return;

    const prevW = canvas.getWidth() || formatConfig.width;
    const prevH = canvas.getHeight() || formatConfig.height;
    const newW = formatConfig.width;
    const newH = formatConfig.height;
    lastFormatRevisionRef.current = formatRevision;

    if (prevW === newW && prevH === newH) return;

    const sx = newW / prevW;
    const sy = newH / prevH;

    canvas.getObjects().forEach((obj) => {
      obj.set({
        left: (obj.left || 0) * sx,
        top: (obj.top || 0) * sy
      });
      obj.setCoords();
    });

    canvas.setDimensions({ width: newW, height: newH });
    canvas.renderAll();
    syncCanvasJson();
    pushHistory(true);
  }, [formatRevision, formatConfig.width, formatConfig.height, canvasReady]);

  // Background color from project metadata (when not driven by canvas API)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !canvasReady || isHydratingRef.current) return;
    if (canvas.backgroundColor !== project.metadata.backgroundColor) {
      canvas.backgroundColor = project.metadata.backgroundColor;
      canvas.renderAll();
    }
  }, [project.metadata.backgroundColor, canvasReady]);

  // Restore / clear canvas when project id changes (not on every canvasJson sync)
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !canvasReady) return;
    if (loadedProjectIdRef.current === project.metadata.id) return;

    const jsonToLoad = project.canvasJson;
    const backgroundColor = project.metadata.backgroundColor || '#FFFFFF';
    const dims = FORMAT_PRESETS[format];
    loadedProjectIdRef.current = project.metadata.id;
    isHydratingRef.current = true;

    const hydrate = async () => {
      try {
        if (jsonToLoad) {
          await canvas.loadFromJSON(jsonToLoad);
        } else {
          canvas.clear();
          canvas.backgroundColor = backgroundColor;
        }
        canvas.getObjects().forEach((obj, i) => {
          if (!readLayerId(obj)) {
            tagObject(obj, layerLabelFor(obj, i));
          }
        });
        canvas.setDimensions({
          width: dims.width,
          height: dims.height
        });
        canvas.renderAll();
        setSelectedProperties(null);
        historyRef.current = [JSON.stringify(canvas.toJSON())];
        historyIndexRef.current = 0;
        emitHistoryState();
        refreshLayers();
      } catch (err) {
        console.error('Failed to restore canvas:', err);
      } finally {
        isHydratingRef.current = false;
      }
    };

    void hydrate();
  }, [project.metadata.id, canvasReady]);

  useImperativeHandle(ref, () => ({
    getExportDataURL: (multiplier = 2) => {
      const canvas = fabricRef.current;
      if (!canvas) return null;
      return canvas.toDataURL({
        format: 'png',
        multiplier,
        quality: 1
      });
    },

    undo: () => {
      if (historyIndexRef.current <= 0) return;
      void restoreHistoryAt(historyIndexRef.current - 1);
    },

    redo: () => {
      if (historyIndexRef.current >= historyRef.current.length - 1) return;
      void restoreHistoryAt(historyIndexRef.current + 1);
    },

    selectLayer: (layerId: string) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const obj = canvas.getObjects().find((o) => readLayerId(o) === layerId);
      if (!obj) return;
      canvas.discardActiveObject();
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
    },

    updateOpacity: (opacity: number) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;
      const value = Math.max(0.05, Math.min(1, opacity));
      activeObj.set('opacity', value);
      canvas.renderAll();
      canvas.fire('object:modified', { target: activeObj });
    },

    duplicateSelected: () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const active = canvas.getActiveObject();
      if (!active) return;

      void (async () => {
        try {
          const cloned = await active.clone();
          tagObject(cloned, `${layerLabelFor(active, 0)} (copie)`);
          cloned.set({
            left: (cloned.left || 0) + 24,
            top: (cloned.top || 0) + 24,
            evented: true
          });
          const clonedType = (cloned.type || '').toLowerCase();
          if (clonedType === 'activeselection' || clonedType === 'activeSelection') {
            const group = cloned as FabricObject & {
              forEachObject?: (cb: (o: FabricObject) => void) => void;
              canvas?: FabricCanvas | null;
            };
            group.canvas = canvas;
            group.forEachObject?.((obj: FabricObject) => {
              tagObject(obj, layerLabelFor(obj, 0));
              canvas.add(obj);
            });
            cloned.setCoords();
          } else {
            canvas.add(cloned);
          }
          canvas.setActiveObject(cloned);
          canvas.renderAll();
        } catch (err) {
          console.error('Duplicate failed:', err);
        }
      })();
    },

    addImageUrl: async (url: string) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      try {
        const img = await FabricImage.fromURL(url, { crossOrigin: 'anonymous' });
        let scale = 1;
        const maxW = formatConfig.width * 0.7;
        const maxH = formatConfig.height * 0.7;
        if (img.width && img.width > maxW) {
          scale = maxW / img.width;
        }
        if (img.height && img.height * scale > maxH) {
          scale = maxH / img.height;
        }

        const renderW = (img.width || 200) * scale;
        const renderH = (img.height || 200) * scale;

        img.set({
          left: formatConfig.width / 2 - renderW / 2,
          top: formatConfig.height / 2 - renderH / 2,
          scaleX: scale,
          scaleY: scale,
          ...IMAGE_CORNER_PROPS
        });
        tagObject(img, 'Photo');
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      } catch (err) {
        console.error('Failed to load image into canvas:', err);
      }
    },

    addImageFile: async (file: File) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;
        const canvas = fabricRef.current;
        if (!canvas) return;
        try {
          const img = await FabricImage.fromURL(dataUrl);
          let scale = 1;
          const maxW = formatConfig.width * 0.7;
          const maxH = formatConfig.height * 0.7;
          if (img.width && img.width > maxW) {
            scale = maxW / img.width;
          }
          if (img.height && img.height * scale > maxH) {
            scale = maxH / img.height;
          }

          const renderW = (img.width || 200) * scale;
          const renderH = (img.height || 200) * scale;

          img.set({
            left: formatConfig.width / 2 - renderW / 2,
            top: formatConfig.height / 2 - renderH / 2,
            scaleX: scale,
            scaleY: scale,
            ...IMAGE_CORNER_PROPS
          });
          tagObject(img, file.name.replace(/\.[^/.]+$/, '') || 'Import');
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        } catch (err) {
          console.error('Failed to load image file:', err);
        }
      };
      reader.readAsDataURL(file);
    },

    addAsset: async (asset: LibraryAsset) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      try {
        const img = await FabricImage.fromURL(asset.url, { crossOrigin: 'anonymous' });
        const originalWidth = img.width || 500;
        const originalHeight = img.height || 500;

        let targetDisplayWidth = asset.defaultWidth || 240;
        const maxCanvasWidth = formatConfig.width * 0.38;
        if (targetDisplayWidth > maxCanvasWidth) {
          targetDisplayWidth = maxCanvasWidth;
        }

        const scale = targetDisplayWidth / originalWidth;
        const finalW = originalWidth * scale;
        const finalH = originalHeight * scale;

        img.set({
          scaleX: scale,
          scaleY: scale,
          left: formatConfig.width / 2 - finalW / 2,
          top: formatConfig.height / 2 - finalH / 2,
          ...IMAGE_CORNER_PROPS
        });
        tagObject(img, asset.title);
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      } catch (err) {
        console.error('Failed to load asset into canvas:', err);
      }
    },

    loadScene: async (scene: SceneTemplate) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      if (scene.defaultFormat && scene.defaultFormat in FORMAT_PRESETS) {
        changeFormat(scene.defaultFormat as PageFormat);
      }

      isHydratingRef.current = true;
      try {
        canvas.clear();
        canvas.backgroundColor = scene.backgroundColor || '#FFFFFF';

        const sorted = [...scene.elements].sort(
          (a, b) => (a.zIndex || 0) - (b.zIndex || 0)
        );

        for (const el of sorted) {
          const asset = SAMPLE_ASSETS.find((a) => a.id === el.assetId);
          if (!asset) continue;
          try {
            const img = await FabricImage.fromURL(asset.url, { crossOrigin: 'anonymous' });
            img.set({
              left: el.left,
              top: el.top,
              scaleX: el.scaleX || 1,
              scaleY: el.scaleY || 1,
              angle: el.angle || 0,
              ...IMAGE_CORNER_PROPS
            });
            tagObject(img, asset.title);
            canvas.add(img);
          } catch (e) {
            console.error('Error adding element:', e);
          }
        }

        if (scene.texts) {
          for (const t of scene.texts) {
            const textObj = new IText(t.text, {
              left: t.left,
              top: t.top,
              fontSize: t.fontSize,
              fontFamily: t.fontFamily,
              fill: t.fill,
              cornerColor: '#4F46E5',
              cornerStyle: 'circle'
            });
            tagObject(textObj, t.text.slice(0, 28) || 'Texte');
            canvas.add(textObj);
          }
        }

        canvas.renderAll();
        setProject((prev) => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            backgroundColor: scene.backgroundColor || '#FFFFFF'
          }
        }));
      } finally {
        isHydratingRef.current = false;
        syncCanvasJson();
        pushHistory(true);
        refreshLayers();
      }
    },

    addText: (type: 'title' | 'caption') => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const isTitle = type === 'title';
      const text = new IText(isTitle ? 'Nouveau Titre' : 'Ajoutez votre texte ou légende ici', {
        left: formatConfig.width / 2 - (isTitle ? 100 : 120),
        top: isTitle ? 60 : formatConfig.height - 100,
        fontSize: isTitle ? 32 : 18,
        fontWeight: isTitle ? 'bold' : 'normal',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        fill: '#0F172A',
        cornerColor: '#4F46E5',
        cornerStyle: 'circle'
      });
      tagObject(text, isTitle ? 'Titre' : 'Légende');
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    },

    addBubble: async () => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const bubbleAsset = SAMPLE_ASSETS.find((a) => a.id === 'bubble_speech_premium');
      if (!bubbleAsset) return;

      try {
        const img = await FabricImage.fromURL(bubbleAsset.url, { crossOrigin: 'anonymous' });
        img.set({
          left: formatConfig.width / 2 - 90,
          top: formatConfig.height / 2 - 60,
          cornerColor: '#4F46E5',
          cornerStyle: 'circle'
        });
        tagObject(img, 'Bulle');
        canvas.add(img);

        const text = new IText('Votre dialogue...', {
          left: formatConfig.width / 2 - 50,
          top: formatConfig.height / 2 - 30,
          fontSize: 16,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fill: '#1E293B',
          cornerColor: '#4F46E5',
          cornerStyle: 'circle'
        });
        tagObject(text, 'Dialogue');
        canvas.add(text);
        canvas.setActiveObject(text);
        canvas.renderAll();
      } catch (err) {
        console.error('Failed to add bubble:', err);
      }
    },

    deleteSelected: () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const objects = canvas.getActiveObjects();
      if (objects.length === 0) return;
      canvas.discardActiveObject();
      canvas.remove(...objects);
      canvas.renderAll();
      setSelectedProperties(null);
    },

    bringForward: () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        canvas.bringObjectToFront(activeObj);
        canvas.renderAll();
        syncCanvasJson();
        pushHistory(true);
        refreshLayers();
      }
    },

    sendBackward: () => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        canvas.sendObjectToBack(activeObj);
        canvas.renderAll();
        syncCanvasJson();
        pushHistory(true);
        refreshLayers();
      }
    },

    updateTextProp: (prop: string, val: unknown) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type.includes('text')) {
        activeObj.set(prop as keyof FabricObject, val);
        canvas.renderAll();
        canvas.fire('object:modified', { target: activeObj });
      }
    },

    updateColor: (color: string) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        activeObj.set('fill', color);
        canvas.renderAll();
        syncCanvasJson();
      }
    },

    setBackgroundColor: (color: string) => {
      const canvas = fabricRef.current;
      if (!canvas) return;
      canvas.backgroundColor = color;
      canvas.renderAll();
      setProject((prev) => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          backgroundColor: color
        }
      }));
      syncCanvasJson();
    },

    fitToScreen: () => {
      fitToScreen();
    }
  }));

  // Raccourcis clavier éditeur
  useEffect(() => {
    const isTypingTarget = (target: HTMLElement | null) =>
      Boolean(
        target &&
          (target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.tagName === 'SELECT' ||
            target.isContentEditable)
      );

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (isTypingTarget(target)) return;

      const canvas = fabricRef.current;
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      if (mod && key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (historyIndexRef.current > 0) void restoreHistoryAt(historyIndexRef.current - 1);
        return;
      }
      if (mod && (key === 'y' || (key === 'z' && e.shiftKey))) {
        e.preventDefault();
        if (historyIndexRef.current < historyRef.current.length - 1) {
          void restoreHistoryAt(historyIndexRef.current + 1);
        }
        return;
      }
      if (mod && key === 'd') {
        e.preventDefault();
        ref && 'current' in ref && ref.current?.duplicateSelected();
        return;
      }

      if (e.key !== 'Delete' && e.key !== 'Backspace') return;
      if (!canvas) return;
      const active = canvas.getActiveObject();
      if (!active) return;
      if ('isEditing' in active && (active as IText).isEditing) return;

      e.preventDefault();
      const objects = canvas.getActiveObjects();
      canvas.discardActiveObject();
      canvas.remove(...objects);
      canvas.renderAll();
      setSelectedProperties(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setSelectedProperties, ref]);

  const handleZoomChange = (delta: number) => {
    userZoomLockRef.current = true;
    setZoom((prev) => Math.max(0.2, Math.min(2.5, parseFloat((prev + delta).toFixed(2)))));
  };

  const handleResetZoom = () => {
    userZoomLockRef.current = true;
    setZoom(1);
  };

  const stageWidth = Math.round(formatConfig.width * zoom);
  const stageHeight = Math.round(formatConfig.height * zoom);

  const handleClear = () => {
    if (confirm('Effacer tous les éléments du plan de travail ?')) {
      if (fabricRef.current) {
        fabricRef.current.clear();
        fabricRef.current.backgroundColor = project.metadata.backgroundColor;
        fabricRef.current.renderAll();
        setSelectedProperties(null);
        syncCanvasJson();
      }
    }
  };

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (file.type.startsWith('image/') && ref && 'current' in ref && ref.current) {
          ref.current.addImageFile(file);
        }
      });
    }
  };

  return (
    <div
      className="canvas-workspace"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsDragOver(false);
        }
      }}
      onDrop={handleDrop}
    >
      {/* Toolbar fixe : ne scrolle pas avec la feuille */}
      <div className="canvas-toolbar-bar">
        <CanvasToolbar
          onAddText={(type) => {
            if (ref && 'current' in ref && ref.current) {
              ref.current.addText(type);
            }
          }}
          onAddBubble={() => {
            if (ref && 'current' in ref && ref.current) {
              ref.current.addBubble();
            }
          }}
          onImportImage={(file) => {
            if (ref && 'current' in ref && ref.current) {
              ref.current.addImageFile(file);
            }
          }}
          onClear={handleClear}
          onUndo={() => {
            if (historyIndexRef.current > 0) void restoreHistoryAt(historyIndexRef.current - 1);
          }}
          onRedo={() => {
            if (historyIndexRef.current < historyRef.current.length - 1) {
              void restoreHistoryAt(historyIndexRef.current + 1);
            }
          }}
          onDuplicate={() => {
            if (ref && 'current' in ref && ref.current) {
              ref.current.duplicateSelected();
            }
          }}
          canUndo={canUndo}
          canRedo={canRedo}
          zoom={zoom}
          onZoomChange={handleZoomChange}
          onResetZoom={handleResetZoom}
          onFitToScreen={fitToScreen}
        />
        <span className="canvas-format-chip" title="Format de la page active">
          {formatConfig.label}
        </span>
      </div>

      {/* Zone scrollable : seule la feuille bouge */}
      <div ref={workspaceRef} className="canvas-stage">
        {isDragOver && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(79, 70, 229, 0.12)',
              border: '3px dashed var(--primary)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(2px)',
              pointerEvents: 'none'
            }}
          >
            <div
              style={{
                padding: '1.2rem 2rem',
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                fontWeight: 600,
                fontSize: '1rem',
                color: 'var(--primary)'
              }}
            >
              Glissez-déposez votre image pour l'insérer sur le plan de travail
            </div>
          </div>
        )}

        <div
          className="canvas-stage-inner"
          style={{
            width: stageWidth,
            height: stageHeight
          }}
        >
          <div
            className="canvas-container-outer"
            style={{
              width: formatConfig.width,
              height: formatConfig.height,
              transform: `scale(${zoom})`,
              transition: 'transform 0.12s ease-out'
            }}
          >
            <canvas ref={canvasElRef} />
          </div>
        </div>
      </div>
    </div>
  );
});
