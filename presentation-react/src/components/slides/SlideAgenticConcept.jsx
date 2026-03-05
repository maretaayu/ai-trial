import React from 'react';
import { ArrowRight, Settings, Target, Workflow, Mail, CreditCard, RefreshCw } from 'lucide-react';

export const SlideAgenticConcept = () => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden relative">
            <div className="w-full max-w-6xl mx-auto px-8 flex flex-col items-center">
                
                {/* Header */}
                <div className="text-center mb-16 relative z-10 w-full max-w-4xl">
                    <div className="inline-flex items-center justify-center gap-2 border border-blue-200 bg-blue-100 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-blue-700 uppercase mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> The End of Chatbot Era
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-gray-900 mb-6 leading-[1.1]">
                        What is Agentic AI?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
                        Agentic AI doesn't just give you instructions. <strong className="text-gray-900">It can act on them by itself</strong>, reasoning, planning, and carrying out complex tasks from start to finish.
                    </p>
                </div>

                {/* Comparison Blocks */}
                <div className="flex flex-col md:flex-row w-full gap-6 md:gap-10 relative z-10">
                    
                    {/* The Old Way: Chatbot */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm relative group">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 rounded-t-3xl"></div>
                        <span className="text-xs font-black tracking-[0.2em] text-gray-400 uppercase mb-4 block">The Old Way: Generative AI</span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">A Smart Dictionary</h3>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Drafts an email for you to check.</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <Settings className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm font-medium">Always waits for you to tell it what to do next.</span>
                            </div>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-400 italic">"Write a polite reply for a refund."</p>
                        </div>
                    </div>

                    {/* VS Icon */}
                    <div className="hidden md:flex items-center justify-center shrink-0 w-16 -mx-8 z-20">
                        <div className="w-12 h-12 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-400 font-black italic">VS</div>
                    </div>

                    {/* The New Way: Agentic AI */}
                    <div className="flex-1 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-950 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group">
                        {/* Decorative Background Node */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>
                        
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-3xl"></div>
                        <span className="text-xs font-black tracking-[0.2em] text-blue-300 uppercase mb-4 block">The 2026 Shift: Agentic AI</span>
                        <h3 className="text-2xl font-bold text-white mb-6">A Digital Employee</h3>
                        
                        <div className="space-y-4 mb-6 relative z-10">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl">
                                <p className="text-sm font-medium text-white mb-3">Picture a customer asking for a refund. Agentic AI can automatically:</p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-blue-100">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0"><RefreshCw className="w-3.5 h-3.5" /></div>
                                        <span className="text-sm">Log into Stripe</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-blue-100">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0"><CreditCard className="w-3.5 h-3.5" /></div>
                                        <span className="text-sm">Process the refund</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-blue-100">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0"><Target className="w-3.5 h-3.5" /></div>
                                        <span className="text-sm">Update the company CRM</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-blue-100">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5" /></div>
                                        <span className="text-sm">Send the receipt by email</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                            <p className="text-sm font-bold text-blue-300">All without anyone needing to click a button.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SlideAgenticConcept;
