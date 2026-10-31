import React from 'react';
import {
  MousePointer,
  Type,
  MessageSquare,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  UploadCloud,
  Maximize,
  Undo2,
  Redo2,
  Copy
} from 'lucide-react';

interface CanvasToolbarProps {
  onAddText: (type: 'title' | 'caption') => void;
  onAddBubble: () => void;
  onImportImage: (file: File) => void;
  onClear: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onDuplicate: () => void;
  canUndo: boolean;
  canRedo: boolean;
  zoom: number;
  onZoomChange: (delta: number) => void;
  onResetZoom: () => void;
  onFitToScreen: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  onAddText,
  onAddBubble,
  onImportImage,
  onClear,
  onUndo,
  onRedo,
  onDuplicate,
  canUndo,
  canRedo,
  zoom,
  onZoomChange,
  onResetZoom,
  onFitToScreen
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportImage(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className="canvas-toolbar">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <button className="btn-icon active" title="Outil sélection et déplacement">
        <MousePointer size={16} />
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border)' }} />

      <button
        className="btn-icon"
        onClick={onUndo}
        disabled={!canUndo}
        title="Annuler (Ctrl+Z)"
        style={{ opacity: canUndo ? 1 : 0.35 }}
      >
        <Undo2 size={15} />
      </button>
      <button
        className="btn-icon"
        onClick={onRedo}
        disabled={!canRedo}
        title="Rétablir (Ctrl+Y)"
        style={{ opacity: canRedo ? 1 : 0.35 }}
      >
        <Redo2 size={15} />
      </button>
      <button className="btn-icon" onClick={onDuplicate} title="Dupliquer la sélection (Ctrl+D)">
        <Copy size={15} />
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border)' }} />

      <button className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} onClick={() => onAddText('title')}>
        <Type size={14} />
        Titre
      </button>

      <button className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} onClick={() => onAddText('caption')}>
        <Type size={14} />
        Légende
      </button>

      <button className="btn btn-outline" style={{ padding: '0.35rem 0.6rem' }} onClick={onAddBubble}>
        <MessageSquare size={14} />
        Bulle
      </button>

      <button
        className="btn btn-outline"
        style={{ padding: '0.35rem 0.6rem', color: 'var(--primary)' }}
        onClick={() => fileInputRef.current?.click()}
        title="Importer une image ou photo depuis votre ordinateur"
      >
        <UploadCloud size={14} />
        Importer
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border)' }} />

      <button className="btn-icon" onClick={() => onZoomChange(-0.1)} title="Zoomer arrière">
        <ZoomOut size={15} />
      </button>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
        {Math.round(zoom * 100)}%
      </span>
      <button className="btn-icon" onClick={() => onZoomChange(0.1)} title="Zoomer avant">
        <ZoomIn size={15} />
      </button>
      <button className="btn-icon" onClick={onResetZoom} title="Réinitialiser le zoom (100%)">
        <RotateCcw size={13} />
      </button>

      <button
        className="btn btn-outline"
        style={{ padding: '0.35rem 0.55rem', fontSize: '0.78rem' }}
        onClick={onFitToScreen}
        title="Ajuster la feuille à la taille de l'écran"
      >
        <Maximize size={13} />
        Ajuster
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border)' }} />

      <button className="btn-icon" onClick={onClear} title="Effacer tout le plan de travail">
        <Trash2 size={16} />
      </button>
    </div>
  );
};
