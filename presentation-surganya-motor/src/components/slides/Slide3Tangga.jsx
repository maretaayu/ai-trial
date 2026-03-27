import React from 'react';

const ToolPill = ({ logo, name, onError }) => {
    const [failed, setFailed] = React.useState(false);
    return (
        <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-full px-2.5 py-1 shadow-sm">
            {(!logo || failed)
                ? <div className="w-3.5 h-3.5 rounded-full bg-gray-200 text-gray-500 text-[7px] font-black flex items-center justify-center flex-shrink-0">{name[0]}</div>
                : <img src={logo} alt={name} className="w-3.5 h-3.5 object-contain flex-shrink-0" onError={() => setFailed(true)} />
            }
            <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{name}</span>
        </div>
    );
};

const DarkToolPill = ({ logo, name }) => {
    const [failed, setFailed] = React.useState(false);
    return (
        <div className="flex items-center gap-1.5 bg-white/10 border border-white/10 rounded-full px-2.5 py-1">
            {(!logo || failed)
                ? <div className="w-3.5 h-3.5 rounded-full bg-white/20 text-white text-[7px] font-black flex items-center justify-center flex-shrink-0">{name[0]}</div>
                : <img src={logo} alt={name} className="w-3.5 h-3.5 object-contain flex-shrink-0" onError={() => setFailed(true)} />
            }
            <span className="text-[10px] font-semibold text-gray-300 whitespace-nowrap">{name}</span>
        </div>
    );
};

export default function Slide3Tangga() {
    const level1Tools = [
        { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png" },
        { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/320px-Google_Gemini_logo.svg.png" },
        { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg" },
    ];
    const level2Tools = [
        { name: "Copilot M365", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png" },
        { name: "NotebookLM", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
        { name: "Antigravity", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
        { name: "Claude Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Anthropic_logo.svg" },
        { name: "Cursor", logo: "https://www.cursor.com/favicon.ico" },
    ];
    const level3Tools = [
        { name: "n8n", logo: "https://n8n.io/favicon.ico" },
        { name: "Google Vertex AI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png" },
        { name: "CrewAI", logo: "https://avatars.githubusercontent.com/u/151832966?s=200" },
        { name: "LangGraph", logo: "https://avatars.githubusercontent.com/u/126733545?s=200" },
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight text-center text-gray-900">The 3 Levels of AI Adoption</h2>
                <p className="text-lg text-gray-400 mb-12 text-center max-w-3xl mx-auto font-medium">
                    Most organizations in Indonesia are still at Level 1, while the global standard has already shifted to full agentic autonomy.
                </p>

                <div className="flex flex-col md:flex-row items-end justify-center h-auto md:h-[380px] px-4 gap-6 md:gap-8">
                    {/* Step 1 */}
                    <div className="stair w-full md:w-1/3 bg-white/50 backdrop-blur-sm p-7 flex flex-col justify-start h-[230px] rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all hover:bg-white hover:shadow-xl hover:shadow-gray-200/50">
                        <span className="absolute -top-3 left-8 bg-gray-100 text-gray-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] ring-1 ring-gray-200">Where Most Orgs Are Today</span>
                        <div className="flex items-baseline gap-3 mb-3 mt-2">
                            <span className="text-5xl font-black text-gray-200">1</span>
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">LLM <span className="text-gray-400 font-medium">(Chat)</span></h3>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm mb-4">
                            Dual-prompt phase. Tools operate separately from core workflows and require repeated manual instructions.
                        </p>
                        <div className="mt-auto flex flex-wrap gap-1.5">
                            {level1Tools.map((t, i) => <ToolPill key={i} {...t} />)}
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="stair w-full md:w-1/3 bg-white/70 backdrop-blur-sm p-7 flex flex-col justify-start h-auto md:h-[310px] rounded-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-900/5 transition-all hover:bg-white hover:shadow-2xl hover:shadow-gray-200/60">
                        <div className="flex items-baseline gap-3 mb-3">
                            <span className="text-5xl font-black text-gray-300">2</span>
                            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">AI Agents</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm mb-4">
                            Integrated assistant phase. The model connects to your internal ecosystem — calendar, databases, documents.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {level2Tools.map((t, i) => <ToolPill key={i} {...t} />)}
                        </div>
                        <div className="mt-auto inline-flex items-center gap-2 text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl w-max">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span> Directed, Bounded Operations
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="stair w-full md:w-1/3 bg-gray-900 p-7 flex flex-col justify-start h-auto md:h-[380px] rounded-3xl relative shadow-2xl shadow-gray-900/20 transition-all hover:-translate-y-2 hover:shadow-gray-900/40">
                        <span className="absolute -top-3 left-8 bg-white text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-[0.2em]">Global Target 2026</span>
                        <div className="flex items-baseline gap-3 mb-3 mt-2">
                            <span className="text-6xl font-black text-gray-700">3</span>
                            <h3 className="text-3xl font-bold text-white tracking-tight">Agentic AI</h3>
                        </div>
                        <p className="text-gray-300 font-medium leading-relaxed text-sm mt-1 mb-4">
                            Autonomous cross-system phase. Multiple specialized agents communicate and execute end-to-end operational processes — with minimal human touchpoints.
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {level3Tools.map((t, i) => <DarkToolPill key={i} {...t} />)}
                        </div>
                        <div className="mt-auto pt-4">
                            <div className="h-1.5 w-12 bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
