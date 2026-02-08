"use client";

import { useMemo } from "react";
import { Match } from "@/types";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";

interface MapPerformanceChartProps {
    matches: Match[];
}

export default function MapPerformanceChart({ matches }: MapPerformanceChartProps) {
    const data = useMemo(() => {
        const mapStats: Record<string, { wins: number; total: number; kills: number; deaths: number }> = {};

        matches.forEach((match) => {
            if (!mapStats[match.map]) {
                mapStats[match.map] = { wins: 0, total: 0, kills: 0, deaths: 0 };
            }
            mapStats[match.map].total += 1;
            if (match.result === "Won") {
                mapStats[match.map].wins += 1;
            }
            mapStats[match.map].kills += match.kills;
            mapStats[match.map].deaths += match.deaths;
        });

        return Object.keys(mapStats).map((map) => {
            const stats = mapStats[map];
            return {
                name: map,
                winRate: Math.round((stats.wins / stats.total) * 100),
                kdRatio: parseFloat((stats.kills / stats.deaths).toFixed(2)),
            };
        }).sort((a, b) => b.winRate - a.winRate);
    }, [matches]);

    return (
        <div className="tactical-frame p-8 shadow-2xl relative overflow-hidden group show-notches">
            <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none" />
            <h3 className="text-xs font-black mb-10 text-text-muted uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-4 h-[1px] bg-accent-red" />
                Strategic Map Analysis ///
            </h3>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 0,
                            left: -20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border-color)"
                            vertical={false}
                            opacity={0.2}
                        />


                        <XAxis
                            dataKey="name"
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            interval={0}
                            dy={10}
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="var(--text-muted)"
                            tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
                                padding: '12px',
                            }}
                            itemStyle={{ color: 'var(--text-secondary)', padding: '2px 0' }}
                            labelStyle={{ color: 'var(--text-primary)', fontWeight: 'black', marginBottom: '8px', fontSize: '11px', letterSpacing: '0.05em' }}
                            cursor={{ fill: 'var(--bg-secondary)', opacity: 0.15 }}
                            content={({ active, payload, label }) => {
                                if (active && payload && payload.length) {
                                    const winRate = payload.find(p => p.dataKey === 'winRate')?.value;
                                    const kdRatio = payload.find(p => p.dataKey === 'kdRatio')?.value;
                                    return (
                                        <div className="bg-bg-card border border-border-color rounded-xl p-4 shadow-2xl backdrop-blur-md">
                                            <div className="text-[10px] font-mono text-accent-red font-black uppercase tracking-[0.2em] mb-3 border-b border-border-color pb-2">
                                                {label} /// Analysis
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center gap-6">
                                                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Win Rate</span>
                                                    <span className="text-sm font-black text-accent-green italic">{winRate}%</span>
                                                </div>
                                                <div className="flex justify-between items-center gap-6">
                                                    <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">K/D Ratio</span>
                                                    <span className="text-sm font-black text-accent-cyan italic">{kdRatio}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />


                        <Legend
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            wrapperStyle={{ paddingBottom: '24px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.8 }}
                        />
                        <Bar
                            yAxisId="left"
                            dataKey="winRate"
                            name="Win Rate %"
                            fill="#84CC16"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={32}
                            isAnimationActive={true}
                            animationDuration={400}
                            animationEasing="ease-out"
                        />
                        <Bar
                            yAxisId="right"
                            dataKey="kdRatio"
                            name="K/D Ratio"
                            fill="#DC2626"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={32}
                            isAnimationActive={true}
                            animationDuration={450}
                            animationEasing="ease-out"
                        />




                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
