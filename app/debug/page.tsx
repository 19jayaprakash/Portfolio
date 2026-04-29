"use client";
import { useState } from "react";

export default function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/portfolio?t=${Date.now()}`);
      const result = await res.json();
      setData(result);
      console.log("API Response:", result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">API Debug Tool</h1>
      
      <button
        onClick={fetchData}
        disabled={loading}
        className="px-6 py-3 bg-[#C8956B] rounded-lg font-medium mb-6 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch /api/portfolio"}
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400">Error: {error}</p>
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-2 text-[#C8956B]">Meta Info</h2>
            <pre className="text-sm text-gray-300">
              {JSON.stringify(data._meta, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-2 text-[#C8956B]">Services Data</h2>
            <pre className="text-sm text-gray-300 overflow-auto max-h-96">
              {JSON.stringify(data.data?.services, null, 2)}
            </pre>
          </div>

          <div className="p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
            <h2 className="text-xl font-bold mb-2 text-[#C8956B]">Full Response</h2>
            <pre className="text-xs text-gray-400 overflow-auto max-h-[600px]">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
