import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Menu, X, Snowflake } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
  { to: "/quote", label: "Get Quote" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 md:px-8 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex bg-background/85 border border-border px-4 py-3 backdrop-blur-md items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <Snowflake className="w-5 h-5 text-brand-cyan transition-colors duration-300 group-hover:text-brand-gold" strokeWidth={1.5} />
            <span className="text-[10px] uppercase whitespace-nowrap text-foreground tracking-[0.18em] font-display">
              DryJet <span className="text-muted-foreground">|| Solutions</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center border border-border bg-card/90">
            {links.map((l, idx) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={`text-[10px] uppercase transition-colors duration-300 hover:text-brand-gold tracking-[0.18em] font-display px-6 py-3 ${
                    active ? "text-foreground" : "text-[hsl(216_11%_72%)]"
                  } ${idx < links.length - 1 ? "border-r border-border" : ""}`}
                >
                  {l.label}
                </NavLink>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to="/quote"
            className="hidden md:inline-flex group items-center gap-4 text-[10px] md:text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-gradient-to-r from-brand-cyan/10 to-blue-600/10 border border-brand-cyan/40 px-5 py-3.5 hover:border-brand-cyan hover:from-brand-cyan/20 hover:to-blue-600/20 transition-all"
          >
            <span className="inline-flex items-center gap-3">
              <span className="dot w-1.5 h-1.5 bg-brand-cyan" />
              <span className="text-brand-cyan">Get a Quote</span>
            </span>
            <ChevronRight className="w-4 h-4 text-brand-cyan transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-2 max-w-7xl mx-auto border border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[11px] tracking-[0.18em] uppercase font-display text-[hsl(216_11%_75%)] hover:text-brand-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center px-5 py-3 text-[11px] uppercase tracking-[0.18em] font-display text-brand-cyan border border-brand-cyan/40 bg-brand-cyan/10 hover:bg-brand-cyan/20 transition-all"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
