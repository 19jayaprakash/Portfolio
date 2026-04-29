// Quick Supabase Test Script
// Run this with: node test-supabase.js

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables!');
  console.error('Create a .env.local file with:');
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_url');
  console.error('SUPABASE_SERVICE_ROLE_KEY=your_key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function test() {
  console.log('🔍 Testing Supabase Connection...\n');

  // 1. Fetch current data
  console.log('1️⃣ Fetching current data...');
  const { data: currentData, error: fetchError } = await supabase
    .from('portfolio_data')
    .select('id, data, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    console.error('❌ Fetch error:', fetchError);
    return;
  }

  console.log('✅ Current data found!');
  console.log('Last updated:', currentData?.updated_at);
  console.log('Services count:', currentData?.data?.services?.length || 0);
  console.log('First service:', currentData?.data?.services?.[0]?.title || 'N/A');
  console.log('');

  // 2. Update data
  console.log('2️⃣ Updating data...');
  const updatedData = {
    ...currentData.data,
    services: currentData.data.services.map((s, i) => 
      i === 0 ? { ...s, title: s.title + ' [TEST UPDATED]' } : s
    )
  };

  const { data: updated, error: updateError } = await supabase
    .from('portfolio_data')
    .update({ 
      data: updatedData,
      updated_at: new Date().toISOString()
    })
    .eq('id', currentData.id)
    .select();

  if (updateError) {
    console.error('❌ Update error:', updateError);
    return;
  }

  console.log('✅ Update successful!');
  console.log('New updated_at:', updated?.[0]?.updated_at);
  console.log('');

  // 3. Fetch again to verify
  console.log('3️⃣ Verifying update...');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second

  const { data: verifyData, error: verifyError } = await supabase
    .from('portfolio_data')
    .select('id, data, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (verifyError) {
    console.error('❌ Verify error:', verifyError);
    return;
  }

  console.log('✅ Verification fetch successful!');
  console.log('Updated at:', verifyData?.updated_at);
  console.log('First service:', verifyData?.data?.services?.[0]?.title);
  console.log('');

  if (verifyData?.data?.services?.[0]?.title?.includes('[TEST UPDATED]')) {
    console.log('🎉 SUCCESS! Supabase is updating correctly!');
    console.log('The issue is likely Next.js caching or RLS policies.');
  } else {
    console.log('❌ FAILED! Data did not update in Supabase.');
    console.log('Check your service role key and database permissions.');
  }
}

test();
