import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import { gsap } from 'gsap';
const RevenueChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(chartRef.current, 
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={chartRef} className="relative overflow-hidden bg-[#3d5550] rounded-2xl p-5 w-[20rem] h-[16rem]">
            <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
                        alt="VP"
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-[#d4f4af]"
                    />
                    <div>
                        <div className="text-white font-medium text-base">VP of Finance</div>
                        <div className="text-gray-400 text-xs mt-1">Revenue and performance at a glance</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Revenue</div>
                    <div className="text-white text-3xl font-bold mb-1">$956K</div>
                    <div className="inline-flex items-center bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-medium">
                        ↑ 11%
                    </div>
                </div>
                <div className="relative h-20 flex items-end justify-between space-x-1">
                    {[45, 52, 48, 58, 55, 68, 62, 72, 70, 78, 82, 88].map((height, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-[#d4f4af] to-[#b8e08f] rounded-t-sm transition-all duration-300 hover:opacity-80"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
            </div>
            <div className="absolute top-4 right-4">
                <svg width="80" height="40" viewBox="0 0 120 60" className="opacity-30">
                    <polyline
                        points="0,50 20,40 40,45 60,30 80,25 100,20 120,15"
                        fill="none"
                        stroke="#d4f4af"
                        strokeWidth="2"
                    />
                </svg>
            </div>
        </div>
    );
};

const ContractsCard = () => {
    const cardRef = useRef(null);
    
    const contracts = [
        { company: 'XYZ, Inc.', service: 'Cloud Service', amount: '$24,000' },
        { company: 'Core LLC', service: 'Tax Plan', amount: '$16,000' },
        { company: 'DDD & Bros', service: 'Fin Plan', amount: '$8,000' }
    ];

    useEffect(() => {
        gsap.fromTo(cardRef.current, 
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, delay: 0.6, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={cardRef} className='bg-[#3d5550] rounded-2xl p-5 w-[18rem]'>
            <div className="flex items-center justify-between mb-1 ">
                <span className="text-white font-medium">Contracts</span>
                <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-3 py-1 rounded-full">
                    + 20+
                </span>
            </div>
            <div className="space-y-3">
                {contracts.map((contract, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-[#2a4a45] last:border-0">
                        <span className="text-white font-medium min-w-[100px]">{contract.company}</span>
                        <span className="text-gray-400 text-xs flex-1 text-center">{contract.service}</span>
                        <span className="text-white font-semibold min-w-[80px] text-right">{contract.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CashFlowCard = () => {
    const cashFlowRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cashFlowRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={cashFlowRef} className='bg-[#3d5550] rounded-2xl p-5 w-[20rem]'>
            <div className="flex items-center justify-between mb-4">
                <span className="text-white font-medium">Cash Flow</span>
                <span className="text-emerald-400 text-sm font-medium bg-emerald-500/20 px-3 py-1 rounded-full">
                    ↑ 9.5%
                </span>
            </div>
            <div className="text-xs text-gray-400 mb-2">Weekly · Income · Expenses</div>
            <div className="flex items-end justify-between h-24 space-x-3">
                {[
                    [65, 35],
                    [72, 28],
                    [68, 32],
                    [80, 20]
                ].map((values, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end space-y-1 h-full">
                        <div
                            className="bg-[#d4f4af] rounded-t"
                            style={{ height: `${values[0]}%` }}
                        />
                        <div
                            className="bg-[#5a6f6a] rounded-t"
                            style={{ height: `${values[1]}%` }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};



const HeroSection = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(titleRef.current.children[0], 
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
        .fromTo(subtitleRef.current.children[0], 
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
            '-=0.7'
        )
        .fromTo(buttonRef.current, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
            '-=0.5'
        )
        .fromTo(descriptionRef.current, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.4'
        );
    }, []);

    return (
        <div className=" flex ">
            <div className="space-y-8 pt-20 pl-24">
                <div>
                    <div ref={titleRef}>
                        <div className="text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tighter">
                            Close Fast
                        </div>
                    </div>
                    <div className="flex items-end space-x-8" ref={subtitleRef}>
                        <div className="text-7xl lg:text-8xl font-light text-white leading-[0.95] tracking-tighter">
                            Scale <span className="text-[#d4f4af] font-normal">Faster.</span>
                        </div>
                        <button ref={buttonRef} className="bg-[#d4f4af] text-[#1a3a35] px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#c5e6a6] transition-all flex items-center space-x-12 group shadow-lg hover:shadow-xl">
                            <span>Get Started</span>
                            <div className='bg-[#FF862F] rounded-full p-2'>
                                <ArrowRight className="group-hover:translate-x-2 transition-transform text-white" size={22} />
                            </div>
                        </button>
                    </div>
                </div>

                <p ref={descriptionRef} className="text-xl text-gray-300 leading-relaxed  max-w-[50rem] tracking-tighter">
                    <span className="text-[#d4f4af]">ALAQ Solutions</span> is the AI-first ERP powering next-gen finance & accounting teams. General ledger,
                    revenue automation, close management, and so much more—all on one unified platform.
                </p>
            </div>
        </div>
    );
};

// Trust Section Component
const TrustSection = () => {
    const trustRef = useRef(null);
    const companiesRef = useRef(null);
    const starsRef = useRef(null);

    const companies = [
        { name: 'replit', display: 'replit' },
        { name: 'Solv', display: 'Solv.' },
        { name: 'Midi', display: 'Midi' },
        { name: 'Advisor360', display: 'Advisor360°' },
        { name: 'Flex', display: 'Flex', italic: true },
        { name: 'APEX', display: 'APEX' }
    ];

    useEffect(() => {
        gsap.fromTo(trustRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power2.out' }
        );

        gsap.fromTo(companiesRef.current.children, 
            { opacity: 0, y: 20 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.6, 
                delay: 1.4,
                stagger: 0.1,
                ease: 'power2.out' 
            }
        );

        gsap.fromTo(starsRef.current, 
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, delay: 2, ease: 'back.out(1.7)' }
        );
    }, []);

    return (
        <div className="mt-16  pl-24">
            <p ref={trustRef} className="text-[#869B7F] text-sm mb-8">Trusted by mid-market and enterprise leaders</p>

            <div ref={companiesRef} className="flex gap-5 items-center mb-8">
                {companies.map((company, i) => (
                    <div
                        key={i}
                        className={`text-[#869B7F] text-xl ${company.italic ? 'italic' : ''} hover:text-gray-400 transition cursor-pointer`}
                    >
                        {company.display}
                    </div>
                ))}
            </div>

            <div ref={starsRef} className="flex items-center space-x-3">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-lg">⭐</span>
                    ))}
                </div>
                <span className="text-[#869B7F] text-sm">4.9 out of 5 stars</span>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="h-screen bg-[#132D25] font-poppins relative overflow-x-hidden">
            <Navbar />

            <main className="">
                <HeroSection />
                <TrustSection />
            </main>
            <div className='absolute bottom-3 right-3 flex flex-col justify-end items-end'>
                <div className='flex items-center space-x-3'>
                <div>
                    <ContractsCard />
                </div>
                <div className='space-y-3'>
                <RevenueChart />
                <CashFlowCard />
                </div>
            </div>
                </div>
        </div>
    );
};

export default LandingPage;