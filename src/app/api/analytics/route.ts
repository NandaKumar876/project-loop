import { NextResponse } from 'next/server';
import { institutionalStats, demoFailures, demoProjects } from '@/lib/demo-data';

export async function GET() {
  try {
    const totalFailures = demoFailures.length;
    const resolvedFailures = demoFailures.filter(f => f.status === 'resolved').length;
    const resolutionRate = Math.round((resolvedFailures / totalFailures) * 100);
    const estimatedHoursSaved = resolvedFailures * 18;

    return NextResponse.json({
      success: true,
      data: {
        ...institutionalStats,
        resolutionRate,
        estimatedHoursSaved,
        activeProjectsCount: demoProjects.length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve institutional analytics' },
      { status: 500 }
    );
  }
}
