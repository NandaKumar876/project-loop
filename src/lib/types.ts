// ============================================================
// PROJECTLOOP - Core Type Definitions
// ============================================================

export type UserRole = 'student' | 'faculty' | 'admin';
export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived';
export type FailureStatus = 'open' | 'investigating' | 'resolved';
export type AttemptResult = 'failed' | 'partial' | 'success';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Confidence = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  domain: string;
  ownerId: string;
  ownerName: string;
  status: ProjectStatus;
  teamMembers: TeamMember[];
  technologies: string[];
  hardware: string[];
  software: string[];
  problemStatement: string;
  expectedOutcome: string;
  githubUrl?: string;
  uploads: ProjectUpload[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export interface ProjectUpload {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  category: 'report' | 'presentation' | 'code' | 'diagram' | 'image' | 'notes' | 'other';
  uploadedAt: string;
}

export interface ProjectDNA {
  id: string;
  projectId: string;
  technologyDNA: TechnologyDNA;
  architectureDNA: ArchitectureDNA;
  componentDNA: ComponentDNA;
  decisionDNA: DecisionDNA;
  failureDNA: FailureDNA;
  solutionDNA: SolutionDNA;
  riskDNA: RiskDNA;
  dependencyDNA: DependencyDNA;
  evolutionHistory: EvolutionEntry[];
  reusabilityScore: number;
  riskLevel: RiskLevel;
  version: number;
  createdAt: string;
}

export interface TechnologyDNA {
  languages: string[];
  frameworks: string[];
  platforms: string[];
  protocols: string[];
  databases: string[];
  cloud: string[];
  tools: string[];
}

export interface ArchitectureDNA {
  pattern: string;
  layers: ArchitectureLayer[];
  dataFlow: string[];
  diagram?: string;
}

export interface ArchitectureLayer {
  name: string;
  components: string[];
  technology: string;
}

export interface ComponentDNA {
  hardware: ComponentInfo[];
  software: ComponentInfo[];
  services: ComponentInfo[];
}

export interface ComponentInfo {
  name: string;
  type: string;
  purpose: string;
  reusable: boolean;
  dependencies: string[];
}

export interface DecisionDNA {
  decisions: Decision[];
}

export interface Decision {
  id: string;
  what: string;
  why: string;
  alternatives: string[];
  outcome: string;
  confidence: Confidence;
}

export interface FailureDNA {
  failures: Failure[];
  totalFailures: number;
  resolvedFailures: number;
}

export interface Failure {
  id: string;
  projectId: string;
  title: string;
  description: string;
  category: string;
  rootCause: string;
  severity: RiskLevel;
  status: FailureStatus;
  attempts: FailureAttempt[];
  solution?: Solution;
  affectedProjects: number;
  createdAt: string;
}

export interface FailureAttempt {
  id: string;
  failureId: string;
  attemptNumber: number;
  approach: string;
  result: AttemptResult;
  evidence: string;
  lesson: string;
}

export interface Solution {
  id: string;
  failureId: string;
  solution: string;
  effectiveness: number;
  evidence: string;
  verified: boolean;
  verifiedBy?: string;
  confidence: Confidence;
}

export interface SolutionDNA {
  solutions: Solution[];
  totalSolved: number;
  verifiedSolutions: number;
}

export interface RiskDNA {
  risks: RiskPattern[];
  overallRisk: RiskLevel;
}

export interface RiskPattern {
  id: string;
  pattern: string;
  description: string;
  severity: RiskLevel;
  occurrences: number;
  affectedDomains: string[];
  mitigation: string;
  evidence: EvidenceItem[];
}

export interface DependencyDNA {
  dependencies: Dependency[];
  criticalPath: string[];
}

export interface Dependency {
  from: string;
  to: string;
  type: 'requires' | 'communicates' | 'extends' | 'uses';
  critical: boolean;
}

export interface EvolutionEntry {
  id: string;
  parentProjectId: string;
  childProjectId: string;
  parentProjectName: string;
  childProjectName: string;
  mutationReason: string;
  changes: string[];
  outcome: string;
  createdBy: string;
  createdAt: string;
}

export interface ProjectSimilarity {
  projectId: string;
  projectName: string;
  domain: string;
  overallScore: number;
  reasons: SimilarityReason[];
  sharedTechnologies: string[];
  sharedComponents: string[];
  sharedFailures: string[];
  sharedSolutions: string[];
}

export interface SimilarityReason {
  factor: string;
  match: string;
  weight: number;
}

export interface WhatIfScenario {
  id: string;
  projectId: string;
  original: WhatIfComponent;
  proposed: WhatIfComponent;
  impact: WhatIfImpact;
  createdAt: string;
}

export interface WhatIfComponent {
  name: string;
  type: string;
  layer: string;
}

export interface WhatIfImpact {
  architectureImpact: ImpactDetail;
  dependencyImpact: ImpactDetail;
  historicalEvidence: HistoricalEvidence[];
  potentialRisks: string[];
  knownSuccesses: string[];
  knownFailures: string[];
  suggestedMitigation: string[];
  overallRisk: RiskLevel;
  confidence: Confidence;
}

export interface ImpactDetail {
  level: 'none' | 'low' | 'medium' | 'high' | 'breaking';
  affectedComponents: string[];
  description: string;
  changes: string[];
}

export interface HistoricalEvidence {
  projectId: string;
  projectName: string;
  description: string;
  outcome: string;
  year: string;
}

export interface EvidenceItem {
  id: string;
  type: 'project' | 'solution' | 'failure' | 'decision';
  sourceProjectId: string;
  sourceProjectName: string;
  description: string;
  confidence: Confidence;
}

export interface Recommendation {
  id: string;
  type: 'component' | 'technology' | 'architecture' | 'solution' | 'warning';
  title: string;
  description: string;
  evidence: EvidenceItem[];
  confidence: Confidence;
  priority: 'low' | 'medium' | 'high';
}

export interface AIChat {
  id: string;
  messages: AIChatMessage[];
  projectContext?: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  evidence?: EvidenceItem[];
  timestamp: string;
}

export interface InstitutionalStats {
  totalProjects: number;
  totalKnowledgeChunks: number;
  totalFailuresResolved: number;
  totalEvolutions: number;
  totalReusableComponents: number;
  totalTechnologies: number;
  topDomains: { name: string; count: number }[];
  topTechnologies: { name: string; count: number }[];
  failurePatterns: { pattern: string; count: number }[];
  monthlyProjects: { month: string; count: number }[];
}
