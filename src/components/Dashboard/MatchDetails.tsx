import { Match } from "@/types";
import { X, Trophy, Skull, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import BodyHitChart from "./BodyHitChart";

interface MatchDetailsProps {
    match: Match;
    isOpen: boolean;
    onClose: () => void;
}

const MAP_UUIDS: Record<string, string> = {
    "Ascent": "7eaecc1b-4337-bbf6-6ab9-04b8f06b3319",
    "Bind": "2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba",
    "Breeze": "2fb9a4fd-47b8-4e7d-a969-74b4046ebd53",
    "Fracture": "b529448b-4d60-346e-e89e-00a4c527a405",
    "Haven": "2bee0dc9-4ffe-519b-1cbd-7fbe763a6047",
    "Icebox": "e2ad5c54-4114-a870-9641-8ea21279579a",
    "Lotus": "2fe4ed3a-450a-948b-6d6b-e89a78e680a9",
    "Pearl": "fd267378-4d1d-484f-ff52-77821ed10dc2",
    "Split": "d960549e-485c-e861-8d71-aa9d1aed12a2",
    "Sunset": "92584fbe-486a-b1b2-9faa-39b0f486b498",
    "Abyss": "224b0a95-48b9-f703-1bd8-67aca101a61f",
    "Corrode": "1c18ab1f-420d-0d8b-71d0-77ad3c439115",
};

export default function MatchDetails({ match, isOpen, onClose }: MatchDetailsProps) {
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen && match) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 1200);
            return () => clearTimeout(timer);
        }
    }, [isOpen, match?.match_id]);



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

    const mapId = MAP_UUIDS[match.map] || MAP_UUIDS["Haven"]; // Fallback to Haven

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
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative w-full max-w-2xl tactical-frame shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >


                        {/* Header */}
                        <div className="relative h-40 bg-bg-secondary overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent z-10" />
                            {/* Map Image Background with Dynamic UUID */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={`https://media.valorant-api.com/maps/${mapId}/splash.png`}
                                    alt={match.map}
                                    fill
                                    className="object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
                                    priority
                                />
                            </div>

                            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-accent-red rounded-full text-white transition-colors cursor-pointer">
                                <X size={20} />
                            </button>

                            <div className="absolute bottom-6 left-8 z-20">
                                <div className="text-[10px] font-mono text-accent-red font-black uppercase tracking-[0.4em] mb-2 opacity-80">/// Mission Protocol</div>
                                <div className="flex items-end gap-6">
                                    <div className={`text-5xl font-black italic tracking-tighter ${match.result === 'Won' ? 'text-accent-green' : 'text-accent-red'}`}>
                                        {match.result.toUpperCase()}
                                    </div>
                                    <div className="text-text-primary font-black text-xl mb-1 uppercase tracking-tight">
                                        {match.map} <span className="text-text-primary/40 mx-2">|</span> {match.agent}
                                    </div>

                                </div>
                            </div>
                        </div>


                        {/* Content Overlay / Loading State */}
                        <AnimatePresence>
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-40 bg-bg-primary/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4"
                                >
                                    <div className="relative w-64 h-1 bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            className="absolute inset-0 bg-accent-red shadow-[0_0_10px_#ff4655]"
                                        />
                                    </div>
                                    <div className="text-[10px] font-mono text-accent-red animate-pulse tracking-[0.5em] uppercase">
                                        /// Decoding_Match_Data_V3 ///
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Content */}
                        <div className={`p-4 md:p-8 space-y-6 md:space-y-8 transition-all duration-500 ${isLoading ? 'blur-xl scale-110' : 'blur-0 scale-100'}`}>

                            {/* Key Stats Row */}
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
                                }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
                            >
                                <StatBox label="Combat Score" value={match.ACS} icon={Zap} color="text-yellow-400" />
                                <StatBox label="K / D / A" value={`${match.kills} / ${match.deaths} / ${match.assists}`} icon={Trophy} color="text-text-primary" />
                                <StatBox label="KD Ratio" value={match.kd_ratio} icon={Target} color={match.kd_ratio >= 1 ? "text-accent-cyan" : "text-accent-red"} />
                                <StatBox label="Headshot %" value={`${match.headshot_percentage}%`} icon={Skull} color="text-accent-purple" />
                            </motion.div>


                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="grid md:grid-cols-2 gap-8"
                            >
                                {/* Damage Stats */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-white/10 pb-2">Combat Reporting</h3>
                                    <div className="flex justify-between items-center p-3 bg-bg-secondary/20 rounded-lg hover:bg-white/5 transition-colors">
                                        <span className="text-text-muted">Total Damage Dealt</span>
                                        <span className="text-text-primary font-mono font-bold">{match.damage_made.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-bg-secondary/20 rounded-lg hover:bg-white/5 transition-colors">
                                        <span className="text-text-muted">Total Damage Received</span>
                                        <span className="text-text-primary font-mono font-bold">{match.damage_received.toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Accuracy Stats */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-text-secondary border-b border-white/10 pb-2">Hit Accuracy</h3>
                                    <div className="h-[300px] w-full bg-bg-secondary/10 rounded-xl p-4 border border-white/5 relative overflow-hidden group/chart">
                                        <div className="absolute top-2 right-2 text-xs text-text-muted flex flex-col items-end gap-1 z-10 transition-opacity opacity-50 group-hover/chart:opacity-100">
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-cyan"></span> Head</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> Body</span>
                                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent-red"></span> Legs</span>
                                        </div>
                                        <BodyHitChart
                                            head={match.headshots}
                                            body={match.bodyshots}
                                            legs={match.legshots}
                                        />
                                    </div>
                                </div>
                            </motion.div>


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
        <motion.div
            variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
            }}
            whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
            className="tactical-frame p-4 transition-colors cursor-default"
        >
            <div className={`flex items-center gap-2 mb-2 ${color} opacity-80`}>
                <Icon size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
            </div>
            <div className={`text-2xl font-black italic tracking-tighter ${color}`}>{value}</div>
        </motion.div>
    )
}




