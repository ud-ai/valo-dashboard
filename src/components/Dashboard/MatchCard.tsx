import { Match } from "@/types";
import { cn } from "@/lib/utils";
import { Sword, Skull, Target } from "lucide-react";

interface MatchCardProps {
    match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
    const isWin = match.result === "Won";
    const isLoss = match.result === "Lost";

    // Calculate a visual width for the KD bar (capped at reasonable max KD, e.g. 3.0)
    const kdWidth = Math.min((match.kd_ratio / 3) * 100, 100);

    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl transition-all duration-300 hover:scale-[1.005] hover:shadow-xl",
                "bg-bg-card border border-border-color hover:border-accent-purple/20"
            )}
        >
            {/* Colorful Side Indicator */}
            <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1.5 z-10",
                isWin ? "bg-accent-cyan shadow-[0_0_15px_rgba(0,212,170,0.5)]" : isLoss ? "bg-accent-red shadow-[0_0_15px_rgba(255,70,85,0.5)]" : "bg-text-muted"
            )} />

            {/* Background Gradient for Win/Loss */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                isWin ? "bg-gradient-to-r from-accent-cyan to-transparent" : isLoss ? "bg-gradient-to-r from-accent-red to-transparent" : ""
            )} />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-4 p-4 pl-6">
                {/* Map & Agent Info */}
                <div className="flex items-center gap-4 min-w-[180px]">
                    <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black border border-border-color",
                        isWin ? "bg-accent-cyan/10 text-accent-cyan" : isLoss ? "bg-accent-red/10 text-accent-red" : "bg-bg-secondary text-text-muted"
                    )}>
                        {match.result[0]}
                    </div>
                    <div>
                        <h3 className="font-bold text-text-primary text-lg tracking-tight">{match.map}</h3>
                        <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{match.agent}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 w-full ml-0 md:ml-4 items-center">

                    {/* K/D/A */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Sword size={10} /> K / D / A
                        </span>
                        <span className="font-mono text-text-primary text-base font-medium">
                            {match.kills} <span className="text-text-muted">/</span> <span className={cn(isLoss ? "text-accent-red" : "text-text-primary")}>{match.deaths}</span> <span className="text-text-muted">/</span> {match.assists}
                        </span>
                    </div>

                    {/* KD Ratio with Visual Bar */}
                    <div className="flex flex-col min-w-[100px]">
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Target size={10} /> KD Ratio
                        </span>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "font-mono font-bold text-lg",
                                match.kd_ratio >= 1.2 ? "text-accent-cyan" : match.kd_ratio < 0.8 ? "text-accent-red" : "text-text-primary"
                            )}>
                                {match.kd_ratio}
                            </span>
                            <div className="h-1.5 flex-1 bg-bg-secondary rounded-full overflow-hidden">
                                <div
                                    style={{ width: `${kdWidth}%` }}
                                    className={cn("h-full rounded-full opacity-80", isWin ? "bg-accent-cyan" : "bg-text-muted")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Headshot % */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                            <Skull size={10} /> HS%
                        </span>
                        <span className={cn("font-mono font-medium text-base", match.headshot_percentage > 25 ? "text-accent-purple" : "text-text-primary")}>
                            {match.headshot_percentage}%
                        </span>
                    </div>

                    {/* Date */}
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider mb-1">Match Date</span>
                        <span className="text-xs text-text-muted font-medium">{match.date_and_time.split(',')[0]}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
