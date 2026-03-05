import React from 'react';

const pieData = [
    { label: "IT & Telecom", pct: 19, color: "#5EB8C9", bold: false },
    { label: "Financial Services", pct: 18, color: "#E8734A", bold: true },
    { label: "Automotive", pct: 14, color: "#8FA8B4", bold: false },
    { label: "Retail", pct: 12, color: "#5A7C8C", bold: false },
    { label: "Healthcare", pct: 12, color: "#4A6A7A", bold: false },
    { label: "Manufacturing", pct: 10, color: "#7B9DAB", bold: false },
    { label: "Advertising", pct: 10, color: "#9BBCC8", bold: false },
    { label: "Others", pct: 5, color: "#D0E0E6", bold: false },
];


function PieChart() {
    const cx = 90, cy = 90, r = 82;
    let angle = -90; // start from top

    function polarToXY(deg) {
        const rad = deg * Math.PI / 180;
        return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
    }

    const slices = pieData.map((seg, i) => {
        const sweep = (seg.pct / 100) * 360;
        const start = polarToXY(angle);
        const end = polarToXY(angle + sweep);
        const largeArc = sweep > 180 ? 1 : 0;
        const midAngle = angle + sweep / 2;
        const midRad = midAngle * Math.PI / 180;
        const labelR = r * 0.65;
        const lx = cx + labelR * Math.cos(midRad);
        const ly = cy + labelR * Math.sin(midRad);
        const path = `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
        angle += sweep;
        return { ...seg, path, lx, ly };
    });

    return (
        <svg viewBox="0 0 180 180" width="240" height="240">
            {slices.map((s, i) => (
                <g key={i}>
                    <path d={s.path} fill={s.color} stroke="white" strokeWidth={1.5} />
                    {s.pct >= 10 && (
                        <text
                            x={s.lx} y={s.ly}
                            textAnchor="middle" dominantBaseline="middle"
                            fontSize={s.bold ? "11" : "9.5"}
                            fontWeight={s.bold ? "800" : "600"}
                            fill="white"
                        >
                            {s.pct}%
                        </text>
                    )}
                </g>
            ))}
        </svg>
    );
}

export default function SlideBankingOpportunity() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-white">
            <div className="w-full max-w-6xl mx-auto px-8">

                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] text-blue-600 uppercase mb-3">
                        Banking Sector · AI Opportunity
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                        Financial Services: A Leading <span className="text-blue-600">AI Adopter.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-10 items-center">

                    {/* LEFT: Pie Chart */}
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.15em] text-gray-400 uppercase mb-3">
                            Industries with the Biggest AI Adoption
                        </p>
                        <div className="flex items-center gap-6">
                            <PieChart />
                            {/* Legend */}
                            <div className="flex flex-col gap-2">
                                {pieData.map((seg, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: seg.color }} />
                                        <span className={`text-xs leading-tight ${seg.bold ? 'font-semibold text-gray-700' : 'text-gray-400'}`}>
                                            {seg.label} {seg.pct}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-3">Source: Fortune Business Insights, 2023</p>
                    </div>

                    {/* RIGHT: Insight Text */}
                    <div className="flex flex-col justify-center gap-5">
                        <p className="text-base text-gray-500 leading-relaxed">
                            The data reveals that the banking industry has become one of the fastest adopters of AI technology in the era of digital transformation.
                        </p>
                        <p className="text-base text-gray-500 leading-relaxed">
                            According to McKinsey (2023), AI has the potential to generate up to <span className="font-semibold text-gray-700">US$385 billion</span> in value for Risk & Legal, <span className="font-semibold text-gray-700">US$321 billion</span> for Corporate Banking, and <span className="font-semibold text-gray-700">US$306 billion</span> for Retail Banking.
                        </p>
                        <p className="text-xs text-gray-400">
                            Source: Fortune Business Insights (2023), McKinsey (2023)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
