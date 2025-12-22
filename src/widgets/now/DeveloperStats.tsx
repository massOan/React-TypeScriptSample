// src/widgets/now/DeveloperStats.tsx
import React, { useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { SkillCategory } from "./types";

type DeveloperStatsProps = {
    categories: SkillCategory[];
};

export const DeveloperStats: React.FC<DeveloperStatsProps> = ({ categories }) => {
    const { language } = useLanguage();
    const [showTooltip, setShowTooltip] = useState(false);

    const allSkills = categories.flatMap((c) => c.skills);
    const totalSkills = allSkills.length;

    if (totalSkills === 0) return null;

    // Calculate total level points (A=5, B=4, C=3, D=2)
    const pointsMap: Record<string, number> = { "A": 5, "B": 4, "C": 3, "D": 2 };
    const totalLevel = allSkills.reduce((acc, skill) => acc + (pointsMap[skill.level] || 0), 0);
    const avgLevel = (totalLevel / totalSkills).toFixed(1);
    const maxExp = Math.max(...allSkills.map((s) => s.years));

    // 가장 스킬이 많은 카테고리 찾기
    const mainClass = categories.reduce((prev, current) =>
        (prev.skills.length > current.skills.length) ? prev : current
    );

    const stats = [
        {
            label: language === "ja" ? "メインクラス" : "Main Class",
            value: language === "ja" ? mainClass.titleJa : mainClass.titleKo,
            sub: `${mainClass.skills.length} Skills`,
            color: "#ec4899",
        },
        {
            label: language === "ja" ? "スキル数" : "Total Skills",
            value: totalSkills,
            sub: "Active",
            color: "#10b981",
        },
        {
            label: language === "ja" ? "最大経験年数" : "Max Exp",
            value: `${maxExp} Years`,
            sub: "Junior",
            color: "#f59e0b",
        },
    ];

    return (
        <div
            style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 24,
                marginBottom: 48,
                background: "#ffffff",
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
                border: "1px solid #e5e7eb",
            }}
        >
            {/* Tooltip Icon */}
            <div
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "#f3f4f6",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    cursor: "help",
                    fontWeight: 700,
                    transition: "all 0.2s ease",
                    zIndex: 20,
                    boxShadow: showTooltip ? "0 0 0 2px #d1d5db" : "none"
                }}
            >
                ?
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes tooltipPop {
                    0% { opacity: 0; transform: scale(0.9) translateY(5px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>

            {/* Tooltip UI */}
            {showTooltip && (
                <div style={{
                    position: "absolute",
                    top: 50,
                    right: 0,
                    width: 260,
                    background: "rgba(17, 24, 39, 0.95)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    zIndex: 30,
                    animation: "tooltipPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                    color: "white"
                }}>
                    <div style={{
                        position: "absolute",
                        top: -6,
                        right: 19,
                        width: 12,
                        height: 12,
                        background: "rgba(17, 24, 39, 0.95)",
                        transform: "rotate(45deg)",
                        borderLeft: "1px solid rgba(255,255,255,0.1)",
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                    }} />
                    <h5 style={{ margin: "0 0 12px 0", fontSize: 13, fontWeight: 700, color: "#f3f4f6", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
                        {language === "ja" ? "スキルランク定義 (Skill Rank)" : "스킬 랭크 정의 (Skill Rank)"}
                    </h5>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11, color: "#d1d5db" }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ color: "#fbbf24", fontWeight: 700, minWidth: 24 }}>A</span>
                            <span>
                                {language === "ja"
                                    ? "専門的な知識があり、開発経験が豊富 (最上)"
                                    : "전문적인 지식이 있고, 개발 경험이 풍부함 (최상)"}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ color: "#fbbf24", fontWeight: 700, minWidth: 24 }}>B</span>
                            <span>
                                {language === "ja"
                                    ? "専門的な知識があり、問題なく使いこなすことができる (上)"
                                    : "전문적인 지식이 있고, 문제없이 사용할 수 있음 (상)"}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ color: "#fbbf24", fontWeight: 700, minWidth: 24 }}>C</span>
                            <span>
                                {language === "ja"
                                    ? "開発に必要な基本的な知識があり、使用経験もある (中)"
                                    : "개발에 필요한 기본 지식이 있고, 사용 경험도 있음 (중)"}
                            </span>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <span style={{ color: "#fbbf24", fontWeight: 700, minWidth: 24 }}>D</span>
                            <span>
                                {language === "ja"
                                    ? "基本的な知識があるが、開発経験はない (下)"
                                    : "기본적인 지식은 있으나, 개발 경험은 없음 (하)"}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: 12,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            color: "#6b7280",
                            marginBottom: 8,
                            fontWeight: 600,
                        }}
                    >
                        {stat.label}
                    </span>
                    <span
                        style={{
                            fontSize: 24,
                            fontWeight: 800,
                            color: "#111827",
                        }}
                    >
                        {stat.value}
                    </span>
                    <span
                        style={{
                            fontSize: 11,
                            color: stat.color,
                            marginTop: 4,
                            fontWeight: 500,
                        }}
                    >
                        {stat.sub}
                    </span>
                </div>
            ))}
        </div>
    );
};
