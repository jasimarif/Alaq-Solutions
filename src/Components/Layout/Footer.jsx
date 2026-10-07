import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { COMPANY, BOOKING_CTA_LABEL } from '../../data/config';
import { scrollToTarget } from '../../utils/lenis';

const FOOTER_LINKS = {
  workflows: [
    { label: 'Order Intake Automation', path: '/#solutions' },
    { label: 'Quote-to-Work-Order', path: '/#solutions' },
    { label: 'Finance & Invoicing', path: '/#solutions' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Industries We Serve', path: '/industries' },
    { label: 'Case Studies', path: '/case-studies' },
    { label: 'Social Media', path: '/#social-media' },
    { label: 'Contact Us', path: '/#contact' },
  ],
};

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (e, path) => {
    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#'));
      e.preventDefault();
      if (location.pathname === '/') {
        scrollToTarget(hash, -80);
      } else {
        navigate(path);
      }
    }
  };

  return (
    <footer className="bg-[#090E15] text-slate-300 w-full pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 border-t border-border-dark/80 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Grid:
            - Mobile (<768px): Single column, 32px vertical gap, left-aligned
            - Tablet (768-1023px): 2 columns × 2 rows
            - Desktop (1024px+): 4 columns (Brand 4, Workflows 3, Company 2, CTA 3) with aligned headers
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* 1. Brand Column */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-3 group link"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm ring-1 ring-slate-700/80 overflow-hidden flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="ALAQ Solutions Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-white text-lg font-extrabold tracking-tight">
                ALAQ <span className="text-accent-soft font-medium">Solutions</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal text-left">
              {COMPANY.tagline || 'ERP and shop-floor paperwork automation for manufacturing and construction.'}
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-slate-400 text-left">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-soft flex-shrink-0" />
                <span>{COMPANY.location} • Serving Ontario & Michigan</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-soft flex-shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">Deterministic ERP verification: AI never touches your general ledger.</span>
              </div>
            </div>
          </div>

          {/* 2. Workflows Column */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">
              Workflows
            </h3>
            <ul className="space-y-2 text-left">
              {FOOTER_LINKS.workflows.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.path}
                    onClick={(e) => handleLinkClick(e, item.path)}
                    className="min-h-[44px] md:min-h-0 flex items-center text-sm md:text-xs text-slate-400 hover:text-white transition-colors link py-1"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Company Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">
              Company
            </h3>
            <ul className="space-y-2 text-left">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.label}>
                  {item.path.startsWith('/#') ? (
                    <a
                      href={item.path}
                      onClick={(e) => handleLinkClick(e, item.path)}
                      className="min-h-[44px] md:min-h-0 flex items-center text-sm md:text-xs text-slate-400 hover:text-white transition-colors link py-1"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className="min-h-[44px] md:min-h-0 flex items-center text-sm md:text-xs text-slate-400 hover:text-white transition-colors link py-1"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Get Started / CTA Column */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans">
              Get Started
            </h3>
            <div className="space-y-4 text-left">
              <p className="text-sm md:text-xs text-slate-400 leading-relaxed max-w-sm">
                Have a messy dealer order or quote? Send it over to see the automated intake.
              </p>
              <div className="pt-1 max-w-sm">
                <a
                  href="/#contact"
                  onClick={(e) => handleLinkClick(e, '/#contact')}
                  className="inline-flex items-center justify-center gap-2 w-full text-sm font-semibold py-3 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white transition-all shadow-sm link min-h-[44px] cursor-pointer whitespace-nowrap"
                >
                  <span>{BOOKING_CTA_LABEL}</span>
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dark/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400 text-left">
          <p>&copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p className="text-left md:text-right text-slate-400 max-w-md">
            Pragmatic shop-floor automation for construction, steel building, and manufacturing operations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;