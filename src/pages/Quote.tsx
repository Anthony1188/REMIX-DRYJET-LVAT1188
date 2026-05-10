import { useEffect } from "react";
import { motion } from "framer-motion";
import { QuoteWidget } from "@/components/QuoteWidget";
import { AnimatedGrid } from "@/components/AnimatedGrid";

export default function Quote() {
  useEffect(() => {
    document.title = "Get a Quote — DryJet Solutions";
  }, []);

  return (
    <div className="relative min-h-screen">
      <AnimatedGrid />

      {/* Page header */}
      <section className="relative z-10 pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="eyebrow mb-4">Official Quoting Portal</p>
            <h1 className="font-display uppercase text-4xl md:text-5xl tracking-tight leading-none mb-4">
              Get Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-blue-400">
                DryJet Quote
              </span>
            </h1>
            <p className="text-muted-foreground font-light max-w-xl mx-auto text-sm leading-relaxed">
              Describe your asset and project scope. Our AI technician will analyze your requirements
              and generate a personalized estimate — instantly.
            </p>
          </motion.div>

          {/* Widget */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <QuoteWidget />
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center"
          >
            {[
              { stat: "0L", label: "Water used per job" },
              { stat: "100%", label: "Sublimation — no waste" },
              { stat: "−78°C", label: "Cleaning temperature" },
              { stat: "24/7", label: "Cold-chain support" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex flex-col items-center gap-1">
                <span className="font-display text-lg text-brand-cyan tracking-tight">{stat}</span>
                <span className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
