import React from 'react';
import { ShieldCheck, Globe, ArrowUpRight } from 'lucide-react';

const SlideReferences = () => {
    const references = [
        {
            title: "OJK: AI Perbankan",
            desc: "Roadmap Tata Kelola Kecerdasan Artifisial Perbankan Indonesia - Otoritas Jasa Keuangan.",
            link: "https://www.ojk.go.id/id/Publikasi/Roadmap-dan-Pedoman/Perbankan/Documents/Tata%20Kelola%20Kecerdasan%20Artifisial%20Perbankan%20Indonesia.pdf",
            icon: ShieldCheck
        },
        {
            title: "Google: Agentic AI 2026",
            desc: "Laporan Riset Tren Agen AI 2026: Pergeseran dari chatbot ke agen otonom di industri global.",
            link: "https://cloud.google.com/resources/content/ai-agent-trends-2026",
            icon: Globe
        }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between px-8">
                {/* Left Side (Following SplitSlide Template) */}
                <div className="w-full md:w-[45%] flex flex-col justify-center text-left">
                    <div className="inline-flex max-w-max items-center justify-center gap-2 border border-gray-200 bg-gray-50 px-4 py-1.5 rounded-full text-xs uppercase font-bold tracking-[0.2em] text-gray-500 mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-gray-900"></span> Referensi Utama
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold mb-6 tracking-tighter leading-[1.05] text-gray-900">
                        Sumber Data & Publikasi.
                    </h2>
                    <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed tracking-tight">
                        Seluruh fakta dan angka dalam materi ini bersumber dari laporan resmi otoritas dan riset teknologi terkini.
                    </p>
                </div>

                {/* Right Side (Clickable Points) */}
                <div className="w-full md:w-[50%] flex flex-col gap-8">
                    {references.map((ref, i) => (
                        <a
                            key={i}
                            href={ref.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 items-start group no-underline text-left cursor-pointer"
                        >
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-2xl group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                <ref.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 tracking-tight flex items-center gap-2">
                                    {ref.title}
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                                </h3>
                                <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
                                    {ref.desc}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideReferences;
