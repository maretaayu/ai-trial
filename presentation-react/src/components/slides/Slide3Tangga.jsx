export default function Slide3Tangga() {
    return (
        <div className="w-full max-w-6xl mx-auto pt-4 px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-center text-gray-900">The 3 Levels of AI Adoption</h2>
            <p className="text-lg md:text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto font-medium">
                Most organizations in Indonesia are still at Level 1, while the global standard has already shifted to full agentic autonomy.
            </p>

            <div className="flex flex-col md:flex-row items-end justify-center h-auto md:h-[400px] px-4 gap-6 md:gap-8">
                {/* Step 1 */}
                <div className="stair w-full md:w-1/3 bg-white/50 backdrop-blur-sm p-8 flex flex-col justify-start h-[220px] rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
                    <span className="absolute -top-3 left-8 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] ring-1 ring-gray-200">Where Most Orgs Are Today</span>
                    <div className="flex items-baseline gap-3 mb-4 mt-2">
                        <span className="text-5xl font-black text-gray-200">1</span>
                        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">LLM <span className="text-gray-400 font-medium">(Chat)</span></h3>
                    </div>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        Dual-prompt phase. Tools operate separately from core workflows and require repeated manual instructions from employees.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="stair w-full md:w-1/3 bg-white/70 backdrop-blur-sm p-8 flex flex-col justify-start h-auto md:h-[300px] rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-900/5 transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/60">
                    <div className="flex items-baseline gap-3 mb-4">
                        <span className="text-5xl font-black text-gray-300">2</span>
                        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">AI Agents</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-6">
                        Integrated assistant phase. The model connects to your internal ecosystem — calendar, databases, documents (Copilot, NotebookLM).
                    </p>
                    <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Directed, Bounded Operations
                    </div>
                </div>

                {/* Step 3 */}
                <div className="stair w-full md:w-1/3 bg-gray-900 p-8 flex flex-col justify-start h-auto md:h-[400px] rounded-3xl relative shadow-2xl shadow-gray-900/20 transition-all hover:-translate-y-2 hover:shadow-gray-900/40">
                    <span className="absolute -top-3 left-8 bg-white text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-[0.2em]">Global Target 2026</span>
                    <div className="flex items-baseline gap-3 mb-4 mt-2">
                        <span className="text-6xl font-black text-gray-700">3</span>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Agentic AI</h3>
                    </div>
                    <p className="text-gray-300 font-medium leading-relaxed text-base mt-2">
                        Autonomous cross-system phase. Multiple specialized agents communicate and execute end-to-end operational processes — from trigger to resolution, with minimal human touchpoints.
                    </p>
                    <div className="mt-auto pt-6">
                        <div className="h-1.5 w-12 bg-gray-700 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
