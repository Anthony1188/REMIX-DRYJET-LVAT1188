import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Snowflake,
  Zap,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import jsPDF from "jspdf";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "Automotive Restoration" | "Marine Blasting" | "Industrial Application";

interface FormState {
  name: string;
  email: string;
  category: Category;
  asset: string;
  scope: string;
}

// ─── AI call ─────────────────────────────────────────────────────────────────

const AI_BASE = import.meta.env.VITE_AI_BASE_URL ?? "https://api.manus.im/api/llm-proxy/v1";
const AI_KEY  = import.meta.env.VITE_AI_KEY ?? "";

async function generateQuote(form: FormState): Promise<string> {
  const systemPrompt = `You are a senior technical consultant for DryJet Solutions, based in Tampa, Florida.
Brand Tone: Professional, high-performance, expert restoration, eco-friendly, premium.
Target: High-end ${form.category} restoration using non-abrasive dry ice blasting technology.

INSTRUCTIONS:
1. Greet the customer, ${form.name}, professionally by name.
2. Provide a detailed technical assessment for their ${form.asset}.
3. Explain precisely how DryJet's non-abrasive dry ice blasting technology solves their specific issue: "${form.scope}".
4. Provide a clear Price Range:
   - Automotive: $1,500-$4,000 per session
   - Marine: $70-$100 per linear foot
   - Industrial: $350 per hour
5. List "Estimated Time to Complete" based on the scope.
6. Mention DryJet's key advantages: zero water, zero chemicals, no secondary waste, safe on sensitive surfaces.
7. Include a professional call to action for a physical inspection and scheduling.
8. Keep the response personalized, specific to the customer's asset and described condition.
9. Format clearly with section headers using ALL CAPS labels followed by a colon.
10. Keep total length to 350-450 words.`;

  const userMessage = `Prepare an official quote for ${form.name} regarding their ${form.asset}. Category: ${form.category}. Description of work needed: ${form.scope}`;

  const response = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_KEY}`,
    },
    body: JSON.stringify({
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user",   content: userMessage },
      ],
      max_tokens: 700,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "Unable to generate quote. Please try again.";
}

// ─── PDF download ─────────────────────────────────────────────────────────────

function downloadPDF(form: FormState, quoteText: string) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth  = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header bar
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(2);
  doc.line(0, 90, pageWidth, 90);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("DRYJET", 40, 52);
  doc.setTextColor(56, 189, 248);
  doc.setFontSize(14);
  doc.text("SOLUTIONS", 120, 52);

  doc.setTextColor(150, 150, 150);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("TAMPA BAY'S PREMIER NON-ABRASIVE CLEANING SPECIALISTS", 40, 70);

  const refNum  = `DJ-${Math.floor(Math.random() * 90000) + 10000}`;
  const dateStr = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(9);
  doc.text(`QUOTE #: ${refNum}`,  pageWidth - 40, 48, { align: "right" });
  doc.text(`DATE: ${dateStr}`,    pageWidth - 40, 62, { align: "right" });

  // Client info section
  doc.setFillColor(245, 247, 250);
  doc.rect(0, 90, pageWidth, 70, "F");
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("CLIENT:", 40, 118);
  doc.text("ASSET:",  40, 138);
  doc.setFont("helvetica", "normal");
  doc.text(form.name.toUpperCase(),  110, 118);
  doc.text(form.asset.toUpperCase(), 110, 138);
  doc.setTextColor(80, 80, 80);
  doc.text(`SERVICE CATEGORY: ${form.category.toUpperCase()}`, pageWidth - 40, 118, { align: "right" });
  doc.text(`EMAIL: ${form.email}`,                             pageWidth - 40, 138, { align: "right" });

  // Divider
  doc.setDrawColor(56, 189, 248);
  doc.setLineWidth(1);
  doc.line(40, 168, pageWidth - 40, 168);

  // Quote body
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(40, 40, 40);
  const lines = doc.splitTextToSize(quoteText, pageWidth - 80);
  let y = 190;
  for (const line of lines) {
    if (y > pageHeight - 60) { doc.addPage(); y = 60; }
    if (/^[A-Z\s]{4,}:/.test(line)) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(10, 10, 10);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setTextColor(40, 40, 40);
    }
    doc.text(line, 40, y);
    y += 15;
  }

  // Footer
  doc.setFillColor(245, 245, 245);
  doc.rect(0, pageHeight - 36, pageWidth, 36, "F");
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(0, pageHeight - 36, pageWidth, pageHeight - 36);
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 140);
  doc.text(
    "DryJet Solutions LLC  |  Non-Abrasive Precision Cleaning  |  Tampa Bay, FL  |  info@dryjetsolutions.com",
    pageWidth / 2, pageHeight - 16, { align: "center" }
  );

  doc.save(`DryJet_Official_Quote_${form.name.replace(/\s+/g, "_")}.pdf`);
}

// ─── Component ────────────────────────────────────────────────────────────────

export const QuoteWidget = () => {
  const [form, setForm] = useState<FormState>({
    name: "", email: "", category: "Automotive Restoration", asset: "", scope: "",
  });
  const [step,      setStep]      = useState<"form" | "loading" | "result">("form");
  const [quoteText, setQuoteText] = useState("");
  const [error,     setError]     = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step === "result" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.asset.trim() || !form.scope.trim()) {
      setError("Please complete all fields to receive your DryJet quote.");
      return;
    }
    setError("");
    setStep("loading");
    try {
      const text = await generateQuote(form);
      setQuoteText(text);
      setStep("result");
    } catch {
      setError("Service error — please try again.");
      setStep("form");
    }
  };

  const reset = () => { setStep("form"); setQuoteText(""); setError(""); };

  return (
    <div className="w-full max-w-[560px] mx-auto">
      <div className="border border-border bg-card overflow-hidden shadow-2xl shadow-black/60">

        {/* ── Brand header ── */}
        <div className="bg-black border-b-2 border-brand-cyan px-8 py-7 flex items-center gap-4">
          <svg width="44" height="44" viewBox="0 0 100 100" aria-hidden="true">
            <g fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M50 35 L65 43 L65 57 L50 65 L35 57 L35 43 Z"/>
              <path d="M50 35 L50 65 M35 43 L50 50 L65 43" opacity="0.7"/>
              <path d="M50 5 L65 13 L65 27 L50 35 L35 27 L35 13 Z"/>
              <path d="M80 20 L95 28 L95 42 L80 50 L65 42 L65 28 Z"/>
              <path d="M80 50 L95 58 L95 72 L80 80 L65 72 L65 58 Z"/>
              <path d="M50 65 L65 73 L65 87 L50 95 L35 87 L35 73 Z"/>
              <path d="M20 50 L35 58 L35 72 L20 80 L5 72 L5 58 Z"/>
              <path d="M20 20 L35 28 L35 42 L20 50 L5 42 L5 28 Z"/>
            </g>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-display text-3xl font-black italic tracking-tighter text-white">
              DRY<span className="text-brand-cyan">JET</span>
            </span>
            <span className="font-display text-[9px] tracking-[0.55em] uppercase text-brand-cyan/70 mt-0.5 ml-0.5">
              SOLUTIONS
            </span>
          </div>
          <div className="ml-auto text-right">
            <p className="font-display text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Official</p>
            <p className="font-display text-[11px] uppercase tracking-[0.15em] text-brand-cyan">Quoting Portal</p>
          </div>
        </div>

        {/* ── Steps ── */}
        <AnimatePresence mode="wait">

          {/* FORM */}
          {step === "form" && (
            <motion.div key="form"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div className="text-center">
                  <p className="eyebrow mb-2">Technician Analysis</p>
                  <p className="text-xs text-muted-foreground font-light">
                    Submit your project details for an AI-powered expert quote.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Customer Name" required>
                    <input type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Full Name" className="widget-input" />
                  </Field>
                  <Field label="Email Address" required>
                    <input type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com" className="widget-input" />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5">
                  <Field label="Asset Category" required>
                    <div className="relative">
                      <select value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value as Category })}
                        className="widget-input appearance-none pr-8">
                        <option value="Automotive Restoration">Automotive</option>
                        <option value="Marine Blasting">Marine / Vessel</option>
                        <option value="Industrial Application">Industrial / Heavy</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                  </Field>
                  <Field label="Asset Details" required>
                    <input type="text" value={form.asset}
                      onChange={e => setForm({ ...form, asset: e.target.value })}
                      placeholder="Year / Make / Model" className="widget-input" />
                  </Field>
                </div>

                <Field label="Project Scope & Description" required>
                  <textarea value={form.scope}
                    onChange={e => setForm({ ...form, scope: e.target.value })}
                    placeholder="e.g., Heavy surface rust on chassis, oil leaks in engine bay, or bottom paint removal..."
                    rows={4} className="widget-input resize-none" />
                </Field>

                {error && <p className="text-xs text-red-400 font-light text-center">{error}</p>}

                <button type="submit"
                  className="w-full py-4 bg-gradient-to-r from-brand-cyan to-blue-600 text-black font-display font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 hover:scale-[1.01] transition-all duration-200 shadow-lg shadow-brand-cyan/20">
                  <Zap size={14} />
                  Get My DryJet Quote
                </button>
              </form>
            </motion.div>
          )}

          {/* LOADING */}
          {step === "loading" && (
            <motion.div key="loading"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="p-12 flex flex-col items-center justify-center gap-6 min-h-[320px]">
              <div className="relative">
                <div className="w-16 h-16 border border-brand-cyan/20 flex items-center justify-center">
                  <Snowflake className="w-6 h-6 text-brand-cyan/40" strokeWidth={1} />
                </div>
                <Loader2 className="absolute inset-0 m-auto w-10 h-10 text-brand-cyan animate-spin" strokeWidth={1.5} />
              </div>
              <div className="text-center space-y-1">
                <p className="font-display text-[11px] uppercase tracking-[0.2em] text-brand-cyan">
                  Analyzing Your Project
                </p>
                <p className="text-xs text-muted-foreground font-light">
                  Our AI technician is preparing your personalized estimate...
                </p>
              </div>
            </motion.div>
          )}

          {/* RESULT */}
          {step === "result" && (
            <motion.div key="result" ref={resultRef}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="p-8 space-y-6">

              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Official Estimate
                  </p>
                  <h3 className="font-display text-sm uppercase tracking-wide text-white">
                    For <span className="text-brand-cyan">{form.name}</span>
                  </h3>
                </div>
              </div>

              <div className="bg-black/50 border border-brand-cyan/20 p-6">
                <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-light">
                  {quoteText}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button onClick={() => downloadPDF(form, quoteText)}
                  className="w-full py-4 bg-gradient-to-r from-brand-cyan to-blue-600 text-black font-display font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-brand-cyan/20">
                  <Download size={14} />
                  Download Official PDF Report
                </button>
                <button onClick={reset}
                  className="w-full py-3 border border-border bg-background/40 hover:bg-card transition-colors font-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground flex items-center justify-center gap-2">
                  <RotateCcw size={11} />
                  Cancel & Start New Quote
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Footer bar */}
        <div className="px-6 py-3 bg-black/40 border-t border-border">
          <p className="font-display text-[9px] uppercase tracking-[0.3em] text-muted-foreground text-center">
            DryJet Solutions LLC · Tampa Bay Operations
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const Field = ({
  label, required, children,
}: {
  label: string; required?: boolean; children: React.ReactNode;
}) => (
  <div className="border border-border bg-background/40 px-4 pt-3 pb-3 focus-within:border-brand-cyan/45 transition-colors">
    <label className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {label}{required && <span className="text-brand-cyan"> *</span>}
    </label>
    <div className="mt-2">{children}</div>
  </div>
);

export default QuoteWidget;
