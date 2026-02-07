import React from 'react';

interface BodyHitChartProps {
    head: number;
    body: number;
    legs: number;
}

export default function BodyHitChart({ head, body, legs }: BodyHitChartProps) {
    const total = head + body + legs;
    const getPercent = (val: number) => total > 0 ? Math.round((val / total) * 100) : 0;

    const headPercent = getPercent(head);
    const bodyPercent = getPercent(body);
    const legsPercent = getPercent(legs);

    // Tactical dummy silhouette paths
    const headPath = "M100 30 C 85 30, 75 45, 75 65 C 75 85, 85 95, 100 95 C 115 95, 125 85, 125 65 C 125 45, 115 30, 100 30 Z";

    // Upper body including arms slightly
    const bodyPath = "M 70 100 L 130 100 L 155 130 L 150 280 L 130 280 L 130 300 L 70 300 L 70 280 L 50 280 L 45 130 L 70 100 Z";
    // More detailed body path
    const torsoPath = "M100 98 L130 105 L155 135 L145 280 L55 280 L45 135 L70 105 Z";

    const legsPath = "M55 285 L145 285 L140 480 L115 480 L110 350 L90 350 L85 480 L60 480 Z";

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] w-full relative">
            <svg viewBox="0 0 200 500" className="h-full w-auto max-h-[280px] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <defs>
                    <linearGradient id="scanline" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                </defs>

                {/* Base Silhouette (Ghost) */}
                <path d={headPath} className="fill-white/5 stroke-white/10 stroke-1" />
                <path d={torsoPath} className="fill-white/5 stroke-white/10 stroke-1" />
                <path d={legsPath} className="fill-white/5 stroke-white/10 stroke-1" />

                {/* Head Zone */}
                <g className="transition-all duration-300 hover:opacity-100 opacity-90 cursor-pointer group">
                    <path d={headPath} className="fill-accent-cyan/10 stroke-accent-cyan stroke-2 transition-all group-hover:fill-accent-cyan/20 group-hover:stroke-[3px]" />
                    <path d={headPath} className="fill-accent-cyan" style={{ opacity: Math.max(0.1, headPercent / 100) }} />

                    {/* Floating Label */}
                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <line x1="125" y1="65" x2="160" y2="65" stroke="white" strokeWidth="1" />
                        <text x="165" y="70" fill="white" fontSize="14" fontWeight="bold">Head</text>
                        <text x="165" y="86" fill="#00d4aa" fontSize="12">{headPercent}%</text>
                    </g>
                    <text x="100" y="70" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none drop-shadow-md">{headPercent}%</text>
                </g>

                {/* Body Zone */}
                <g className="transition-all duration-300 hover:opacity-100 opacity-90 cursor-pointer group">
                    <path d={torsoPath} className="fill-yellow-500/10 stroke-yellow-500 stroke-2 transition-all group-hover:fill-yellow-500/20 group-hover:stroke-[3px]" />
                    <path d={torsoPath} className="fill-yellow-500" style={{ opacity: Math.max(0.1, bodyPercent / 100) }} />

                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <line x1="145" y1="190" x2="180" y2="190" stroke="white" strokeWidth="1" />
                        <text x="185" y="195" fill="white" fontSize="14" fontWeight="bold">Body</text>
                        <text x="185" y="211" fill="#eab308" fontSize="12">{bodyPercent}%</text>
                    </g>
                    <text x="100" y="200" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="pointer-events-none drop-shadow-md">{bodyPercent}%</text>
                </g>

                {/* Legs Zone */}
                <g className="transition-all duration-300 hover:opacity-100 opacity-90 cursor-pointer group">
                    <path d={legsPath} className="fill-accent-red/10 stroke-accent-red stroke-2 transition-all group-hover:fill-accent-red/20 group-hover:stroke-[3px]" />
                    <path d={legsPath} className="fill-accent-red" style={{ opacity: Math.max(0.1, legsPercent / 100) }} />

                    <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <line x1="140" y1="380" x2="175" y2="380" stroke="white" strokeWidth="1" />
                        <text x="180" y="385" fill="white" fontSize="14" fontWeight="bold">Legs</text>
                        <text x="180" y="401" fill="#ff4655" fontSize="12">{legsPercent}%</text>
                    </g>
                    <text x="100" y="400" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" className="pointer-events-none drop-shadow-md">{legsPercent}%</text>
                </g>
                {/* Scanline Effect */}
                <rect x="0" y="0" width="200" height="500" fill="url(#scanline)" className="pointer-events-none animate-scanline opacity-30" />
            </svg>
        </div>
    );
}
