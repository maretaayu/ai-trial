export default function Slide1Title() {
    return (
        <div className="w-full h-full flex items-center justify-center relative">
            {/* Subtle Mesh Gradient Globs matching reference */}
            <div className="absolute -bottom-1/4 -left-1/4 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] bg-blue-500/20 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute top-0 -right-1/4 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-fuchsia-400/15 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-4xl mx-auto text-center z-10 px-4 flex flex-col items-center">

                {/* Very compact sophisticated badge */}
                <div className="inline-flex items-center justify-center gap-3 border border-gray-200 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase mb-8 sm:mb-12 shadow-sm">
                    <span>AI Trial Session</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>2026</span>
                </div>

                {/* Monumental, tightly tracked headline */}
                <h1 className="text-5xl sm:text-6xl md:text-[6rem] font-bold mb-6 tracking-tighter text-gray-900 leading-[1.05]">
                    The AI Mindset &<br />Tools Landscape.
                </h1>

                {/* Clean, short subheading */}
                <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
                    From <span className="text-gray-900 font-bold">trends & tools</span> to <span className="text-gray-900 font-bold">real-world use cases</span> and responsible AI adoption.
                </p>

                {/* Minimal line separator */}
                <div className="w-8 h-[2px] bg-gray-900 mt-10 rounded-full"></div>

                {/* Attribution */}
                <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mt-4">
                    By Ruangguru Engineering Academy
                </p>

            </div>
        </div>
    )
}
