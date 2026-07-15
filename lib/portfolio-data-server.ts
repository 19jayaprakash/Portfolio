import { supabaseAdmin } from "@/lib/supabase";
import { defaultPortfolioData, PortfolioData } from "./portfolio-data";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("Supabase credentials missing on server. Falling back to default data.");
      return defaultPortfolioData;
    }

    const { data, error } = await supabaseAdmin
      .from("portfolio_data")
      .select("data")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Supabase query error on server:", error.message);
      return defaultPortfolioData;
    }

    if (data?.data) {
      return data.data as PortfolioData;
    }
  } catch (err: any) {
    console.error("Error fetching portfolio data on server:", err);
  }
  return defaultPortfolioData;
}
