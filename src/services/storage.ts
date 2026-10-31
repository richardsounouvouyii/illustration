import type { Project, ProjectMetadata } from '../types/project';

const PROJECTS_STORAGE_KEY = 'studio_illustrations_projects';
const ACTIVE_PROJECT_KEY = 'studio_illustrations_active_id';

export const storageService = {
  getProjects(): ProjectMetadata[] {
    try {
      const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data) as Project[];
      return parsed.map((p) => p.metadata);
    } catch {
      return [];
    }
  },

  getProject(id: string): Project | null {
    try {
      const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!data) return null;
      const projects = JSON.parse(data) as Project[];
      return projects.find((p) => p.metadata.id === id) || null;
    } catch {
      return null;
    }
  },

  saveProject(project: Project): void {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    const projects: Project[] = data ? JSON.parse(data) : [];
    const index = projects.findIndex((p) => p.metadata.id === project.metadata.id);

    const updatedProject = {
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

    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
    localStorage.setItem(ACTIVE_PROJECT_KEY, updatedProject.metadata.id);
  },

  deleteProject(id: string): void {
    try {
      const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (!data) return;
      const projects = (JSON.parse(data) as Project[]).filter((p) => p.metadata.id !== id);
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
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
