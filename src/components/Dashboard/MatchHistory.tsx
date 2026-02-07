"use client";
import { useState } from "react";
import { Match } from "@/types";
import MatchCard from "./MatchCard";
import MatchDetails from "./MatchDetails";
import { cn } from "@/lib/utils";
import { Filter, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchHistoryProps {
    matches: Match[];
}

type FilterType = "All" | "Won" | "Lost";

export default function MatchHistory({ matches }: MatchHistoryProps) {
    const [filter, setFilter] = useState<FilterType>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    const filteredMatches = matches.filter((match) => {
        // 1. Filter by Result
        if (filter !== "All" && match.result !== filter) return false;

        // 2. Filter by Search Query (Map or Agent)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const mapMatch = match.map.toLowerCase().includes(query);
            const agentMatch = match.agent.toLowerCase().includes(query);
            return mapMatch || agentMatch;
        }

        return true;
    });

    return (
        <div className="mt-10">
            <div className="flex flex-col md:flex-row items-end md:items-center justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-text-primary">
                    <div className="p-2 bg-gradient-1 rounded-lg shadow-lg shadow-accent-red/20">
                        <Filter size={18} className="text-white" />
                    </div>
                    Match History
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    {/* Search Input */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-cyan transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search Map or Agent..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl bg-bg-card border border-border-color focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-all text-sm text-text-primary placeholder:text-text-muted"
                        />
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex p-1 bg-bg-card rounded-xl border border-border-color">
                        {(["All", "Won", "Lost"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 md:px-6 py-1.5 md:py-2 rounded-lg text-sm font-bold transition-all duration-300",
                                    filter === f
                                        ? "bg-bg-secondary text-text-primary shadow-inner border border-border-color"
                                        : "text-text-muted hover:text-text-primary hover:bg-bg-secondary/50"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {filteredMatches.map((match) => (
                        <motion.div
                            key={match.match_id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MatchCard match={match} onClick={() => setSelectedMatch(match)} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredMatches.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-16 text-center text-text-muted bg-bg-card/20 rounded-2xl border border-border-color border-dashed backdrop-blur-sm"
                    >
                        <p>No matches found for this filter.</p>
                    </motion.div>
                )}
            </div>

            {/* Match Details Modal */}
            {selectedMatch && (
                <MatchDetails
                    match={selectedMatch}
                    isOpen={!!selectedMatch}
                    onClose={() => setSelectedMatch(null)}
                />
            )}
        </div>
    );
}
