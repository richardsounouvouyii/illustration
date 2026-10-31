import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { FORMAT_PRESETS } from '../../types/project';
import type { PageFormat } from '../../types/project';
import { 
  Palette, 
  Download, 
  Save, 
  Plus, 
  FolderOpen, 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen,
  Maximize2,
  Minimize2,
  Check
} from 'lucide-react';

interface HeaderProps {
  onOpenExport: () => void;
  onOpenProjects: () => void;
  isLeftCollapsed: boolean;
  onToggleLeft: () => void;
  isRightCollapsed: boolean;
  onToggleRight: () => void;
  onToggleZenMode: () => void;
  isZenMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenExport, 
  onOpenProjects,
  isLeftCollapsed,
  onToggleLeft,
  isRightCollapsed,
  onToggleRight,
  onToggleZenMode,
  isZenMode
}) => {
  const { project, setProject, format, changeFormat, saveCurrentProject, createNewProject } = useEditor();
  const [saveFlash, setSaveFlash] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        name: e.target.value
      }
    }));
  };

  const handleSave = () => {
    if (saveCurrentProject()) {
      setSaveFlash(true);
      window.setTimeout(() => setSaveFlash(false), 1400);
    }
  };

  return (
    <header className="app-header">
      <div className="brand-section">
        {/* Toggle Left Sidebar */}
        <button
          className={`btn-icon ${isLeftCollapsed ? '' : 'active'}`}
          onClick={onToggleLeft}
          title={isLeftCollapsed ? "Déplier la bibliothèque (gauche)" : "Plier la bibliothèque (gauche)"}
          style={{ marginRight: '0.2rem' }}
        >
          {isLeftCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        <div className="brand-logo">
          <Palette size={20} />
        </div>
        <span className="brand-title">Studio Illustrations</span>
        <span style={{ color: 'var(--text-subtle)', margin: '0 0.5rem' }}>/</span>
        <input
          type="text"
          className="project-title-input"
          value={project.metadata.name}
          onChange={handleTitleChange}
          title="Cliquer pour renommer l'illustration"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Format Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Format :</span>
          <select
            value={format}
            onChange={(e) => changeFormat(e.target.value as PageFormat)}
            style={{
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {Object.values(FORMAT_PRESETS).map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <button
          className="btn btn-outline"
          onClick={() => {
            const hasContent = Boolean(project.canvasJson);
            if (hasContent && !confirm('Créer un nouveau projet ? Les modifications non enregistrées du projet actuel seront perdues.')) {
              return;
            }
            createNewProject();
          }}
          title="Nouveau projet vierge"
        >
          <Plus size={16} />
          Nouveau
        </button>

        <button
          className="btn btn-outline"
          onClick={onOpenProjects}
          title="Ouvrir un projet existant"
        >
          <FolderOpen size={16} />
          Projets
        </button>

        <button
          className="btn btn-outline"
          onClick={handleSave}
          title="Enregistrer les modifications (Ctrl+S)"
          style={saveFlash ? { borderColor: 'var(--success)', color: 'var(--success)' } : undefined}
        >
          {saveFlash ? <Check size={16} /> : <Save size={16} />}
          {saveFlash ? 'Enregistré' : 'Enregistrer'}
        </button>

        <button
          className="btn btn-primary"
          onClick={onOpenExport}
          title="Exporter l'image en PNG ou PDF"
        >
          <Download size={16} />
          Exporter
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 0.1rem' }} />

        {/* Mode Zen / Plein écran */}
        <button
          className={`btn-icon ${isZenMode ? 'active' : ''}`}
          onClick={onToggleZenMode}
          title={isZenMode ? "Quitter le mode plein écran" : "Mode plein écran (masquer les panneaux latéraux pour plus d'espace)"}
        >
          {isZenMode ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>

        {/* Toggle Right Panel */}
        <button
          className={`btn-icon ${isRightCollapsed ? '' : 'active'}`}
          onClick={onToggleRight}
          title={isRightCollapsed ? "Déplier le panneau propriétés (droite)" : "Plier le panneau propriétés (droite)"}
        >
          {isRightCollapsed ? <PanelRightOpen size={18} /> : <PanelRightClose size={18} />}
        </button>
      </div>
    </header>
  );
};
