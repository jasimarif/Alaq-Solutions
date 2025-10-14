import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const Navbar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const productsDropdownRef = useRef(null);
    const solutionsDropdownRef = useRef(null);
    const resourcesDropdownRef = useRef(null);

    useEffect(() => {
        if (activeDropdown === 'products' && productsDropdownRef.current) {
            gsap.fromTo(productsDropdownRef.current, 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [activeDropdown === 'products']);

    useEffect(() => {
        if (activeDropdown === 'solutions' && solutionsDropdownRef.current) {
            gsap.fromTo(solutionsDropdownRef.current, 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [activeDropdown === 'solutions']);

    useEffect(() => {
        if (activeDropdown === 'resources' && resourcesDropdownRef.current) {
            gsap.fromTo(resourcesDropdownRef.current, 
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [activeDropdown === 'resources']);

    return (
        <nav className="pt-10 ml-36 right-0 z-100 ">
            <div className="py-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-end space-x-10">
                        <div className="flex items-center space-x-2">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-orange-500">
                                <path d="M12 2L8 10H16L12 2Z" fill="currentColor" />
                                <path d="M8 10L4 18H20L16 10H8Z" fill="currentColor" opacity="0.7" />
                            </svg>
                            <span className="text-white text-4xl font-medium tracking-wide">ALAQ Sol.</span>
                        </div>

                        <div className="hidden md:flex items-center space-x-6 relative">
                            <div 
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('products')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center space-x-1 text-white hover:text-white transition cursor-pointer">
                                    <span>Products</span>
                                    <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'products' && (
                                    <div ref={productsDropdownRef} className="absolute top-full left-0 mt-4 bg-[#E8DDD0] rounded-2xl p-4 w-64 shadow-xl z-[9999]">
                                        <div className="space-y-3">
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">Core Accounting</div>
                                                <div className="text-[#8B7355] text-xs">The modern general ledger that scales with you</div>
                                            </div>
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">Revenue Automation</div>
                                                <div className="text-[#8B7355] text-xs">Automate your end-to-end revenue process</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div 
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('solutions')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center space-x-1 text-white hover:text-white transition cursor-pointer">
                                    <span>Solutions</span>
                                    <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'solutions' && (
                                    <div ref={solutionsDropdownRef} className="absolute top-full left-0 mt-4 bg-[#E8DDD0] rounded-2xl p-4 w-64 shadow-xl z-[9999]">
                                        <div className="space-y-3">
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">For Finance Teams</div>
                                                <div className="text-[#8B7355] text-xs">Streamline your financial operations</div>
                                            </div>
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">For Enterprises</div>
                                                <div className="text-[#8B7355] text-xs">Scale with confidence</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <a href="#" className="text-white hover:text-white transition cursor-pointer">Customers</a>

                            <div 
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('resources')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="flex items-center space-x-1 text-white hover:text-white transition cursor-pointer">
                                    <span>Resources</span>
                                    <ChevronDown size={14} />
                                </button>
                                {activeDropdown === 'resources' && (
                                    <div ref={resourcesDropdownRef} className="absolute top-full left-0 mt-4 bg-[#E8DDD0] rounded-2xl p-4 w-64 shadow-xl z-[9999]">
                                        <div className="space-y-3">
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">Documentation</div>
                                                <div className="text-[#8B7355] text-xs">Learn how to use our platform</div>
                                            </div>
                                            <div className="dropdown-item p-3 hover:bg-white/50 rounded-lg transition cursor-pointer">
                                                <div className="text-[#1a3a35] font-semibold mb-1">Blog</div>
                                                <div className="text-[#8B7355] text-xs">Latest news and insights</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;