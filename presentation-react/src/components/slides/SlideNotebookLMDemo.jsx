import React from 'react';
import { UploadCloud, FileSearch, Headphones, ArrowRight, CheckCircle2 } from 'lucide-react';

export const SlideNotebookLMDemo = () => {
    const steps = [
        {
            num: "01",
            title: "Upload & Isolate",
            desc: "Load all 20 company policy PDFs. The AI is now 100% locked to your documents only—zero web connection.",
            icon: UploadCloud,
            color: "bg-blue-50 border-blue-200 text-blue-600",
            dot: "bg-blue-500"
        },
        {
            num: "02",
            title: "Ask in Plain English",
            desc: "Type: 'What changed in leave entitlements for contract staff from 2023 to 2024?'",
            icon: FileSearch,
            color: "bg-purple-50 border-purple-200 text-purple-600",
            dot: "bg-purple-500"
        },
        {
            num: "03",
            title: "Get Answer + Citations",
            desc: "NotebookLM delivers the answer instantly, complete with clickable citations pointing to the exact PDF page.",
            icon: CheckCircle2,
            color: "bg-green-50 border-green-200 text-green-600",
            dot: "bg-green-500"
        },
        {
            num: "Bonus",
            title: "Audio Overview",
            desc: "Convert the entire policy stack into a 15-minute AI podcast, perfect for leadership on the go.",
            icon: Headphones,
            color: "bg-amber-50 border-amber-200 text-amber-600",
            dot: "bg-amber-500"
        }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-6xl mx-auto px-8 relative z-10">
                <div className="text-center mb-16">
                    <p className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-[0.2em] text-blue-600 mb-6 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Live Demo Workflow
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tighter text-gray-900 leading-[1.1]">
                        NotebookLM in Action.
                    </h2>
                    <p className="text-lg text-gray-500 font-medium mt-4 max-w-2xl mx-auto">
                        Turn a stack of unmanageable company documents into an intelligent, citable Q&A engine — in minutes.
                    </p>
                </div>

                {/* Horizontal Progress Flow */}
                <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-6 relative">
                    {/* Connecting line (desktop only) */}
                    <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gray-200 z-0"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="flex-1 flex flex-col relative z-10 group">
                            {/* Icon Node */}
                            <div className={`w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full border-4 border-white shadow-md flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${step.color}`}>
                                <step.icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                            </div>
                            
                            {/* Card Content */}
                            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex-1 text-center hover:shadow-md transition-shadow relative">
                                <div className={`absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-1.5 rounded-t-full ${step.dot}`}></div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">{step.num}</span>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight tracking-tight">{step.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SlideNotebookLMDemo;
