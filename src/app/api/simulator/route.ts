import { NextResponse } from 'next/server';
import { SimulatorService } from '@/services/simulator.service';

export async function POST(request: Request) {
  try {
    const { original, proposed } = await request.json();
    if (!original || !proposed) {
      return NextResponse.json(
        { success: false, error: 'Both original and proposed components are required' },
        { status: 400 }
      );
    }

    const impact = SimulatorService.simulateComponentSwap(original, proposed);
    return NextResponse.json({ success: true, data: impact });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Simulation computation failed' },
      { status: 500 }
    );
  }
}
