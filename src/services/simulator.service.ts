import { WhatIfImpact, WhatIfComponent } from '@/lib/types';
import { demoFailures, demoProjects } from '@/lib/demo-data';

export class SimulatorService {
  /**
   * Run What-If simulation comparing an original component to a proposed component
   */
  static simulateComponentSwap(
    original: WhatIfComponent,
    proposed: WhatIfComponent
  ): WhatIfImpact {
    const origName = original.name.toLowerCase();
    const propName = proposed.name.toLowerCase();

    // Check historical evidence for proposed component
    const historicalFailures = demoFailures.filter(
      f => f.title.toLowerCase().includes(propName) || f.description.toLowerCase().includes(propName)
    );

    const isBreaking =
      (origName.includes('sql') && propName.includes('dynamo')) ||
      (origName.includes('mqtt') && propName.includes('http')) ||
      (propName.includes('dht11'));

    return {
      architectureImpact: {
        level: isBreaking ? 'breaking' : 'medium',
        affectedComponents: [
          'Persistence Layer Interface',
          'Query Executor Service',
          'Telemetry Streamer',
        ],
        description: `Transitioning from ${original.name} to ${proposed.name} requires refactoring schema access patterns and client connection pooling.`,
        changes: [
          `Replace ${original.name} client library with ${proposed.name} SDK`,
          'Refactor query boundaries and concurrency mechanisms',
          'Audit memory overhead under peak load',
        ],
      },
      dependencyImpact: {
        level: isBreaking ? 'high' : 'low',
        affectedComponents: ['Telemetry Logger', 'WebSocket Dispatcher'],
        description: `Downstream services dependent on ${original.name} synchronous guarantees must implement async queues.`,
        changes: ['Update Docker Compose configuration', 'Reconfigure environment variables'],
      },
      historicalEvidence: demoProjects.slice(0, 2).map(p => ({
        projectId: p.id,
        projectName: p.name,
        description: `Attempted ${proposed.name} integration in 2025 cohort`,
        outcome: historicalFailures.length > 0 ? 'Encountered known bottleneck' : 'Validated successfully',
        year: '2025',
      })),
      potentialRisks: [
        `Unhandled socket timeout in ${proposed.name} under packet burst conditions`,
        'Increased cold-start latency during container initialization',
      ],
      knownSuccesses: [
        `Horizontal scalability improved when tested with asynchronous backpressure`,
      ],
      knownFailures: historicalFailures.map(f => f.title).concat([
        `Buffer exhaustion when payload exceeds 256KB`,
      ]),
      suggestedMitigation: [
        'Deploy an intermediate queue (RabbitMQ / BullMQ) to absorb sudden spikes',
        'Add circuit breaker pattern around network call sites',
      ],
      overallRisk: isBreaking ? 'critical' : 'medium',
      confidence: 'high',
    };
  }
}
