"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store auth token in sessionStorage
        sessionStorage.setItem("adminAuthenticated", "true");
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--bg-primary)" }}>
      <div
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--accent)" }}
          >
            <Lock size={32} color="#fff" />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Admin Login
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Enter your password to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-mono uppercase tracking-widest mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
              style={{
                background: "var(--bg-primary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "#EF4444" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>


      </div>
    </div>
  );
}
