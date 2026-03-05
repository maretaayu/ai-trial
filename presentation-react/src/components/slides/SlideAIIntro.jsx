import React, { useState } from 'react';

const types = [
    {
        id: "pred",
        label: "Predictive AI (Menebak)",
        short: "Pred.",
        color: "bg-blue-100 text-blue-800",
        dotColor: "bg-[#1e3a8a]",
        desc: "Menganalisis data historis untuk memprediksi probabilitas. Populer di perbankan untuk Credit Scoring, Risk Management, dan Fraud Detection.",
    },
    {
        id: "gen",
        label: "Generative AI (Menciptakan)",
        short: "Gen.",
        color: "bg-red-100 text-red-800",
        dotColor: "bg-[#9f1239]",
        desc: "Menghasilkan output baru (teks, gambar, kode) dari instruksi natural. Mengubah cara kita merangkum regulasi panjang atau menulis draf.",
    },
    {
        id: "agent",
        label: "Agentic AI (Bertindak)",
        short: "Agent",
        color: "bg-gray-900 text-white",
        dotColor: "bg-[#ea580c]",
        desc: "Tidak hanya menjawab, tapi mampu mengambil keputusan dan mengeksekusi aksi lintas-sistem secara otonom untuk menyelesaikan workflow panjang.",
        highlight: true,
    },
];

export default function SlideAIIntro() {
    const [active, setActive] = useState(null);

    const getSvgStyle = (id, cx, cy) => {
        const isActive = active === id;
        const isOtherHovered = active && active !== id;
        return {
            transformOrigin: `${cx}px ${cy}px`,
            transform: isActive ? 'scale(1.1)' : 'scale(1)',
            opacity: isOtherHovered ? 0.3 : 1,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // bouncy scale
            cursor: 'pointer',
            filter: isActive ? 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15))' : 'none'
        };
    };

    const getCardClass = (t) => {
        let base = "flex items-start gap-4 p-4 lg:p-5 rounded-2xl transition-all duration-300 cursor-pointer ";
        const isActive = active === t.id;
        const isOtherHovered = active && active !== t.id;

        if (t.highlight) {
            base += "bg-gray-900 border-none ring-2 ring-gray-900 text-white ";
            if (isActive) base += "shadow-2xl scale-[1.03] z-20 relative ";
            else if (isOtherHovered) base += "opacity-40 scale-[0.98] ";
            else base += "shadow-md z-10 relative ";
        } else {
            if (isActive) base += "bg-white shadow-xl scale-[1.03] ring-1 ring-gray-200 z-20 relative ";
            else if (isOtherHovered) base += "bg-gray-50 opacity-40 scale-[0.98] border border-gray-100 ";
            else base += "bg-gray-50 border border-gray-100 hover:bg-white ";
        }
        return base;
    };

    const backgroundOpacity = active ? 0.4 : 1;
    const arrowOpacity = (active && active !== 'gen' && active !== 'agent') ? 0.2 : 1;

    return (
        <div className="w-full h-full flex items-center justify-center bg-white px-8" onClick={() => setActive(null)}>
            <div className="w-full max-w-7xl mx-auto flex flex-col justify-center">

                {/* Header */}
                <div className="mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">
                        Foundations · Artificial Intelligence
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                        Understanding the <span className="text-blue-600">Types of AI.</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-500 mt-2 font-medium">AI is a broad field — what matters is knowing which type fits which problem.</p>
                </div>

                {/* Visual + List */}
                <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">

                    {/* Left: Interactive SVG */}
                    <div className="w-full md:w-[45%] flex flex-col items-center">
                        <div className="w-full aspect-[4/3] relative flex items-center justify-center">
                            <svg viewBox="0 0 600 350" className="w-full h-full drop-shadow-sm">

                                <g style={{ opacity: backgroundOpacity, transition: 'all 0.4s ease' }}>
                                    {/* AI Oval */}
                                    <ellipse cx="300" cy="175" rx="280" ry="160" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                                    <text x="300" y="45" fontSize="16" fontWeight="bold" fill="#64748b" textAnchor="middle">Artificial Intelligence</text>

                                    {/* ML Oval */}
                                    <ellipse cx="320" cy="190" rx="210" ry="120" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
                                    <text x="320" y="105" fontSize="15" fontWeight="bold" fill="#475569" textAnchor="middle">Machine Learning</text>

                                    {/* DL Oval */}
                                    <ellipse cx="340" cy="210" rx="140" ry="80" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
                                    <text x="340" y="160" fontSize="14" fontWeight="bold" fill="#334155" textAnchor="middle">Deep Learning</text>
                                </g>

                                {/* Predictive AI Node */}
                                <g
                                    style={getSvgStyle('pred', 110, 180)}
                                    onMouseEnter={() => setActive('pred')}
                                    onMouseLeave={() => setActive(null)}
                                >
                                    <circle cx="110" cy="180" r="50" fill="#1e3a8a" />
                                    <text x="110" y="175" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">Predictive</text>
                                    <text x="110" y="195" fontSize="13" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>
                                </g>

                                {/* Arrow (Fades if Agent or Gen isn't active) */}
                                <g style={{ opacity: arrowOpacity, transition: 'all 0.4s ease' }}>
                                    <defs>
                                        <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                                            <polygon points="0 0, 6 3, 0 6" fill="#64748b" />
                                        </marker>
                                    </defs>
                                    <line x1="307" y1="235" x2="373" y2="235" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <text x="340" y="225" fontSize="12" fontWeight="bold" fill="#64748b" textAnchor="middle">moving to</text>
                                </g>

                                {/* Generative AI Node */}
                                <g
                                    style={getSvgStyle('gen', 260, 235)}
                                    onMouseEnter={() => setActive('gen')}
                                    onMouseLeave={() => setActive(null)}
                                >
                                    <circle cx="260" cy="235" r="42" fill="#9f1239" />
                                    <text x="260" y="232" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">Generative</text>
                                    <text x="260" y="246" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>
                                </g>

                                {/* Agentic AI Node */}
                                <g
                                    style={getSvgStyle('agent', 420, 235)}
                                    onMouseEnter={() => setActive('agent')}
                                    onMouseLeave={() => setActive(null)}
                                >
                                    <circle cx="420" cy="235" r="42" fill="#ea580c" />
                                    <text x="420" y="232" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">Agentic</text>
                                    <text x="420" y="246" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>
                                </g>

                            </svg>
                        </div>
                        <div className="flex justify-between items-center w-full mt-4">
                            <p className="text-[10px] text-gray-400">Source: BCG (2023); WEF (2024); Bernard Marr (Forbes)</p>
                            <p className="text-[10px] font-bold text-blue-500 animate-pulse bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                ✨ Coba arahkan kursor Anda
                            </p>
                        </div>
                    </div>

                    {/* Right: Interactive List */}
                    <div className="w-full md:w-[55%] flex flex-col gap-3">
                        {types.map((t, i) => (
                            <div
                                key={i}
                                className={getCardClass(t)}
                                onMouseEnter={() => setActive(t.id)}
                                onMouseLeave={() => setActive(null)}
                            >
                                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5 ${t.dotColor}`} />
                                <div>
                                    <span className={`text-sm md:text-base font-extrabold ${t.highlight ? 'text-white' : 'text-gray-900'}`}>{t.label}. </span>
                                    <span className={`text-sm md:text-base leading-relaxed ${t.highlight ? (active === t.id ? 'text-gray-200 font-semibold' : 'text-gray-300 font-medium') : (active === t.id ? 'text-gray-700 font-medium' : 'text-gray-600')}`}>{t.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
