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
        <div className="tactical-frame p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
            <h3 className="text-xs font-black mb-8 text-accent-red uppercase tracking-[0.4em] flex items-center gap-3">
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
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />

                        <XAxis
                            dataKey="name"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            interval={0} // Force show all labels
                        />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                color: 'var(--text-primary)'
                            }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                            cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar yAxisId="left" dataKey="winRate" name="Win Rate %" fill="var(--accent-green)" radius={[2, 2, 0, 0]} maxBarSize={40} />
                        <Bar yAxisId="right" dataKey="kdRatio" name="K/D Ratio" fill="var(--accent-red)" radius={[2, 2, 0, 0]} maxBarSize={40} />

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
