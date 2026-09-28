import { NextResponse } from 'next/server';
import { DnaService } from '@/services/dna.service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    if (projectId) {
      const dna = await DnaService.getDNAByProjectId(projectId);
      if (!dna) {
        return NextResponse.json({ success: false, error: 'DNA not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: dna });
    }

    const allDna = await DnaService.getAllDNA();
    return NextResponse.json({ success: true, data: allDna });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve Project DNA' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json();
    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId is required' }, { status: 400 });
    }

    const extracted = await DnaService.extractDNA(projectId);
    return NextResponse.json({ success: true, data: extracted }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to extract Project DNA' },
      { status: 500 }
    );
  }
}
