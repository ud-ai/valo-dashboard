import { Match } from "@/types";
import { X, Trophy, Skull, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MatchDetailsProps {
    match: Match;
    isOpen: boolean;
    onClose: () => void;
}

export default function MatchDetails({ match, isOpen, onClose }: MatchDetailsProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    // Use Portal to render outside the parent hierarchy
    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="relative h-32 bg-gradient-to-r from-bg-secondary to-bg-primary overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                            {/* Map Image Background Placeholder */}
                            <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('https://media.valorant-api.com/maps/${match.map === 'Pearl' ? 'fd267378-4d1d-484f-ff52-77821ed10dc2' : '2bee0dc9-4ffe-519b-1cbd-7fbe763a6047'}/splash.png')` }} />

                            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors cursor-pointer">
                                <X size={20} />
                            </button>

                            <div className="absolute bottom-6 left-8 z-20 flex items-end gap-4">
                                <div className={`text-4xl font-black ${match.result === 'Won' ? 'text-accent-cyan' : match.result === 'Lost' ? 'text-accent-red' : 'text-text-primary'}`}>
                                    {match.result.toUpperCase()}
                                </div>
                                <div className="text-white/60 font-bold text-lg mb-1">
                                    {match.map} • {match.agent}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            {/* Key Stats Row */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatBox label="Combat Score" value={match.ACS} icon={Zap} color="text-yellow-400" />
                                <StatBox label="K / D / A" value={`${match.kills} / ${match.deaths} / ${match.assists}`} icon={Trophy} color="text-text-primary" />
                                <StatBox label="KD Ratio" value={match.kd_ratio} icon={Target} color={match.kd_ratio >= 1 ? "text-accent-cyan" : "text-accent-red"} />
                                <StatBox label="Headshot %" value={`${match.headshot_percentage}%`} icon={Skull} color="text-accent-purple" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Damage Stats */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-white/10 pb-2">Combat Reporting</h3>
                                    <div className="flex justify-between items-center p-3 bg-bg-secondary/20 rounded-lg">
                                        <span className="text-text-muted">Total Damage Dealt</span>
                                        <span className="text-text-primary font-mono font-bold">{match.damage_made.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-bg-secondary/20 rounded-lg">
                                        <span className="text-text-muted">Total Damage Received</span>
                                        <span className="text-text-primary font-mono font-bold">{match.damage_received.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Accuracy Stats */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-white/10 pb-2">Hit Accuracy</h3>
                                    <div className="grid grid-cols-3 gap-2">
                                        <HitLocation label="Head" count={match.headshots} total={match.headshots + match.bodyshots + match.legshots} color="bg-accent-cyan" />
                                        <HitLocation label="Body" count={match.bodyshots} total={match.headshots + match.bodyshots + match.legshots} color="bg-yellow-500" />
                                        <HitLocation label="Legs" count={match.legshots} total={match.headshots + match.bodyshots + match.legshots} color="bg-accent-red" />
                                    </div>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap gap-4 text-xs text-text-muted pt-4 border-t border-white/10">
                                <span>Match ID: {match.match_id}</span>
                                <span>•</span>
                                <span>Act: {match.ACT}</span>
                                <span>•</span>
                                <span>Team: {match.team}</span>
                                <span>•</span>
                                <span>Rounds: {match.total_rounds}</span>
                                <span>•</span>
                                <span>{match.date_and_time}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}

function StatBox({ label, value, icon: Icon, color }: any) {
    return (
        <div className="bg-bg-secondary/30 p-4 rounded-xl border border-white/5">
            <div className={`flex items-center gap-2 mb-2 ${color} opacity-80`}>
                <Icon size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
            </div>
            <div className={`text-2xl font-black ${color}`}>{value}</div>
        </div>
    )
}

function HitLocation({ label, count, total, color }: any) {
    const percent = Math.round((count / total) * 100) || 0;
    return (
        <div className="bg-bg-secondary/30 p-3 rounded-xl border border-white/5 text-center">
            <div className="text-xs text-text-muted uppercase font-bold mb-1">{label}</div>
            <div className="text-xl font-bold text-text-primary mb-1">{count}</div>
            <div className="text-[10px] text-text-muted">({percent}%)</div>
            <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
            </div>
        </div>
    )
}
