import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Disable Next.js caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    console.log('Fetching portfolio data from Supabase...');
    
    // Fetch latest portfolio data from Supabase using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin
      .from('portfolio_data')
      .select('id, data, updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch portfolio data', details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      console.log('No data found in Supabase');
      return NextResponse.json(
        { error: 'No portfolio data found' },
        { status: 404 }
      );
    }

    console.log('Successfully fetched portfolio data');
    console.log('Last updated:', data.updated_at);
    console.log('Data preview:', JSON.stringify(data.data).substring(0, 200) + '...');
    
    return NextResponse.json({ 
      data: data.data,
      _meta: {
        updated_at: data.updated_at,
        fetched_at: new Date().toISOString()
      }
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('Error in portfolio API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data', details: error.message },
      { status: 500 }
    );
  }
}
