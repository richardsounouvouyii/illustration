import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Project, ProjectMetadata, PageFormat } from '../types/project';
import type { SelectedObjectProperties } from '../types/editor';
import { storageService, StorageQuotaError } from '../services/storage';
import { createId } from '../utils/id';

interface EditorContextType {
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
  selectedProperties: SelectedObjectProperties | null;
  setSelectedProperties: (props: SelectedObjectProperties | null) => void;
  format: PageFormat;
  formatRevision: number;
  changeFormat: (newFormat: PageFormat) => void;
  createNewProject: (name?: string, format?: PageFormat) => void;
  saveCurrentProject: () => boolean;
  loadProject: (id: string) => void;
  recentProjects: ProjectMetadata[];
  refreshRecentProjects: () => void;
  commitCanvasJson: (json: Record<string, unknown> | null) => void;
  activeTab: 'library' | 'ai_style' | 'photos' | 'uploads' | 'scenes' | 'layers';
  setActiveTab: (tab: 'library' | 'ai_style' | 'photos' | 'uploads' | 'scenes' | 'layers') => void;
}

const createDefaultProject = (): Project => ({
  metadata: {
    id: createId('proj'),
    name: 'Nouvelle Illustration',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    format: 'a4_landscape',
    backgroundColor: '#FFFFFF'
  },
  canvasJson: null
});

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project>(createDefaultProject);
  const [selectedProperties, setSelectedProperties] = useState<SelectedObjectProperties | null>(null);
  const [format, setFormat] = useState<PageFormat>('a4_landscape');
  const [formatRevision, setFormatRevision] = useState(0);
  const [activeTab, setActiveTab] = useState<'library' | 'ai_style' | 'photos' | 'uploads' | 'scenes' | 'layers'>('library');
  const [recentProjects, setRecentProjects] = useState<ProjectMetadata[]>([]);
  const canvasJsonRef = useRef<Record<string, unknown> | null>(null);
  const restoredRef = useRef(false);

  const refreshRecentProjects = useCallback(() => {
    setRecentProjects(storageService.getProjects());
  }, []);

  useEffect(() => {
    if (restoredRef.current) return;
    restoredRef.current = true;

    const activeId = storageService.getActiveProjectId();
    if (activeId) {
      const loaded = storageService.getProject(activeId);
      if (loaded) {
        canvasJsonRef.current = loaded.canvasJson;
        setProject(loaded);
        setFormat(loaded.metadata.format);
      }
    }
    refreshRecentProjects();
  }, [refreshRecentProjects]);

  const commitCanvasJson = useCallback((json: Record<string, unknown> | null) => {
    canvasJsonRef.current = json;
    setProject((prev) => ({
      ...prev,
      canvasJson: json
    }));
  }, []);

  const changeFormat = (newFormat: PageFormat) => {
    setFormat((prev) => {
      if (prev === newFormat) return prev;
      // User-driven format change — canvas will rescale positions
      setFormatRevision((r) => r + 1);
      return newFormat;
    });
    setProject((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        format: newFormat
      }
    }));
  };

  const createNewProject = (name = 'Nouvelle Illustration', projFormat: PageFormat = 'a4_landscape') => {
    const newProj: Project = {
      metadata: {
        id: createId('proj'),
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        format: projFormat,
        backgroundColor: '#FFFFFF'
      },
      canvasJson: null
    };
    canvasJsonRef.current = null;
    setProject(newProj);
    setFormat(projFormat);
    setSelectedProperties(null);
    try {
      storageService.saveProject(newProj);
      refreshRecentProjects();
    } catch (e) {
      console.error(e);
      alert('Impossible d’enregistrer le nouveau projet (stockage plein ou indisponible).');
    }
  };

  const saveCurrentProject = (): boolean => {
    try {
      let saved: Project | null = null;
      setProject((prev) => {
        const updated: Project = {
          ...prev,
          canvasJson: canvasJsonRef.current ?? prev.canvasJson
        };
        saved = storageService.saveProject(updated);
        return saved;
      });
      Promise.resolve().then(() => refreshRecentProjects());
      return saved !== null;
    } catch (e) {
      console.error(e);
      const message =
        e instanceof StorageQuotaError
          ? e.message
          : 'Échec de l’enregistrement. Le stockage local est peut‑être plein.';
      alert(message);
      return false;
    }
  };

  const loadProject = (id: string) => {
    const loaded = storageService.getProject(id);
    if (loaded) {
      canvasJsonRef.current = loaded.canvasJson;
      setProject(loaded);
      setFormat(loaded.metadata.format);
      setSelectedProperties(null);
      storageService.setActiveProjectId(id);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        project,
        setProject,
        selectedProperties,
        setSelectedProperties,
        format,
        formatRevision,
        changeFormat,
        createNewProject,
        saveCurrentProject,
        loadProject,
        recentProjects,
        refreshRecentProjects,
        commitCanvasJson,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
