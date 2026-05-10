import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteLayout } from "./components/site-layout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Blog from "./pages/Blog.tsx";
import Quote from "./pages/Quote.tsx";
import NotFound from "./pages/NotFound.tsx";
// Admin
import { AdminAuth } from "./admin/AdminAuth";
import { AdminLayout } from "./admin/AdminLayout";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminLeads from "./admin/pages/AdminLeads";
import AdminQuotes from "./admin/pages/AdminQuotes";
import AdminSettings from "./admin/pages/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/insights" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
          </Route>

          {/* Admin dashboard — password protected */}
          <Route
            path="/admin/*"
            element={
              <AdminAuth>
                <AdminLayout />
              </AdminAuth>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
