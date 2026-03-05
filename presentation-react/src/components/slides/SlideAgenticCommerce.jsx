import React from 'react';
import { ShoppingCart, ShieldCheck } from 'lucide-react';

export const SlideAgenticCommerce = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-8 py-12 md:py-0">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-stretch">

                {/* Left Column: The Commerce Example */}
                <div className="flex-1 flex flex-col justify-center gap-6 lg:pr-4">

                    <div className="mb-2">
                        <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase">Agentic Commerce</span>
                        <h2 className="text-3xl lg:text-[2.75rem] font-bold text-gray-900 mt-2 leading-[1.1] tracking-tight">The end of manual purchasing.</h2>
                    </div>

                    {/* Chat Bubble / Prompt */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 relative hover:shadow-md transition-shadow">
                        <div className="absolute top-8 left-0 w-1.5 h-16 bg-blue-500 rounded-r-3xl"></div>
                        <p className="text-lg md:text-xl font-bold text-gray-800 leading-snug tracking-tight pl-4 italic">
                            "Purchase this winter jacket when it becomes available in black. Don't purchase it if it's over $100."
                        </p>
                        <div className="flex items-center gap-4 mt-6 pl-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <ShoppingCart className="w-5 h-5 text-blue-600" />
                            </div>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                The agent monitors prices 24/7 and securely executes the purchase the moment criteria are met.
                            </p>
                        </div>
                    </div>

                    {/* Protocol Box (PayPal) */}
                    <div className="bg-gray-50 rounded-3xl p-5 md:p-6 border border-gray-200 flex items-center md:items-start gap-5">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="w-8 object-contain" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                <strong className="font-bold text-gray-900 block mb-0.5">Agent Payments Protocol (AP2)</strong>
                                PayPal is paving the way for scalable, secure agentic shopping ecosystems through industry-leading protocols.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Financial Services / Compliance (Toby Brown) */}
                <div className="flex-1 bg-zinc-900 rounded-[2.5rem] p-10 md:p-14 flex flex-col items-start justify-center text-white relative overflow-hidden mt-8 lg:mt-0">
                    {/* Background Graphic */}
                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl"></div>

                    <div className="mb-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
                        <ShieldCheck className="w-6 h-6 text-yellow-400" />
                    </div>

                    <p className="text-2xl md:text-[1.75rem] font-medium leading-[1.3] tracking-tight mb-12 text-zinc-100 relative z-10">
                        "In 2026, agentic ecosystems will scale from pilots to production in financial services. We'll see multi-step agentic compliance systems that monitor regulatory changes, update internal workflows, and create a complete audit chain."
                    </p>

                    <div className="mt-auto relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1">Toby Brown</h3>
                        <p className="text-sm md:text-base text-zinc-400 font-medium tracking-tight">Managing Director, Financial Services</p>
                        <p className="text-xs md:text-sm text-zinc-500 mt-1">Global Strategic Industries, Google Cloud</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SlideAgenticCommerce;
