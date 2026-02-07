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

    // Color scaling based on percentage (higher is better? or just distinct colors?)
    // Usually, headshots are prized, so maybe distinct colors for zones.
    // The user asked for "represent the hit accuracy data in a body... similar with leg".
    // I will use colors based on intensity or just distinct zonal colors as in the original design (Cyan, Yellow, Red).

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] w-full relative">
            <svg viewBox="0 0 200 500" className="w-full h-full max-w-[200px] drop-shadow-xl filter">
                {/* ID definitions for gradients or effects could go here */}

                {/* Head Zone */}
                <g className="transition-all duration-300 hover:opacity-90 cursor-pointer group">
                    {/* Simple Head Circle */}
                    <circle cx="100" cy="50" r="35" className="fill-accent-cyan/20 stroke-accent-cyan stroke-2" />
                    <circle cx="100" cy="50" r={35 * (headPercent / 100)} className="fill-accent-cyan opacity-80" />

                    {/* Hover Connector Line */}
                    <line x1="135" y1="50" x2="180" y2="50" stroke="white" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    <text x="185" y="55" fill="white" fontSize="14" className="opacity-0 group-hover:opacity-100 transition-opacity font-bold">Head: {head} ({headPercent}%)</text>
                    <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" className="pointer-events-none drop-shadow-md">{headPercent}%</text>
                </g>

                {/* Body Zone */}
                <g className="transition-all duration-300 hover:opacity-90 cursor-pointer group">
                    {/* Torso Path */}
                    <path d="M65 95 Q100 95 135 95 L150 120 L145 280 L130 280 L130 300 L70 300 L70 280 L55 280 L50 120 Z"
                        className="fill-yellow-500/20 stroke-yellow-500 stroke-2" />

                    {/* Fill based on percentage - simple overlay rect clipped to path or just opacity change? 
                        Proper fill height is complex with path. Let's just use opacity of a solid inner path or overlay. 
                        Actually, simplified approach: Background is transparent/low opacity, Foreground is filled based on %? 
                        Applying a mask is better but complex for inline SVG without definitions. 
                        Let's stick to base color with opacity varying by percentage? Or just fill opacity. 
                    */}
                    <path d="M65 95 Q100 95 135 95 L150 120 L145 280 L130 280 L130 300 L70 300 L70 280 L55 280 L50 120 Z"
                        className="fill-yellow-500" style={{ opacity: Math.max(0.2, bodyPercent / 100) }} />


                    <text x="100" y="200" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" className="pointer-events-none drop-shadow-md">{bodyPercent}%</text>
                </g>

                {/* Legs Zone */}
                <g className="transition-all duration-300 hover:opacity-90 cursor-pointer group">
                    {/* Legs Path */}
                    <path d="M70 305 L95 305 L90 500 L75 500 Z" className="fill-accent-red/20 stroke-accent-red stroke-2" />
                    <path d="M105 305 L130 305 L125 500 L110 500 Z" className="fill-accent-red/20 stroke-accent-red stroke-2" />

                    <path d="M70 305 L95 305 L90 500 L75 500 Z" className="fill-accent-red" style={{ opacity: Math.max(0.2, legsPercent / 100) }} />
                    <path d="M105 305 L130 305 L125 500 L110 500 Z" className="fill-accent-red" style={{ opacity: Math.max(0.2, legsPercent / 100) }} />

                    <text x="100" y="400" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" className="pointer-events-none drop-shadow-md">{legsPercent}%</text>
                </g>
            </svg>

            {/* Legend / Tooltips could go here, but SVG text is fine for now */}
        </div>
    );
}
