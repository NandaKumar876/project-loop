import { demoDNA, demoProjects } from '@/lib/demo-data';
import { ProjectDNA } from '@/lib/types';

export class DnaService {
  /**
   * Fetch DNA for all projects
   */
  static async getAllDNA(): Promise<Record<string, ProjectDNA>> {
    return demoDNA;
  }

  /**
   * Fetch DNA for a specific project
   */
  static async getDNAByProjectId(projectId: string): Promise<ProjectDNA | null> {
    return demoDNA[projectId] || null;
  }

  /**
   * Automatically generate and extract structured DNA from a project submission
   */
  static async extractDNA(projectId: string): Promise<ProjectDNA> {
    const existing = demoDNA[projectId];
    if (existing) return existing;

    const project = demoProjects.find(p => p.id === projectId);

    const generatedDNA: ProjectDNA = {
      id: `dna-${Date.now()}`,
      projectId,
      technologyDNA: {
        languages: ['TypeScript', 'Python'],
        frameworks: ['Next.js', 'FastAPI'],
        platforms: ['Node.js', 'Docker'],
        protocols: ['REST', 'WebSocket'],
        databases: ['PostgreSQL'],
        cloud: ['AWS'],
        tools: ['Git', 'Docker Compose'],
      },
      architectureDNA: {
        pattern: 'Layered Microservices',
        layers: [
          { name: 'Client Presentation', components: ['Next.js App Router', 'Tailwind CSS'], technology: 'React' },
          { name: 'Application API', components: ['FastAPI Engine', 'Background Tasks'], technology: 'Python' },
          { name: 'Persistence', components: ['Relational DB', 'Vector Store'], technology: 'PostgreSQL' },
        ],
        dataFlow: [
          'Client initiates HTTPS payload',
          'API Gateway validates JWT and routes request',
          'Service executes logic and writes to persistence layer',
        ],
      },
      componentDNA: {
        hardware: [],
        software: (project?.technologies || []).map(t => ({
          name: t,
          type: 'software',
          purpose: `Core ${t} integration module`,
          reusable: true,
          dependencies: [],
        })),
        services: [
          { name: 'Auth Module', type: 'service', purpose: 'Session authentication', reusable: true, dependencies: [] },
          { name: 'Data Pipeline', type: 'service', purpose: 'Telemetry parsing', reusable: true, dependencies: [] },
        ],
      },
      decisionDNA: {
        decisions: [
          {
            id: `dec-${Date.now()}-1`,
            what: 'Use decoupled frontend and backend services',
            why: 'Enable independent scalability and cleaner test boundaries',
            alternatives: ['Monolithic server-side templates'],
            outcome: 'Achieved modularity with 85% component reusability',
            confidence: 'high',
          },
        ],
      },
      failureDNA: {
        failures: [],
        totalFailures: 0,
        resolvedFailures: 0,
      },
      solutionDNA: {
        solutions: [],
        totalSolved: 0,
        verifiedSolutions: 0,
      },
      riskDNA: {
        risks: [],
        overallRisk: 'low',
      },
      dependencyDNA: {
        dependencies: [
          { from: 'Client Presentation', to: 'Application API', type: 'communicates', critical: true },
          { from: 'Application API', to: 'Persistence', type: 'requires', critical: true },
        ],
        criticalPath: ['Client Presentation', 'Application API', 'Persistence'],
      },
      evolutionHistory: [],
      reusabilityScore: 82,
      riskLevel: 'low',
      version: 1,
      createdAt: new Date().toISOString(),
    };

    demoDNA[projectId] = generatedDNA;
    return generatedDNA;
  }
}
