import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { AssetLibrary } from '../library/AssetLibrary';
import { AiStyleTransformer } from '../library/AiStyleTransformer';
import { OnlinePhotoSearch } from '../library/OnlinePhotoSearch';
import { UploadManager } from '../library/UploadManager';
import { SceneTemplates } from '../library/SceneTemplates';
import type { LibraryAsset } from '../../types/asset';
import type { SceneTemplate } from '../../types/scene';
import { Box, Wand2, Camera, UploadCloud, LayoutTemplate, FolderArchive, Trash2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { storageService } from '../../services/storage';

interface SidebarProps {
  onAddAsset: (asset: LibraryAsset) => void;
  onLoadScene: (scene: SceneTemplate) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onAddAsset, 
  onLoadScene,
  isCollapsed,
  onToggleCollapse
}) => {
  const { activeTab, setActiveTab, recentProjects, loadProject, refreshRecentProjects } = useEditor();

  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Voulez-vous supprimer ce projet ?')) {
      storageService.deleteProject(id);
      refreshRecentProjects();
    }
  };

  if (isCollapsed) {
    return (
      <div className="app-sidebar-collapsed">
        <button
          className="sidebar-floating-toggle left"
          onClick={onToggleCollapse}
          title="Déplier la bibliothèque d'outils et de dessins (gauche)"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  return (
    <aside className="app-sidebar">
      {/* Tabs */}
      <div className="sidebar-tabs">
        <button
          className={`sidebar-tab-btn ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}
          title="Illustrations de manuels & 3D"
        >
          <Box size={14} />
          Dessins
        </button>
        <button
          className={`sidebar-tab-btn ${activeTab === 'ai_style' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai_style')}
          title="Filtre local : transformer une photo en style dessin / caricature"
          style={activeTab === 'ai_style' ? { color: '#6366F1', fontWeight: 700 } : {}}
        >
          <Wand2 size={14} style={{ color: '#6366F1' }} />
          Filtres
        </button>
        <button
          className={`sidebar-tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
          title="Banque de photos réalistes HD en ligne"
        >
          <Camera size={14} />
          Photos
        </button>
        <button
          className={`sidebar-tab-btn ${activeTab === 'uploads' ? 'active' : ''}`}
          onClick={() => setActiveTab('uploads')}
          title="Importer vos propres images & photos"
        >
          <UploadCloud size={14} />
          Imports
        </button>
        <button
          className={`sidebar-tab-btn ${activeTab === 'scenes' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenes')}
          title="Modèles de scènes prêtes à l'emploi"
        >
          <LayoutTemplate size={14} />
          Scènes
        </button>
        <button
          className={`sidebar-tab-btn ${activeTab === 'layers' ? 'active' : ''}`}
          onClick={() => setActiveTab('layers')}
          title="Mes projets sauvegardés"
        >
          <FolderArchive size={14} />
          Projets
        </button>
        <button
          className="btn-icon"
          onClick={onToggleCollapse}
          title="Plier la barre latérale pour libérer de l'espace"
          style={{ width: '26px', borderLeft: '1px solid var(--border)', borderRadius: 0, height: 'auto', color: 'var(--text-subtle)' }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Tab Contents */}
      <div className="sidebar-content">
        {activeTab === 'library' && <AssetLibrary onAddAsset={onAddAsset} />}

        {activeTab === 'ai_style' && <AiStyleTransformer onAddAsset={onAddAsset} />}

        {activeTab === 'photos' && <OnlinePhotoSearch onAddAsset={onAddAsset} />}

        {activeTab === 'uploads' && <UploadManager onAddAsset={onAddAsset} />}

        {activeTab === 'scenes' && <SceneTemplates onLoadScene={onLoadScene} />}

        {activeTab === 'layers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Historique de vos illustrations sauvegardées :
            </div>

            {recentProjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
                Aucun projet enregistré pour le moment.
              </div>
            ) : (
              recentProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => loadProject(p.id)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--bg-surface)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      {p.name}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                      <Clock size={12} />
                      {new Date(p.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(e, p.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--text-subtle)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Supprimer le projet"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
