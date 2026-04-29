import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Updating portfolio data in Supabase...');

    // Check if there's existing data
    const { data: existingData, error: fetchError } = await supabaseAdmin
      .from('portfolio_data')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error checking existing data:', fetchError);
      return NextResponse.json(
        { success: false, message: 'Failed to update data', details: fetchError.message },
        { status: 500 }
      );
    }

    let error;

    if (existingData && existingData.length > 0) {
      // Update existing record
      console.log('Updating existing record with ID:', existingData[0].id);
      console.log('New services data:', JSON.stringify(data.services).substring(0, 200));
      
      const { error: updateError, data: updatedRecord } = await supabaseAdmin
        .from('portfolio_data')
        .update({ 
          data: data, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', existingData[0].id)
        .select();
      
      if (updateError) {
        console.error('Update error:', updateError);
      } else {
        console.log('Update successful!');
        console.log('Updated at:', updatedRecord?.[0]?.updated_at);
      }
      
      error = updateError;
    } else {
      // Insert new record
      console.log('Inserting new record');
      const { error: insertError } = await supabaseAdmin
        .from('portfolio_data')
        .insert([{ data: data }]);
      
      error = insertError;
    }

    if (error) {
      console.error('Error saving to Supabase:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to save data', details: error.message },
        { status: 500 }
      );
    }

    console.log('Successfully saved portfolio data');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in update API:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save data', details: error.message },
      { status: 500 }
    );
  }
}
