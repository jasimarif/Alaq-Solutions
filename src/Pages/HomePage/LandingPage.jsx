import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { Navbar, SlidingButton } from '../../Components';
import { gsap } from 'gsap';

const RevenueChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(chartRef.current, 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={chartRef} className="bg-gradient-to-br from-[#131d2e]/90 to-[#0d1522]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-blue-500/25 hover:border-blue-400/50 transition-all duration-300 shadow-lg relative overflow-hidden group">
            {/* Top ambient highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500"></div>

            <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center space-x-2.5">
                    <div className="relative flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop"
                            alt="VP of Finance"
                            className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-400/60"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#0d1522]"></span>
                    </div>
                    <div>
                        <div className="text-white font-semibold text-xs sm:text-sm">VP of Finance</div>
                        <div className="text-gray-400 text-[11px]">Revenue & Close Automation</div>
                    </div>
                </div>
                <div className="inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0">
                    <Activity className="w-3 h-3" />
                    +11.4%
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-1">
                <div>
                    <div className="text-gray-400 text-[11px] uppercase tracking-wider font-medium">Monthly Revenue</div>
                    <div className="text-white text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">$956,400</div>
                    <div className="text-blue-400/90 text-[11px] mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        AI Reconciled • On Target
                    </div>
                </div>

                {/* Animated bar graph */}
                <div className="h-14 sm:h-16 flex items-end space-x-1 sm:space-x-1.5 flex-1 max-w-[210px] sm:ml-auto">
                    {[45, 52, 48, 62, 58, 74, 68, 82, 78, 88, 92, 100].map((height, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 rounded-t-sm transition-all duration-300 group-hover:brightness-110"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
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
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={cardRef} className="h-full bg-gradient-to-br from-[#131d2e]/90 to-[#0d1522]/90 backdrop-blur-md rounded-2xl p-4 border border-gray-700/60 hover:border-blue-500/30 transition-all duration-300 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="text-white font-medium text-xs sm:text-sm">Contracts</span>
                </div>
                <span className="text-blue-400 text-[11px] font-semibold bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    + 20
                </span>
            </div>

            <div className="space-y-1.5 my-1">
                {contracts.map((contract, i) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg bg-gray-800/60 border border-gray-700/30 hover:bg-gray-800 transition">
                        <div>
                            <span className="text-white font-medium block truncate max-w-[90px] sm:max-w-[100px] text-[11px]">{contract.company}</span>
                            <span className="text-gray-400 text-[10px]">{contract.service}</span>
                        </div>
                        <span className="text-emerald-400 font-semibold text-[11px]">{contract.amount}</span>
                    </div>
                ))}
            </div>

            <div className="text-[10px] text-gray-400 flex items-center justify-between pt-2 border-t border-gray-800/80 mt-1">
                <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    NetSuite Synced
                </span>
                <span className="text-blue-400 font-medium">100%</span>
            </div>
        </div>
    );
};

const CashFlowCard = () => {
    const cashFlowRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cashFlowRef.current, 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
        );
    }, []);

    return (
        <div ref={cashFlowRef} className="h-full bg-gradient-to-br from-[#131d2e]/90 to-[#0d1522]/90 backdrop-blur-md rounded-2xl p-4 border border-gray-700/60 hover:border-blue-500/30 transition-all duration-300 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    <span className="text-white font-medium text-xs sm:text-sm">Cash Flow</span>
                </div>
                <span className="text-cyan-400 text-[11px] font-semibold bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                    ↑ 9.5%
                </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-gray-400 my-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-400"></span> Inflow</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-slate-600"></span> Outflow</span>
                <span className="text-gray-500">Weekly</span>
            </div>

            <div className="flex items-end justify-between h-14 space-x-2 pt-1">
                {[
                    { income: 68, expense: 32, label: 'W1' },
                    { income: 78, expense: 26, label: 'W2' },
                    { income: 72, expense: 32, label: 'W3' },
                    { income: 88, expense: 22, label: 'W4' }
                ].map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center h-full">
                        <div className="w-full flex space-x-1 items-end justify-center h-full">
                            <div
                                className="w-1/2 bg-blue-400 rounded-t-sm transition-all duration-300"
                                style={{ height: `${item.income}%` }}
                            />
                            <div
                                className="w-1/2 bg-slate-600 rounded-t-sm transition-all duration-300"
                                style={{ height: `${item.expense}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1">{item.label}</span>
                    </div>
                ))}
            </div>

            <div className="text-[10px] text-gray-400 flex items-center justify-between pt-2 border-t border-gray-800/80 mt-1">
                <span>Liquidity</span>
                <span className="text-emerald-400 font-medium">Optimal +$48K</span>
            </div>
        </div>
    );
};

// Unified Bento Command Cockpit Component
const BentoCommandCockpit = () => {
    return (
        <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
            {/* Ambient Radial Lighting */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-indigo-600/20 rounded-3xl blur-2xl -z-10"></div>

            {/* Glass Cockpit Console */}
            <div className="bg-[#0b1220]/80 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-4 sm:p-5 shadow-2xl shadow-blue-950/70 relative">
                {/* Console Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-800/80 text-xs">
                    <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                        <span className="text-gray-300 font-mono text-[11px] ml-2 hidden sm:inline">ALAQ Intelligence Cloud</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                            Live NetSuite Sync
                        </span>
                    </div>
                </div>

                {/* Structured Cards Layout: Revenue Hero on Top, Contracts & CashFlow Side-by-Side Below */}
                <div className="space-y-3 sm:space-y-4">
                    {/* Primary Hero Metric Card */}
                    <RevenueChart />

                    {/* Twin Complementary Bento Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <ContractsCard />
                        <CashFlowCard />
                    </div>
                </div>

                {/* Floating Bottom Status Pill */}
                <div className="mt-3 pt-2.5 border-t border-gray-800/60 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                        SOC-2 Type II Certified
                    </span>
                    <span className="text-cyan-400 font-medium flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        AI Close in 48h
                    </span>
                </div>
            </div>
        </div>
    );
};

const HeroSection = ({ onOpenContact }) => {
    const titleRef = useRef(null);
    const buttonRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(titleRef.current, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(descriptionRef.current, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
        )
        .fromTo(buttonRef.current, 
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
            '-=0.3'
        );
    }, []);

    return (
        <div className="space-y-5 sm:space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Next-Gen AI & NetSuite Solutions
            </div>

            {/* Headline */}
            <h1 ref={titleRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight">
                Close Fast.<br />
                Scale <span className="text-[#60a5fa] font-medium">Faster.</span>
            </h1>

            {/* Description */}
            <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl tracking-normal">
                <span className="text-[#60a5fa] font-semibold">ALAQ Solutions</span> is the AI-first ERP powering next-gen finance & accounting teams. General ledger, revenue automation, close management, and so much more, all on one unified platform.
            </p>

            {/* CTA Button Group */}
            <div ref={buttonRef} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <SlidingButton text="Get Started" shadow={true} onClick={onOpenContact} />
                <button 
                    onClick={onOpenContact}
                    className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gray-600/80 hover:border-blue-400/60 bg-gray-900/40 hover:bg-gray-800/80 text-gray-200 hover:text-white transition-all font-semibold text-sm sm:text-base cursor-pointer shadow-sm"
                >
                    Schedule Demo
                </button>
            </div>

            {/* Micro Benefits Checkpoints */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Zero Manual Entry
                </span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    10x Faster Month Close
                </span>
                <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    Real-time Ledger Sync
                </span>
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
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
        );

        if (companiesRef.current?.children) {
            gsap.fromTo(companiesRef.current.children, 
                { opacity: 0, y: 10 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    delay: 0.6,
                    stagger: 0.05,
                    ease: 'power2.out' 
                }
            );
        }

        gsap.fromTo(starsRef.current, 
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: 'back.out(1.5)' }
        );
    }, []);

    return (
        <div className="pt-8 sm:pt-10 border-t border-gray-800/60 mt-10 sm:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
                <p ref={trustRef} className="text-gray-400 text-xs sm:text-sm mb-3">
                    Trusted by mid-market and enterprise leaders
                </p>

                <div ref={companiesRef} className="flex flex-wrap gap-4 sm:gap-6 items-center">
                    {companies.map((company, i) => (
                        <div
                            key={i}
                            className={`text-gray-400 text-sm sm:text-base ${company.italic ? 'italic' : ''} hover:text-gray-300 transition`}
                        >
                            {company.display}
                        </div>
                    ))}
                </div>
            </div>

            <div ref={starsRef} className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-sm sm:text-base">⭐</span>
                    ))}
                </div>
                <span className="text-gray-400 text-xs sm:text-sm">4.9 out of 5 stars</span>
            </div>
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen w-full bg-[#121827] font-poppins relative overflow-hidden flex flex-col justify-between">
            <Navbar />

            <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10 flex-1 flex flex-col justify-center">
                {/* 2-Column Hero: Headline & CTAs on Left, Structured Bento Cockpit on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    {/* Left Column: Value Proposition & Call to Action */}
                    <div className="lg:col-span-6 xl:col-span-6">
                        <HeroSection onOpenContact={() => {
                            const contactBtn = document.querySelector('nav button:last-of-type');
                            if (contactBtn) contactBtn.click();
                        }} />
                    </div>

                    {/* Right Column: Structured Bento Analytics Command Cockpit */}
                    <div className="lg:col-span-6 xl:col-span-6">
                        <BentoCommandCockpit />
                    </div>
                </div>

                {/* Trust & Social Proof Bar */}
                <TrustSection />
            </main>
        </div>
    );
};

export default LandingPage;