import React from 'react';
import { ArrowRight } from 'lucide-react';

// Dark full-screen dramatic statement slide (like the PDF cover pages)
export const BigStatementSlide = ({ eyebrow, statement, body, source }) => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Decorative gradient orb top-right */}
        <div className="absolute -top-1/4 -right-1/4 w-[70vh] h-[70vh] rounded-full bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="w-full max-w-4xl mx-auto px-8 z-10">
            {eyebrow && (
                <p className="text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase mb-8">{eyebrow}</p>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-white mb-8">
                {statement}
            </h2>
            {body && (
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal max-w-2xl">
                    {body}
                </p>
            )}
            {source && (
                <p className="mt-10 text-xs text-zinc-600 font-medium tracking-wide">{source}</p>
            )}
        </div>
    </div>
);

// Big number stat slide with breakdown list (like the 52% slide from the report)
export const StatSlide = ({ stat, statLabel, breakdowns, source }) => (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute -bottom-1/4 -left-1/4 w-[60vh] h-[60vh] rounded-full bg-gradient-to-tr from-rose-500/15 to-transparent blur-3xl pointer-events-none" />
        <div className="w-full max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12 md:gap-20 z-10">
            {/* Left: Big number */}
            <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-[7rem] md:text-[9rem] font-black text-white leading-none tracking-tighter">
                    {stat}
                </div>
                <p className="text-zinc-300 text-lg md:text-xl font-medium leading-snug mt-4 max-w-xs">
                    {statLabel}
                </p>
            </div>
            {/* Right: Breakdown list */}
            <div className="flex-1 w-full">
                <p className="text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase mb-6">Of those:</p>
                <div className="flex flex-col gap-5">
                    {breakdowns.map((item, i) => (
                        <div key={i} className="flex items-center gap-5">
                            {/* Bar indicator */}
                            <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-white/40 to-white/10 flex-shrink-0" />
                            <div>
                                <span className="text-3xl font-black text-white tracking-tighter">{item.pct}</span>
                                <span className="text-zinc-300 text-base font-medium ml-3">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {source && <p className="mt-10 text-xs text-zinc-600 font-medium tracking-wide">{source}</p>}
            </div>
        </div>
    </div>
);

export const SimpleSlide = ({ label, title, subtitle, icon: Icon }) => (
    <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4">
            {label && (
                <div className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-8 shadow-sm">
                    {Icon && <Icon className="w-4 h-4 text-gray-400" />} {label}
                </div>
            )}
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter leading-[1.05] text-gray-900 mb-8 max-w-4xl">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg md:text-2xl text-gray-500 font-medium leading-relaxed tracking-tight max-w-3xl">
                    {subtitle}
                </p>
            )}
        </div>
    </div>
);

export const SplitSlide = ({ label, title, subtitle, points }) => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between px-8">
            <div className="w-full md:w-[45%] flex flex-col justify-center">
                {label && (
                    <div className="inline-flex max-w-max items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> {label}
                    </div>
                )}
                <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-tighter leading-[1.05] text-gray-900">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed tracking-tight">
                        {subtitle}
                    </p>
                )}
            </div>
            <div className="w-full md:w-[50%] flex flex-col gap-8">
                {points.map((pt, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                        <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            {pt.icon ? <pt.icon className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{pt.title}</h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">{pt.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const QuoteLayout = ({ quote, author, role, image }) => (
    <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="flex items-start text-left mb-12">
                <span className="text-[6rem] md:text-[8rem] leading-[0.8] text-gray-900 font-serif font-bold mr-6">“</span>
                <p className="text-3xl md:text-5xl font-semibold leading-snug tracking-tight text-gray-800 pt-4 md:pt-6">
                    {quote}
                </p>
            </div>
            <div className="flex items-center gap-6 mt-12 md:mt-16 justify-start md:ml-24">
                <img src={image} className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover grayscale shadow-md border border-gray-200" alt={author} />
                <div className="text-left">
                    <h3 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">{author}</h3>
                    <p className="text-gray-500 font-medium text-sm md:text-lg mt-1">{role}</p>
                </div>
            </div>
        </div>
    </div>
);
