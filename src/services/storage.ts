import type { Project, ProjectMetadata } from '../types/project';

const PROJECTS_STORAGE_KEY = 'studio_illustrations_projects';
const ACTIVE_PROJECT_KEY = 'studio_illustrations_active_id';

function readAllProjects(): Project[] {
  try {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data) as unknown;
    return Array.isArray(parsed) ? (parsed as Project[]) : [];
  } catch {
    return [];
  }
}

export class StorageQuotaError extends Error {
  constructor(message = 'Stockage local saturé. Supprimez d’anciens projets ou allégez le canvas.') {
    super(message);
    this.name = 'StorageQuotaError';
  }
}

export const storageService = {
  getProjects(): ProjectMetadata[] {
    return readAllProjects().map((p) => p.metadata);
  },

  getProject(id: string): Project | null {
    return readAllProjects().find((p) => p.metadata.id === id) || null;
  },

  saveProject(project: Project): Project {
    const projects = readAllProjects();
    const index = projects.findIndex((p) => p.metadata.id === project.metadata.id);

    const updatedProject: Project = {
      ...project,
      metadata: {
        ...project.metadata,
        updatedAt: new Date().toISOString()
      }
    };

    if (index >= 0) {
      projects[index] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }

    // Garde une limite raisonnable (évite de bloquer le quota trop vite)
    const trimmed = projects.slice(0, 40);

    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(trimmed));
      localStorage.setItem(ACTIVE_PROJECT_KEY, updatedProject.metadata.id);
    } catch {
      throw new StorageQuotaError();
    }

    return updatedProject;
  },

  deleteProject(id: string): void {
    try {
      const projects = readAllProjects().filter((p) => p.metadata.id !== id);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
      if (localStorage.getItem(ACTIVE_PROJECT_KEY) === id) {
        localStorage.removeItem(ACTIVE_PROJECT_KEY);
      }
    } catch (e) {
      console.error('Failed to delete project:', e);
    }
  },

  getActiveProjectId(): string | null {
    return localStorage.getItem(ACTIVE_PROJECT_KEY);
  },

  setActiveProjectId(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id);
  }
};
