"use client";
import React from 'react';

import { Match } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAgentImageUrl, getMapImageUrl } from "@/lib/valorant-data";

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
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.03
            }}
            whileHover={{
                scale: 1.01,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.99 }}
            onClick={onClick}
            className="group relative flex items-center gap-6 p-4 border-b border-border-color/10 cursor-pointer overflow-hidden"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-red/0 via-accent-red/[0.03] to-accent-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Result Indicator */}
            <div className={cn(
                "w-1 self-stretch rounded-full relative z-10",
                isWin ? "bg-accent-green shadow-[0_0_12px_rgba(204,255,0,0.6)]" : "bg-accent-red shadow-[0_0_12px_rgba(255,70,85,0.6)]"
            )} />

            {/* Agent Icon */}
            <div className="relative w-12 h-12 bg-bg-card border border-border-color/10 shrink-0 z-10 group-hover:border-accent-red/30 transition-colors">
                <Image
                    src={getAgentImageUrl(match.agent)}
                    alt={match.agent}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Match Info */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 items-center gap-4 z-10">
                <div>
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight group-hover:text-accent-red transition-colors">
                        {match.map}
                    </h3>
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{match.agent}</div>
                </div>

                <div className="hidden md:block">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Result</div>
                    <span className={cn("text-xs font-bold uppercase", isWin ? "text-accent-green" : "text-accent-red")}>
                        {match.result}
                    </span>
                </div>

                <div className="hidden md:block">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">Combat</div>
                    <div className="text-xs font-mono text-text-secondary">
                        {match.kills} / {match.deaths} / {match.assists}
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-1">ACS</div>
                    <div className="text-lg font-bold text-text-primary">
                        {match.ACS}
                    </div>
                </div>
            </div>

            {/* Action */}
            <div className="text-text-muted group-hover:text-accent-red transition-colors z-10">
                <motion.div whileHover={{ x: 5 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </motion.div>
            </div>
        </motion.div>

    );
}

export default function MatchHistory({ matches, onMatchClick }: MatchHistoryProps) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filter, setFilter] = React.useState<"all" | "won" | "lost">("all");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

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
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-red transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Map or Agent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-bg-card border border-border-color/10 pl-9 pr-4 py-2 rounded-lg text-xs font-mono text-text-primary focus:outline-none focus:border-accent-red/50 transition-all w-full md:w-48"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <motion.button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 px-4 py-2 bg-bg-card border border-border-color/10 rounded-lg text-[10px] font-mono uppercase tracking-widest text-text-primary hover:border-accent-red/50 transition-colors"
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

            <div className="bg-bg-card border border-border-color/10 overflow-hidden">
                {isLoading ? (
                    <MatchHistorySkeleton />
                ) : filteredMatches.length > 0 ? (
                    <div className="divide-y divide-border-color/10">
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
