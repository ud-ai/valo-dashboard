"use client";
import { useState } from "react";
import { Match } from "@/types";
import MatchCard from "./MatchCard";
import MatchDetails from "./MatchDetails";
import { cn } from "@/lib/utils";
import { Filter, Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchHistoryProps {
    matches: Match[];
}

type FilterType = "all" | "won" | "lost";

export default function MatchHistory({ matches }: MatchHistoryProps) {
    const [filter, setFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filteredMatches = matches.filter((match) => {
        // 1. Filter by Result
        if (filter !== "all" && match.result.toLowerCase() !== filter) return false;

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
        <div className="space-y-4">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-card/50 dark:bg-bg-secondary/20 p-4 rounded-xl border border-border-color dark:border-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                <h2 className="text-xl font-bold text-text-primary dark:text-white flex items-center gap-2">
                    Latest Matches
                    <span className="text-xs px-2 py-1 bg-bg-secondary/50 dark:bg-white/10 rounded-full text-text-muted">{filteredMatches.length}</span>
                </h2>

                <div className="flex flex-col sm:flex-row flex-1 w-full md:w-auto gap-3">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                        <input
                            type="text"
                            placeholder="Search Agent, Map..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-bg-primary/50 border border-border-color dark:border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-text-primary dark:text-white focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder:text-text-muted"
                        />
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative min-w-[140px] z-50">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full flex items-center justify-between gap-2 bg-bg-primary/50 border border-border-color dark:border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary dark:text-white hover:bg-bg-primary/70 transition-colors"
                        >
                            <span className="flex items-center gap-2">
                                <Filter size={14} className="text-text-muted" />
                                {filter === 'all' ? 'All Matches' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </span>
                            <ChevronDown size={14} className={`text-text-muted transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isFilterOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full right-0 mt-2 w-full bg-bg-card dark:bg-bg-secondary border border-border-color dark:border-white/10 rounded-lg shadow-xl overflow-hidden"
                                >
                                    {['all', 'won', 'lost'].map((f) => (
                                        <button
                                            key={f}
                                            className={cn(
                                                "w-full text-left px-4 py-2 text-sm hover:bg-bg-primary/50 dark:hover:bg-white/5 transition-colors",
                                                filter === f ? "text-accent-red font-bold" : "text-text-primary dark:text-text-secondary"
                                            )}
                                            onClick={() => {
                                                setFilter(f as FilterType);
                                                setIsFilterOpen(false);
                                            }}
                                        >
                                            {f === 'all' ? 'All Matches' : f.charAt(0).toUpperCase() + f.slice(1)}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>



            <div className={`space-y-3 transition-opacity duration-200 ${isFilterOpen ? 'pointer-events-none opacity-50' : 'opacity-100'}`}>
                <AnimatePresence mode="popLayout">
                    {filteredMatches.map((match) => (
                        <motion.div
                            key={match.match_id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <MatchCard match={match} onClick={() => !isFilterOpen && setSelectedMatch(match)} />
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
            {
                selectedMatch && (
                    <MatchDetails
                        match={selectedMatch}
                        isOpen={!!selectedMatch}
                        onClose={() => setSelectedMatch(null)}
                    />
                )
            }

            {/* Click outside handler & Backdrop for dropdown */}
            {isFilterOpen && (
                <div
                    className="fixed inset-0 z-[5] bg-black/40"
                    onClick={() => setIsFilterOpen(false)}
                />
            )}
        </div >
    );
}
