"use client";
import React from 'react';
import { Match } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAgentImageUrl, getMapImageUrl } from "@/lib/valorant-data";
import { ChevronRight } from "lucide-react";
import MatchDetails from "./MatchDetails";

interface MatchHistoryProps {
    matches: Match[];
    onMatchClick?: (match: Match) => void;
}



function MatchHistorySkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className={cn(
                    "relative flex items-center gap-4 p-4 border-b border-white/5 animate-pulse",
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                )}>
                    {/* Skeleton Agent */}
                    <div className="w-16 h-16 bg-white/10 shrink-0" />

                    {/* Skeleton Info */}
                    <div className={cn("flex-1 flex flex-col gap-2", i % 2 === 0 ? "items-start" : "items-end")}>
                        <div className="h-8 w-32 bg-white/10" />
                        <div className="h-4 w-48 bg-white/5" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function MatchItem({ match, index, onClick }: { match: Match; index: number; onClick?: () => void }) {
    const isWin = match.result === "Won";
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.25,
                delay: Math.min(index * 0.04, 0.4),
                ease: "easeOut"
            }}
            whileHover="hover"
            className="group relative border-b border-border-color cursor-pointer overflow-hidden transition-colors"
        >
            <motion.div
                className="relative flex items-center gap-4 md:gap-6 p-4 md:p-6 z-10"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <motion.div
                    className="absolute inset-0 z-0 pointer-events-none"
                    variants={{
                        hover: { backgroundColor: "rgba(0, 0, 0, 0.03)" }
                    }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                />

                {/* Map Splash Background */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                    <Image
                        src={getMapImageUrl(match.map)}
                        alt={match.map}
                        fill
                        className="object-cover pointer-events-none"
                        quality={50}
                    />
                    {/* White overlay for light mode context protection */}
                    <div className="absolute inset-0 bg-white/90 dark:bg-bg-primary/40 transition-colors" />
                </div>


                <div className="absolute inset-0 tech-grid opacity-0 group-hover:opacity-5 transition-opacity z-[1]" />

                {/* Left Result Color Bar */}
                <div className={cn(
                    "absolute left-0 top-1 bottom-1 w-1.5 rounded-r-full z-20 transition-all shadow-sm",
                    isWin ? "bg-[#22C55E]" : "bg-[#EF4444]"
                )} />

                {/* Agent Icon */}
                <div className="relative w-14 h-14 bg-bg-secondary border border-border-color/10 shrink-0 z-10 group-hover:border-accent-red/30 transition-colors clip-path-slant ml-2">
                    <Image
                        src={getAgentImageUrl(match.agent)}
                        alt={match.agent}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 brightness-95 group-hover:brightness-100"
                    />
                </div>

                {/* Match Info */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 items-center gap-4 z-10">
                    <div>
                        <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase italic tracking-tighter group-hover:text-accent-red transition-colors leading-none">
                            {match.map}
                        </h3>
                        <div className="text-[9px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1.5">
                            /// {match.agent}
                        </div>
                    </div>

                    <div className="hidden md:block">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">Status Dossier</div>
                        <span className={cn("text-xs font-black uppercase tracking-tight", isWin ? "text-[#22C55E]" : "text-[#EF4444]")}>
                            {match.result}
                        </span>
                    </div>

                    <div className="hidden md:block">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60">Combat Data</div>
                        <div className="text-xs font-mono font-bold text-text-secondary">
                            {match.kills} / {match.deaths} / {match.assists}
                        </div>
                    </div>

                    <div className="text-right">
                        <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1.5 opacity-60 italic">ACS</div>
                        <div className="text-2xl md:text-3xl font-bold text-text-primary tracking-tighter italic leading-none">
                            {match.ACS}
                        </div>
                    </div>


                </div>

                {/* Action */}
                <motion.div
                    className="text-text-muted z-10"
                    variants={{
                        hover: { x: 4, opacity: 1, color: "var(--accent-red)" }
                    }}
                    initial={{ opacity: 0.6 }}
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -4 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="overflow-hidden relative z-10"
                    >
                        <div className="p-4 md:p-8 pt-0 border-t border-border-color/10">
                            {/* Since MatchDetails is likely in same dir or accessible */}
                            <MatchDetails
                                match={match}
                                isOpen={true}
                                onClose={() => setIsExpanded(false)}
                            />

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function MatchHistory({ matches, onMatchClick }: MatchHistoryProps) {

    const [isLoading, setIsLoading] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState("");
    const [filter, setFilter] = React.useState<"all" | "won" | "lost">("all");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);





    const filteredMatches = React.useMemo(() => {
        return matches.filter(match => {
            const matchesSearch =
                match.map.toLowerCase().includes(searchQuery.toLowerCase()) ||
                match.agent.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilter =
                filter === "all" ||
                (filter === "won" && match.result === "Won") ||
                (filter === "lost" && match.result === "Lost");

            return matchesSearch && matchesFilter;
        });
    }, [matches, searchQuery, filter]);

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xs font-mono text-text-muted tracking-[0.3em] uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-red" />
                    Match History
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-red transition-colors flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <motion.input
                            type="text"
                            placeholder="Search Map or Agent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            whileFocus={{
                                boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.2)"
                            }}
                            className="bg-bg-card border border-border-color pl-10 pr-4 py-2.5 rounded-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-red/50 transition-all w-full md:w-56 shadow-sm"
                        />

                    </div>


                    {/* Filter Dropdown */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-5 py-2.5 bg-bg-card border border-border-color rounded-lg text-[10px] font-mono uppercase tracking-widest text-text-primary hover:bg-bg-secondary hover:border-accent-red/30 focus:ring-2 focus:ring-accent-red/20 transition-all shadow-sm"
                        >
                            <span className="text-text-muted">Result:</span>
                            <span className="text-accent-red font-bold">{filter}</span>
                            <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                            </motion.span>
                        </motion.button>


                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute right-0 mt-2 w-32 bg-bg-card border border-border-color/10 rounded-lg shadow-2xl overflow-hidden z-50 backdrop-blur-xl"
                                    >

                                        {(["all", "won", "lost"] as const).map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => {
                                                    setFilter(f);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full px-4 py-2.5 text-left text-[10px] font-mono uppercase tracking-widest transition-colors border-b last:border-b-0 border-border-color/5",
                                                    filter === f
                                                        ? "bg-accent-red/10 text-accent-red"
                                                        : "text-text-muted hover:bg-white/5 hover:text-text-primary"
                                                )}
                                            >
                                                {f}
                                            </button>
                                        ))}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="tactical-frame overflow-hidden">

                {isLoading ? (
                    <MatchHistorySkeleton />
                ) : filteredMatches.length > 0 ? (
                    <div className="divide-y divide-border-color">

                        {filteredMatches.map((match, index) => (
                            <MatchItem
                                key={index}
                                match={match}
                                index={index}
                                onClick={() => onMatchClick?.(match)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-2">
                        <div className="text-text-muted font-mono text-xs uppercase tracking-[0.2em]">No Matches Found</div>
                        <div className="text-[10px] text-text-muted opacity-50">Try adjusting your search or filters</div>
                    </div>
                )}
            </div>
        </div>
    );
}
