"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 md:px-12 md:py-16 text-primary-foreground">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/10 mb-6">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Weekly Creator Tips</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            No fluff, no spam. Just honest strategies that actually work, delivered every Monday.
          </p>

          {status === "success" ? (
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>You are in! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary hover:bg-primary-foreground/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                Subscribe
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-primary-foreground/50">Join 12,000+ creators. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
