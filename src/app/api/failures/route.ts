import { NextResponse } from 'next/server';
import { FailuresService } from '@/services/failures.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (projectId) {
      const failures = await FailuresService.getFailuresByProject(projectId);
      return NextResponse.json({ success: true, count: failures.length, data: failures });
    }

    const allFailures = await FailuresService.getAllFailures();
    return NextResponse.json({ success: true, count: allFailures.length, data: allFailures });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve failure memory records' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { failureId, attempt } = await request.json();
    if (!failureId || !attempt) {
      return NextResponse.json(
        { success: false, error: 'failureId and attempt payload are required' },
        { status: 400 }
      );
    }

    const updated = await FailuresService.addAttempt(failureId, attempt);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Failure record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to log failure attempt' },
      { status: 500 }
    );
  }
}
