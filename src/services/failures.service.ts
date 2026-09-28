import { demoFailures, globalRiskPatterns } from '@/lib/demo-data';
import { Failure, FailureAttempt, RiskPattern } from '@/lib/types';

export class FailuresService {
  /**
   * Fetch all documented failure memory records
   */
  static async getAllFailures(): Promise<Failure[]> {
    return demoFailures;
  }

  /**
   * Fetch failure records for a specific project
   */
  static async getFailuresByProject(projectId: string): Promise<Failure[]> {
    return demoFailures.filter(f => f.projectId === projectId);
  }

  /**
   * Add a new failure attempt to document institutional trial-and-error
   */
  static async addAttempt(failureId: string, attempt: Omit<FailureAttempt, 'id' | 'failureId'>): Promise<Failure | null> {
    const failure = demoFailures.find(f => f.id === failureId);
    if (!failure) return null;

    const newAttempt: FailureAttempt = {
      id: `att-${Date.now()}`,
      failureId,
      ...attempt,
    };

    failure.attempts.push(newAttempt);

    if (attempt.result === 'success') {
      failure.status = 'resolved';
      failure.solution = {
        id: `sol-${Date.now()}`,
        failureId,
        solution: attempt.lesson,
        effectiveness: 95,
        evidence: attempt.evidence,
        verified: true,
        confidence: 'high',
      };
    }

    return failure;
  }

  /**
   * Fetch global risk patterns across cohorts
   */
  static async getGlobalRiskPatterns(): Promise<RiskPattern[]> {
    return globalRiskPatterns;
  }
}
