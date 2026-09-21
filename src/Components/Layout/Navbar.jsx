import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ContactModal } from '../index';

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileNetsuiteOpen, setMobileNetsuiteOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const solutionsDropdownRef = useRef(null);

    useEffect(() => {
        if (activeDropdown === 'netsuite' && solutionsDropdownRef.current) {
            gsap.fromTo(solutionsDropdownRef.current, 
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
            );
        }
    }, [activeDropdown]);

    return (
        <nav className="w-full relative z-40 px-4 sm:px-8 lg:px-16 pt-6 font-poppins">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between py-3">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md ring-2 ring-blue-400/40 group-hover:ring-blue-400 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.4)] transition-all duration-300 overflow-hidden flex-shrink-0">
                            <img 
                                src="/logo.png" 
                                alt="ALAQ Solutions Logo" 
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wide">
                            ALAQ <span className="text-blue-400 font-normal">Solutions</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                            Home
                        </Link>

                        <div 
                            className="relative"
                            onMouseEnter={() => setActiveDropdown('netsuite')}
                            onMouseLeave={() => setActiveDropdown(null)}
                        >
                            <button className="flex items-center space-x-1 text-gray-200 hover:text-blue-400 transition-colors py-2">
                                <span>Netsuite</span>
                                <ChevronDown size={14} className={`transform transition-transform duration-200 ${activeDropdown === 'netsuite' ? 'rotate-180 text-blue-400' : ''}`} />
                            </button>
                            {activeDropdown === 'netsuite' && (
                                <div ref={solutionsDropdownRef} className="absolute top-full left-0 mt-1 bg-[#374151] rounded-2xl p-3 w-64 shadow-2xl z-[9999] border border-[#4b5563]">
                                    <div className="space-y-1">
                                        <div className="p-3 hover:bg-[#4b5563]/60 rounded-xl transition cursor-pointer">
                                            <div className="text-white font-medium text-sm">Integrations</div>
                                            <div className="text-gray-400 text-xs mt-0.5">Seamless ERP connectivity</div>
                                        </div>
                                        <div className="p-3 hover:bg-[#4b5563]/60 rounded-xl transition cursor-pointer">
                                            <div className="text-white font-medium text-sm">Custom Development</div>
                                            <div className="text-gray-400 text-xs mt-0.5">Scale with confidence</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link to="/blogs" className="text-gray-200 hover:text-blue-400 transition-colors duration-300">
                            Blogs
                        </Link>
                        <button 
                            onClick={() => setIsModalOpen(true)} 
                            className="bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/30 px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium"
                        >
                            Contact Us
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle navigation menu"
                            className="p-2.5 rounded-xl bg-gray-800/80 text-gray-200 hover:text-white hover:bg-gray-700 border border-gray-700 transition"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-3 bg-[#1e293b]/95 backdrop-blur-md rounded-2xl p-5 border border-gray-700/60 shadow-2xl space-y-4 animate-fadeIn">
                        <Link 
                            to="/" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-gray-200 hover:text-blue-400 font-medium py-2 border-b border-gray-700/50"
                        >
                            Home
                        </Link>

                        <div>
                            <button
                                onClick={() => setMobileNetsuiteOpen(!mobileNetsuiteOpen)}
                                className="w-full flex items-center justify-between text-gray-200 hover:text-blue-400 font-medium py-2 border-b border-gray-700/50"
                            >
                                <span>Netsuite Solutions</span>
                                <ChevronDown size={16} className={`transform transition-transform duration-200 ${mobileNetsuiteOpen ? 'rotate-180 text-blue-400' : ''}`} />
                            </button>
                            {mobileNetsuiteOpen && (
                                <div className="pl-4 py-2 space-y-2 bg-gray-800/50 rounded-xl mt-2">
                                    <div className="py-2 text-sm text-gray-300">
                                        <div className="font-semibold text-white">Integrations</div>
                                        <div className="text-xs text-gray-400">Seamless ERP connectivity</div>
                                    </div>
                                    <div className="py-2 text-sm text-gray-300">
                                        <div className="font-semibold text-white">Custom Development</div>
                                        <div className="text-xs text-gray-400">Scale with confidence</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link 
                            to="/blogs" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-gray-200 hover:text-blue-400 font-medium py-2 border-b border-gray-700/50"
                        >
                            Blogs
                        </Link>

                        <button 
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsModalOpen(true);
                            }}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition text-center"
                        >
                            Contact Us
                        </button>
                    </div>
                )}
            </div>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </nav>
    );
};
export default Navbar;