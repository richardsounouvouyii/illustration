import React, { useRef, useState, useEffect } from 'react';
import { EditorProvider, useEditor } from './context/EditorContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { PropertiesPanel } from './components/layout/PropertiesPanel';
import { CanvasEditor } from './components/editor/CanvasEditor';
import type { CanvasEditorHandle } from './components/editor/CanvasEditor';
import { ExportModal } from './components/export/ExportModal';
import type { LibraryAsset } from './types/asset';
import type { SceneTemplate } from './types/scene';
import type { CanvasLayerInfo } from './types/canvas';

const StudioMain: React.FC = () => {
  const canvasEditorRef = useRef<CanvasEditorHandle | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [layers, setLayers] = useState<CanvasLayerInfo[]>([]);
  const { setActiveTab, saveCurrentProject } = useEditor();

  const isZenMode = isLeftCollapsed && isRightCollapsed;
  const handleToggleZenMode = () => {
    if (isZenMode) {
      setIsLeftCollapsed(false);
      setIsRightCollapsed(false);
    } else {
      setIsLeftCollapsed(true);
      setIsRightCollapsed(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      canvasEditorRef.current?.fitToScreen();
    }, 280);
    return () => clearTimeout(timer);
  }, [isLeftCollapsed, isRightCollapsed]);

  // Ctrl+S enregistrer
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveCurrentProject();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [saveCurrentProject]);

  const handleAddAsset = (asset: LibraryAsset) => {
    canvasEditorRef.current?.addAsset(asset);
  };

  const handleLoadScene = (scene: SceneTemplate) => {
    canvasEditorRef.current?.loadScene(scene);
  };

  return (
    <div className="app-layout">
      <Header
        onOpenExport={() => setIsExportOpen(true)}
        onOpenProjects={() => {
          setIsLeftCollapsed(false);
          setActiveTab('layers');
        }}
        isLeftCollapsed={isLeftCollapsed}
        onToggleLeft={() => setIsLeftCollapsed((prev) => !prev)}
        isRightCollapsed={isRightCollapsed}
        onToggleRight={() => setIsRightCollapsed((prev) => !prev)}
        isZenMode={isZenMode}
        onToggleZenMode={handleToggleZenMode}
      />

      <div className="app-body">
        <Sidebar
          onAddAsset={handleAddAsset}
          onLoadScene={handleLoadScene}
          isCollapsed={isLeftCollapsed}
          onToggleCollapse={() => setIsLeftCollapsed((prev) => !prev)}
        />

        <CanvasEditor ref={canvasEditorRef} onLayersChange={setLayers} />

        <PropertiesPanel
          layers={layers}
          onSelectLayer={(id) => canvasEditorRef.current?.selectLayer(id)}
          onBringForward={() => canvasEditorRef.current?.bringForward()}
          onSendBackward={() => canvasEditorRef.current?.sendBackward()}
          onDeleteSelected={() => canvasEditorRef.current?.deleteSelected()}
          onUpdateTextProp={(prop, val) => canvasEditorRef.current?.updateTextProp(prop, val)}
          onUpdateColor={(col) => canvasEditorRef.current?.updateColor(col)}
          onUpdateOpacity={(opacity) => canvasEditorRef.current?.updateOpacity(opacity)}
          onSetBackgroundColor={(col) => canvasEditorRef.current?.setBackgroundColor(col)}
          isCollapsed={isRightCollapsed}
          onToggleCollapse={() => setIsRightCollapsed((prev) => !prev)}
        />
      </div>

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        getExportDataURL={(multiplier) => canvasEditorRef.current?.getExportDataURL(multiplier) ?? null}
      />
    </div>
  );
};

export default function App() {
  return (
    <EditorProvider>
      <StudioMain />
    </EditorProvider>
  );
}
