import React from 'react';
import { Compass, FileEdit, ListChecks, CheckCircle2, MonitorPlay } from 'lucide-react';

export const SlideNotebookLMDemo = () => {
    const steps = [
        {
            num: "01",
            title: "Pahami Konteks",
            desc: "Unggah dokumen pendukung agar sistem bekerja 100% pada data Anda (tanpa halusinasi web).",
            icon: Compass,
            color: "bg-blue-50 border-blue-200 text-blue-600",
            dot: "bg-blue-500"
        },
        {
            num: "02",
            title: "Beri Instruksi",
            desc: "Perintahkan AI untuk menyusun kerangka Business Proposal yang menargetkan klien spesifik.",
            icon: FileEdit,
            color: "bg-purple-50 border-purple-200 text-purple-600",
            dot: "bg-purple-500"
        },
        {
            num: "03",
            title: "Tinjau Draft",
            desc: "NotebookLM secara instan men-generate rancangan terstruktur mencakup poin & sasaran kerja.",
            icon: ListChecks,
            color: "bg-emerald-50 border-emerald-200 text-emerald-600",
            dot: "bg-emerald-500"
        },
        {
            num: "04",
            title: "Verifikasi Sumber",
            desc: "Klik tautan catatan kaki (citation) untuk kroscek data langsung dari sumber PDF aslinya.",
            icon: CheckCircle2,
            color: "bg-green-50 border-green-200 text-green-600",
            dot: "bg-green-500"
        },
        {
            num: "05",
            title: "Jadikan Podcast",
            desc: "Gunakan fitur 'Audio Overview' untuk mendengarkan rangkuman draf saat Anda dalam perjalanan.",
            icon: MonitorPlay,
            color: "bg-amber-50 border-amber-200 text-amber-600",
            dot: "bg-amber-500"
        }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-center bg-white relative overflow-hidden">
            <div className="w-full max-w-6xl mx-auto px-8 relative z-10 pt-10">
                <div className="text-center mb-10">
                    <p className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Live Demo Workflow
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900 leading-[1.1]">
                        Menyusun Proposal Strategis dengan NotebookLM.
                    </h2>
                </div>

                {/* 5-Step Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
                    {steps.map((step, i) => (
                        <div key={i} className={`flex flex-col bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group ${i === 3 ? 'lg:col-start-1 lg:ml-auto lg:mr-0 max-w-sm' : ''} ${i === 4 ? 'lg:col-start-2 lg:col-span-1 max-w-sm' : ''}`}>
                            <div className={`absolute top-0 left-0 w-full h-1.5 ${step.dot}`}></div>

                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                                    <step.icon className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className={`text-4xl font-black opacity-10 ${step.dot.replace('bg-', 'text-')}`}>
                                    {step.num}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideNotebookLMDemo;
