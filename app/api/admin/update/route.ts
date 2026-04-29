import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Check if there's existing data
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from('portfolio_data')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error checking existing data:', fetchError);
      return NextResponse.json(
        { success: false, message: 'Failed to update data' },
        { status: 500 }
      );
    }

    let error;

    if (existingData && existingData.length > 0) {
      // Update existing record
      const { error: updateError } = await supabaseAdmin
        .from('portfolio_data')
        .update({ data: data })
        .eq('id', existingData[0].id);
      
      error = updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabaseAdmin
        .from('portfolio_data')
        .insert([{ data: data }]);
      
      error = insertError;
    }

    if (error) {
      console.error('Error saving to Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to save data' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in update API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save data' },
      { status: 500 }
    );
  }
}
