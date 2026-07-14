import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  // Simple password check (in production, use proper authentication)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@Aeropeak2026';

  if (password === ADMIN_PASSWORD) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid password' },
      { status: 401 }
    );
  }
}
