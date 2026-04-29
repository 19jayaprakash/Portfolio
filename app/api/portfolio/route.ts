import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch latest portfolio data from Supabase
    const { data, error } = await supabase
      .from('portfolio_data')
      .select('data')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching portfolio data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portfolio data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data.data });
  } catch (error) {
    console.error('Error in portfolio API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
