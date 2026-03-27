import React from 'react';
import { ExternalLink, Play, FileSpreadsheet, Presentation, Layout, Network, Headphones } from 'lucide-react';

export const SlideOutputPreview = ({ type, title, subtitle, mediaSrc, link, isVideo, isAudio }) => {
    const icons = {
        infografis: Layout,
        mindmap: Network,
        video: Play,
        sheets: FileSpreadsheet,
        ppt: Presentation,
        podcast: Headphones
    };
    const Icon = icons[type] || Layout;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white overflow-hidden p-8 md:p-12">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Text Content */}
                <div className="flex-1 space-y-6 text-center md:text-left order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] text-gray-500 uppercase shadow-sm">
                        <Icon className="w-4 h-4" /> Potential Output: {type}
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 leading-tight">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                        {subtitle}
                    </p>

                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all group shadow-lg mt-4"
                        >
                            Buka Dokumen Asli
                            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </a>
                    )}
                </div>

                {/* Media Preview */}
                <div className="flex-1 w-full order-1 md:order-2 flex justify-center">
                    <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 group flex flex-col items-center justify-center min-h-[300px]">
                        {isVideo ? (
                            <video
                                src={mediaSrc}
                                className="w-full h-full object-cover"
                                controls
                                muted
                                playsInline
                            />
                        ) : isAudio ? (
                            <div className="w-full p-12 flex flex-col items-center gap-8">
                                <div className="w-32 h-32 rounded-full bg-blue-50 flex items-center justify-center animate-pulse shadow-inner">
                                    <Headphones className="w-16 h-16 text-blue-600" />
                                </div>
                                <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <audio
                                        src={mediaSrc}
                                        controls
                                        className="w-full"
                                    />
                                </div>
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">
                                    Playing: Audio Overview Podcast
                                </p>
                            </div>
                        ) : (
                            <div className="aspect-[4/3] md:aspect-video flex items-center justify-center p-2">
                                <img
                                    src={mediaSrc}
                                    alt={title}
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                        )}
                        {/* Subtle Overlay on hover for static images */}
                        {!isVideo && !isAudio && (
                            <div className="absolute inset-0 bg-gray-900/0 group-hover:bg-gray-900/5 transition-colors pointer-events-none" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
