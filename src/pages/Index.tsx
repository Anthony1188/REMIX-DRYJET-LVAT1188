import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Snowflake, Leaf, Gauge, ShieldCheck } from "lucide-react";
import { AnimatedGrid } from "@/components/AnimatedGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { Testimonials } from "@/components/Testimonials";
import { QuoteWidget } from "@/components/QuoteWidget";
import marineImg from "@/assets/service-marine.jpg";
import autoImg from "@/assets/service-auto.jpg";
import coldImg from "@/assets/service-coldchain.jpg";

const services = [
  {
    no: "SVC.01",
    title: "Automotive",
    desc: "Concours-level restoration for supercars, classics, and exotic interiors. Engine bays, undercarriages, leather and trim — restored without abrasion.",
    quote: "FACTORY FINISH. NO COMPROMISE.",
    img: autoImg,
    size: "large" as const,
    to: "/services",
  },
  {
    no: "SVC.02",
    title: "Marine & Yacht",
    desc: "Hull, deck, and engine room cleaning dockside. No runoff, no chemicals, no environmental impact on protected waters.",
    img: marineImg,
    size: "small" as const,
    to: "/services",
  },
  {
    no: "SVC.03",
    title: "Industrial Cold-Chain",
    desc: "Full-solution provider for food processing, pharmaceutical, and logistics. Sanitation, equipment cleaning, and dry ice supply on demand.",
    img: coldImg,
    size: "small" as const,
    to: "/services",
  },
];

const stats = [
  { v: "0L", k: "Water used per job" },
  { v: "100%", k: "Sublimation — no waste" },
  { v: "−78°C", k: "Cleaning temperature" },
  { v: "24/7", k: "Cold-chain support" },
];

const principles = [
  { Icon: Leaf, t: "Eco-friendly", d: "No water, no solvents, no secondary waste stream." },
  { Icon: Gauge, t: "Non-abrasive", d: "Safe on carbon fiber, electronics, leather, and gelcoat." },
  { Icon: Snowflake, t: "Sublimating", d: "CO₂ returns to atmosphere — no cleanup of the cleaner." },
  { Icon: ShieldCheck, t: "Insured & certified", d: "Trained technicians, marine-rated equipment, full coverage." },
];

const Index = () => {
  useEffect(() => {
    document.title = "DryJet Solutions — Waterless Dry Ice Cleaning";
    const desc =
      "Eco-friendly dry ice blasting for supercars, yachts, and industrial cold-chain. Zero water. Zero residue. Total restoration.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <div>
      {/* HERO — USDA-style with 3D animated grid */}
      <section className="min-h-screen flex overflow-hidden z-10 pt-0 pb-0 relative items-center">
        <AnimatedGrid />

        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 grid grid-cols-1 xl:grid-cols-12 xl:gap-12 items-end">
          <div className="xl:col-span-9 flex flex-col pt-10 md:pt-16 xl:pt-0">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex gap-4 items-center mb-7 md:mb-9"
            >
              <span className="w-7 md:w-10 h-px bg-brand-cyan shrink-0" />
              <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-[hsl(216_11%_75%)] font-display">
                Waterless · Precision · Eco
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display uppercase leading-[0.9] tracking-[-0.065em] mb-7 md:mb-8"
            >
              <span className="block text-[2.55rem] sm:text-[3.6rem] md:text-[4.7rem] lg:text-[5.8rem] xl:text-[6.6rem] text-slate-700/50">
                CLEAN.
              </span>
              <span className="block text-[2.55rem] sm:text-[3.6rem] md:text-[4.7rem] lg:text-[5.8rem] xl:text-[6.6rem] text-foreground">
                BEYOND CLEAN.
              </span>
              <span className="block text-[2.55rem] sm:text-[3.6rem] md:text-[4.7rem] lg:text-[5.8rem] xl:text-[6.6rem] bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-ice">
                RESTORED TO FACTORY.
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[0.95rem] sm:text-[1rem] md:text-base md:max-w-[34rem] xl:max-w-[42rem] mb-8 leading-relaxed font-light text-[hsl(216_11%_72%)]"
            >
              DryJet Solutions delivers concours-grade dry ice cleaning for
              high-end automotive, marine, and industrial cold-chain clients.
              No water. No chemicals. No residue.
            </motion.p>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 px-5 py-3.5 md:px-7 md:py-4 text-[10px] md:text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card/90 border border-border hover-gold"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                  <span>Request a Quote</span>
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center gap-4 px-5 py-3.5 md:px-7 md:py-4 text-[10px] md:text-[11px] uppercase text-[hsl(216_11%_75%)] tracking-[0.18em] font-display border border-border hover:text-foreground hover:border-brand-cyan/40 transition-colors"
              >
                <span>Explore Services</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.k}
              className={`px-6 lg:px-10 py-10 ${i > 0 ? "md:border-l border-border" : ""} ${
                i % 2 === 1 ? "border-l border-border md:border-l" : ""
              } ${i === 2 ? "border-t md:border-t-0 border-border" : ""} ${
                i === 3 ? "border-t md:border-t-0 border-border" : ""
              }`}
            >
              <div className="font-display text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-ice">
                {s.v}
              </div>
              <div className="mt-3 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* METHOD / WHY */}
      <section className="border-t border-border relative overflow-hidden bg-background">
        <div className="absolute left-[10%] top-[20%] h-[180px] w-[180px] rounded-full bg-brand-cyan/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <span className="eyebrow">/ The Method</span>
              <h2 className="mt-6 font-display uppercase text-[2rem] sm:text-[2.4rem] md:text-[3rem] leading-[0.95] tracking-tight">
                Solid CO₂ at <br />
                <span className="text-brand-cyan">Mach speed.</span>
              </h2>
              <p className="mt-6 text-[hsl(216_11%_72%)] leading-relaxed font-light max-w-md">
                Pellets of food-grade dry ice are accelerated against the surface,
                sublimating on impact. Contaminants lift away — the substrate
                remains untouched, dry, and ready in a fraction of the time.
              </p>
              <div className="mt-6 flex gap-2">
                <div className="w-2 h-2 bg-border" />
                <div className="w-2 h-2 bg-brand-cyan" />
                <div className="w-2 h-2 bg-brand-gold" />
              </div>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
              {principles.map(({ Icon, t, d }) => (
                <div key={t} className="bg-card border border-border p-8 transition-colors hover:border-brand-cyan/30">
                  <Icon className="text-brand-cyan" size={26} strokeWidth={1.5} />
                  <h3 className="mt-5 text-base font-display uppercase tracking-tight text-foreground">{t}</h3>
                  <p className="mt-3 text-sm text-[hsl(216_11%_72%)] leading-relaxed font-light">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — ENV-card grid */}
      <section className="border-t border-border bg-background relative overflow-hidden">
        <div className="absolute right-[10%] top-[16%] h-[180px] w-[180px] rounded-full bg-brand-blue/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
            <div>
              <span className="eyebrow">/ Capabilities</span>
              <h2 className="mt-6 font-display uppercase text-[2rem] sm:text-[2.5rem] md:text-[3.2rem] leading-none tracking-tight">
                Three Industries. <br />
                <span className="text-brand-cyan">One Method.</span>
              </h2>
              <p className="mt-6 text-base text-[hsl(216_11%_72%)] font-light max-w-xl leading-relaxed">
                A premium cleaning method must translate across formats, surfaces,
                and contexts. The same architectural logic, three experiential realities.
              </p>
            </div>
            <div className="flex gap-2 mb-2">
              <div className="w-2 h-2 bg-border" />
              <div className="w-2 h-2 bg-brand-cyan" />
              <div className="w-2 h-2 bg-brand-gold" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden bg-background border border-border transition-colors duration-500 hover:border-brand-cyan/30 ${
                  s.size === "large" ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <Link to={s.to} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover transition-all duration-700 opacity-60 grayscale group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  </div>

                  <div className="p-6 sm:p-8 relative -mt-12 z-10">
                    <div className="mb-4">
                      <span className="text-[10px] uppercase font-display text-brand-cyan tracking-[0.18em] bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-1">
                        {s.no}
                      </span>
                    </div>
                    <h3 className="text-lg uppercase text-foreground font-display mb-3 tracking-tight">{s.title}</h3>
                    <p className="text-sm font-light text-[hsl(216_11%_72%)] leading-relaxed mb-4">{s.desc}</p>
                    {s.quote && (
                      <p className="text-xs font-medium text-brand-gold tracking-wide italic font-display">
                        {s.quote}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <Testimonials />

      {/* QUOTE WIDGET — embedded inline */}
      <section className="border-t border-border bg-background relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] bg-brand-cyan/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — copy */}
            <div>
              <span className="eyebrow">/ Instant Estimate</span>
              <h2 className="mt-6 font-display uppercase text-[2rem] sm:text-[2.4rem] md:text-[3rem] leading-[0.95] tracking-tight">
                Get your AI-powered <br />
                <span className="text-brand-cyan">DryJet quote.</span>
              </h2>
              <p className="mt-6 text-[hsl(216_11%_72%)] leading-relaxed font-light max-w-md">
                Describe your asset and project scope. Our AI technician analyzes your requirements
                and generates a personalized, professional estimate — instantly. Download your
                official PDF quote in seconds.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { label: "Automotive", detail: "$1,500 – $4,000 per session" },
                  { label: "Marine / Vessel", detail: "$70 – $100 per linear foot" },
                  { label: "Industrial", detail: "$350 per hour" },
                ].map(({ label, detail }) => (
                  <div key={label} className="flex items-center justify-between border-b border-border pb-3">
                    <span className="font-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                    <span className="font-display text-[11px] text-brand-cyan">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Right — widget */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <QuoteWidget />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <h2 className="font-display uppercase text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] leading-[1.02] tracking-tight">
              Your asset deserves the <br />
              <span className="text-brand-cyan">cleanest restoration available.</span>
            </h2>
            <div className="lg:pl-12">
              <p className="text-[hsl(216_11%_72%)] text-base leading-relaxed font-light">
                Mobile service across the region. Dockside. In your garage. At
                your facility. Tell us what you need cleaned — we bring the
                jet stream.
              </p>
              <Link
                to="/contact"
                className="mt-8 group inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card/90 border border-border hover-gold"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                  <span>Start a Project</span>
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
