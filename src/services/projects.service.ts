import { demoProjects, getSimilarProjects } from '@/lib/demo-data';
import { Project } from '@/lib/types';

export class ProjectsService {
  /**
   * Fetch all institutional projects with optional domain filtering
   */
  static async getAllProjects(domain?: string): Promise<Project[]> {
    if (!domain || domain === 'all') {
      return demoProjects;
    }
    return demoProjects.filter(
      p => p.domain.toLowerCase() === domain.toLowerCase()
    );
  }

  /**
   * Retrieve a project by its unique identifier
   */
  static async getProjectById(id: string): Promise<Project | null> {
    const project = demoProjects.find(p => p.id === id);
    return project || null;
  }

  /**
   * Query similar projects based on technology stack and domain overlap
   */
  static async getSimilarProjects(id: string) {
    return getSimilarProjects(id);
  }

  /**
   * Create a new student project entry
   */
  static async createProject(data: Partial<Project>): Promise<Project> {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: data.name || 'Untitled Project',
      description: data.description || '',
      domain: data.domain || 'Software Engineering',
      ownerId: data.ownerId || 'user-1',
      ownerName: data.ownerName || 'Student Contributor',
      status: data.status || 'active',
      teamMembers: data.teamMembers || [],
      technologies: data.technologies || [],
      hardware: data.hardware || [],
      software: data.software || [],
      problemStatement: data.problemStatement || '',
      expectedOutcome: data.expectedOutcome || '',
      githubUrl: data.githubUrl,
      uploads: data.uploads || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    demoProjects.unshift(newProject);
    return newProject;
  }
}
