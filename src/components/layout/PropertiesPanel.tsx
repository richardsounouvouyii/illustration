import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { isTextObjectType, isImageObjectType } from '../../types/editor';
import type { CanvasLayerInfo } from '../../types/canvas';
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Bold,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Type,
  Layers,
  ChevronRight,
  ChevronLeft,
  Image as ImageIcon,
  Type as TypeIcon
} from 'lucide-react';

interface PropertiesPanelProps {
  layers: CanvasLayerInfo[];
  onSelectLayer: (layerId: string) => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onDeleteSelected: () => void;
  onUpdateTextProp: (prop: string, val: unknown) => void;
  onUpdateColor: (color: string) => void;
  onUpdateOpacity: (opacity: number) => void;
  onSetBackgroundColor: (color: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const PRESET_COLORS = [
  '#000000', '#1E293B', '#64748B', '#EF4444',
  '#F59E0B', '#10B981', '#0EA5E9', '#3B82F6',
  '#6366F1', '#EC4899', '#8B5CF6', '#FFFFFF'
];

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  layers,
  onSelectLayer,
  onBringForward,
  onSendBackward,
  onDeleteSelected,
  onUpdateTextProp,
  onUpdateColor,
  onUpdateOpacity,
  onSetBackgroundColor,
  isCollapsed,
  onToggleCollapse
}) => {
  const { selectedProperties, project } = useEditor();

  const isText = isTextObjectType(selectedProperties?.type);
  const isImage = isImageObjectType(selectedProperties?.type);
  const selectedLayerId = selectedProperties?.layerId;

  if (isCollapsed) {
    return (
      <div className="properties-panel-collapsed">
        <button
          className="sidebar-floating-toggle right"
          onClick={onToggleCollapse}
          title="Déplier le panneau des propriétés (droite)"
        >
          <ChevronLeft size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="properties-panel">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-main)' }}>
          Propriétés
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {selectedProperties && (
            <button
              className="btn-icon"
              onClick={onDeleteSelected}
              title="Supprimer l'élément sélectionné"
              style={{ color: 'var(--danger)' }}
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            className="btn-icon"
            onClick={onToggleCollapse}
            title="Plier le panneau des propriétés pour libérer de l'espace"
            style={{ color: 'var(--text-subtle)' }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Liste des calques toujours visible */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          <Layers size={14} />
          Calques ({layers.length})
        </div>
        {layers.length === 0 ? (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', padding: '0.5rem 0' }}>
            Aucun élément sur la feuille.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '180px', overflowY: 'auto' }}>
            {layers.map((layer) => {
              const isTextLayer = isTextObjectType(layer.type);
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => onSelectLayer(layer.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 0.55rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border)',
                    background: selectedLayerId === layer.id ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.78rem',
                    color: 'var(--text-main)'
                  }}
                  title="Sélectionner cet élément"
                >
                  {isTextLayer ? <TypeIcon size={13} /> : <ImageIcon size={13} />}
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {layer.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedProperties ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <Layers size={14} />
              Disposition
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={onBringForward} title="Mettre au premier plan">
                <ArrowUp size={14} /> Premier plan
              </button>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={onSendBackward} title="Mettre à l'arrière-plan">
                <ArrowDown size={14} /> Arrière-plan
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Opacité ({Math.round((selectedProperties.opacity || 1) * 100)}%)
            </div>
            <input
              type="range"
              min={5}
              max={100}
              value={Math.round((selectedProperties.opacity || 1) * 100)}
              onChange={(e) => onUpdateOpacity(parseInt(e.target.value, 10) / 100)}
              style={{ width: '100%' }}
            />
          </div>

          {isText && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <Type size={14} />
                Typographie & Alignement
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="number"
                  min="8"
                  max="120"
                  value={selectedProperties.fontSize || 20}
                  onChange={(e) => onUpdateTextProp('fontSize', parseInt(e.target.value))}
                  style={{
                    width: '70px',
                    padding: '0.35rem 0.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem'
                  }}
                  title="Taille de police"
                />
                <button
                  className={`btn-icon ${selectedProperties.fontWeight === 'bold' ? 'active' : ''}`}
                  onClick={() =>
                    onUpdateTextProp(
                      'fontWeight',
                      selectedProperties.fontWeight === 'bold' ? 'normal' : 'bold'
                    )
                  }
                  title="Gras"
                >
                  <Bold size={15} />
                </button>
                <button
                  className={`btn-icon ${selectedProperties.textAlign === 'left' ? 'active' : ''}`}
                  onClick={() => onUpdateTextProp('textAlign', 'left')}
                  title="Aligner à gauche"
                >
                  <AlignLeft size={15} />
                </button>
                <button
                  className={`btn-icon ${selectedProperties.textAlign === 'center' ? 'active' : ''}`}
                  onClick={() => onUpdateTextProp('textAlign', 'center')}
                  title="Centrer"
                >
                  <AlignCenter size={15} />
                </button>
                <button
                  className={`btn-icon ${selectedProperties.textAlign === 'right' ? 'active' : ''}`}
                  onClick={() => onUpdateTextProp('textAlign', 'right')}
                  title="Aligner à droite"
                >
                  <AlignRight size={15} />
                </button>
              </div>

              <select
                value={selectedProperties.fontFamily || 'Plus Jakarta Sans, sans-serif'}
                onChange={(e) => onUpdateTextProp('fontFamily', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.4rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.82rem',
                  backgroundColor: 'var(--bg-surface)'
                }}
              >
                <option value="Plus Jakarta Sans, sans-serif">Plus Jakarta Sans</option>
                <option value="Comic Sans MS, cursive, sans-serif">Bande dessinée (Comic)</option>
                <option value="Georgia, serif">Élégant (Serif)</option>
                <option value="Impact, fantasy">Titre fort (Impact)</option>
                <option value="Courier New, monospace">Machine à écrire</option>
              </select>
            </div>
          )}

          {!isImage && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                <Palette size={14} />
                Couleur de l'élément
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem' }}>
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => onUpdateColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: c,
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}

          {isImage && (
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Image sélectionnée : poignées pour redimensionner, curseur d’opacité ci-dessus, Ctrl+D pour dupliquer.
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Fond de l'illustration
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.35rem' }}>
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => onSetBackgroundColor(c)}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: c,
                    border: project.metadata.backgroundColor === c ? '2px solid var(--primary)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <strong>Raccourcis :</strong> Ctrl+Z annuler · Ctrl+Y rétablir · Ctrl+D dupliquer · Ctrl+S enregistrer · Suppr effacer
          </div>
        </div>
      )}
    </div>
  );
};
