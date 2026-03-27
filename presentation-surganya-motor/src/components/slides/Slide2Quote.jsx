export default function Slide2Quote() {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="flex items-start text-left mb-12">
                <span className="text-[8rem] leading-[0.8] text-gray-900 font-serif font-bold mr-6">“</span>
                <p className="text-4xl md:text-5xl font-semibold leading-snug tracking-tight text-gray-800 pt-6">
                    AI agents are the leap from being an 'add-on' approach to being an 'AI-first' process. It's a fundamental change in workflow.
                </p>
            </div>
            <div className="flex items-center gap-6 mt-16 justify-start md:ml-24">
                <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover grayscale"
                    alt="Oliver Parker"
                />
                <div className="text-left">
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Oliver Parker</h3>
                    <p className="text-gray-500 font-medium text-base md:text-lg mt-1">Vice President, Global GTM for Generative AI, Google Cloud</p>
                </div>
            </div>
        </div>
    )
}
