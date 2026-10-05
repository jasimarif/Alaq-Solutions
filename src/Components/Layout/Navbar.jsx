import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BOOKING_CTA_URL, BOOKING_CTA_LABEL } from '../../data/config';
import { scrollToTarget } from '../../utils/lenis';

const NAV_LINKS = [
  { label: 'Solutions', target: '#solutions' },
  { label: 'How It Works', target: '#how-it-works' },
  { label: 'Industries', target: '/industries' },
  { label: 'Case Studies', target: '/case-studies' },
  { label: 'Social Media', target: '#social-media' },
  { label: 'About', target: '/about' },
  { label: 'Contact', target: '#contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll detection to adapt navbar when passing hero into light sections
  // and compute active section with floating header offset
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      if (location.pathname !== '/') {
        setActiveSection('');
        return;
      }

      const sections = ['solutions', 'how-it-works', 'social-media', 'contact'];
      const headerOffset = 140; // accounts for floating header height and padding

      let current = '';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom >= headerOffset) {
            current = `#${sectionId}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, target) => {
    setIsMobileMenuOpen(false);

    if (target.startsWith('#')) {
      e.preventDefault();
      if (location.pathname === '/') {
        scrollToTarget(target, -80);
      } else {
        navigate(`/${target}`);
      }
    }
  };

  const isActive = (target) => {
    if (target.startsWith('/')) {
      return location.pathname === target;
    }
    if (location.pathname === '/') {
      return activeSection === target;
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3.5 sm:pt-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between py-2.5 px-4 sm:px-6 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.07)]'
              : 'bg-[#0D1117]/85 backdrop-blur-md border border-slate-700/60 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
          }`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 group link focus:outline-none focus:ring-2 focus:ring-[#2F6BFF] rounded-full pr-2"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center p-1 shadow-sm ring-1 ring-slate-200/80 overflow-hidden flex-shrink-0">
              <img
                src="/logo.png"
                alt="ALAQ Solutions Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-base sm:text-lg font-bold tracking-tight leading-tight transition-colors ${
                  isScrolled ? 'text-[#0F172A]' : 'text-white'
                }`}
              >
                ALAQ <span className="text-[#8DB4FF] font-normal">Solutions</span>
              </span>
              <span
                className={`text-[10px] tracking-wider uppercase font-semibold hidden md:inline transition-colors ${
                  isScrolled ? 'text-slate-500' : 'text-slate-300'
                }`}
              >
                Shop Floor to ERP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.target);
              return link.target.startsWith('#') ? (
                <a
                  key={link.label}
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.target)}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 link whitespace-nowrap ${
                    active
                      ? isScrolled
                        ? 'text-[#2F6BFF] bg-blue-50 font-semibold'
                        : 'text-white bg-white/20 font-semibold'
                      : isScrolled
                      ? 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.target}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 link whitespace-nowrap ${
                    active
                      ? isScrolled
                        ? 'text-[#2F6BFF] bg-blue-50 font-semibold'
                        : 'text-white bg-white/20 font-semibold'
                      : isScrolled
                      ? 'text-slate-600 hover:text-[#0F172A] hover:bg-slate-100'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Button: Outline while hero in view; Solid blue after hero */}
          <div className="hidden md:flex items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#contact');
                if (el) {
                  scrollToTarget('#contact', -80);
                } else {
                  navigate('/#contact');
                }
              }}
              aria-label={BOOKING_CTA_LABEL}
              className={`inline-flex items-center gap-2 font-medium text-xs xl:text-sm px-4 xl:px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm link min-h-[44px] whitespace-nowrap cursor-pointer ${
                isScrolled
                  ? 'bg-[#2F6BFF] hover:bg-[#1D55E6] text-white border border-transparent'
                  : 'bg-transparent hover:bg-white/10 text-white border border-white/80'
              }`}
            >
              <span>{BOOKING_CTA_LABEL}</span>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                  isScrolled ? 'bg-white/20' : 'bg-white/15'
                }`}
              >
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className={`p-2.5 rounded-full transition-colors link min-h-[44px] min-w-[44px] flex items-center justify-center ${
                isScrolled
                  ? 'text-[#0F172A] bg-slate-100 hover:bg-slate-200'
                  : 'text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60'
              }`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-[#0D1117] rounded-3xl p-5 border border-slate-700/80 shadow-2xl space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <Link
                to="/"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="block px-4 py-3 rounded-2xl text-base font-medium link min-h-[44px] flex items-center text-slate-200 hover:text-white hover:bg-white/10"
              >
                Home
              </Link>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.target);
                return link.target.startsWith('#') ? (
                  <a
                    key={link.label}
                    href={link.target}
                    onClick={(e) => handleNavClick(e, link.target)}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium link min-h-[44px] flex items-center ${
                      active
                        ? 'text-white bg-[#2F6BFF]/25 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.target}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-base font-medium link min-h-[44px] flex items-center ${
                      active
                        ? 'text-white bg-[#2F6BFF]/25 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Drawer CTA Button */}
            <div className="pt-3 border-t border-slate-800">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const el = document.querySelector('#contact');
                  if (el) {
                    scrollToTarget('#contact', -80);
                  } else {
                    navigate('/#contact');
                  }
                }}
                className={`w-full inline-flex items-center justify-center gap-2 font-medium text-base py-3.5 px-5 rounded-full transition shadow-md link min-h-[48px] cursor-pointer ${
                  isScrolled
                    ? 'bg-[#2F6BFF] hover:bg-[#1D55E6] text-white'
                    : 'bg-transparent hover:bg-white/10 text-white border border-white/80'
                }`}
              >
                <span>{BOOKING_CTA_LABEL}</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;