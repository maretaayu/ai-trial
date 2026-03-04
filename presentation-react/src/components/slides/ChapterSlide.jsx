import React from 'react';

/**
 * ChapterSlide — full-screen dark section divider
 * Acts like a chapter cover between major sections of the presentation.
 */
export const ChapterSlide = ({ number, chapter, title, subtitle }) => {
    return (
        <div className="w-full h-full bg-gray-950 flex items-center justify-center relative overflow-hidden">
            {/* Gradient orb background */}
            <div
                className="absolute rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, #6366f1 0%, #4f46e5 40%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-60%, -60%)',
                }}
            />
            <div
                className="absolute rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
                    bottom: '10%',
                    right: '5%',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-12 text-center">
                {/* Chapter badge */}
                <div className="inline-flex items-center gap-3 mb-8">
                    {number && (
                        <span className="text-xs font-black tracking-[0.3em] text-indigo-400 uppercase opacity-80 border border-indigo-800 rounded-full px-4 py-1.5">
                            Chapter {number}
                        </span>
                    )}
                    {chapter && (
                        <span className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase">
                            {chapter}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.02] mb-6">
                    {title}
                </h2>

                {/* Subtitle */}
                {subtitle && (
                    <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}

                {/* Decorative line */}
                <div className="mt-10 flex justify-center">
                    <div className="h-px w-16 bg-indigo-500/60 rounded-full" />
                </div>
            </div>
        </div>
    );
};
