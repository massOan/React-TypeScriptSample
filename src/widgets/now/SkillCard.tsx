// src/widgets/now/SkillCard.tsx
import React, { useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { Skill } from "./types";

// Geometric Patterns
const GeometricPattern: React.FC<{ type: number; color: string }> = ({ type, color }) => {
    switch (type % 3) {
        case 0: // Waves
            return (
                <svg width="120" height="120" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
                    <path d="M0 100 Q 25 50 50 100 T 100 100" fill="none" stroke={color} strokeWidth="2" />
                    <path d="M10 100 Q 35 40 60 100 T 110 100" fill="none" stroke={color} strokeWidth="2" style={{ opacity: 0.7 }} />
                    <path d="M20 100 Q 45 30 70 100 T 120 100" fill="none" stroke={color} strokeWidth="2" style={{ opacity: 0.4 }} />
                    <path d="M30 100 Q 55 20 80 100 T 130 100" fill="none" stroke={color} strokeWidth="2" style={{ opacity: 0.2 }} />
                </svg>
            );
        case 1: // Dots
            return (
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
                    {Array.from({ length: 25 }).map((_, i) => {
                        const x = (i % 5) * 20 + 10;
                        const y = Math.floor(i / 5) * 20 + 10;
                        const r = (i % 3) + 2;
                        return <circle key={i} cx={x} cy={y} r={r} fill={color} />;
                    })}
                </svg>
            );
        case 2: // Lines
            return (
                <svg width="120" height="120" viewBox="0 0 100 100" style={{ opacity: 0.15 }}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line key={i} x1={0} y1={100 - i * 10} x2={100 - i * 10} y2={100} stroke={color} strokeWidth="3" />
                    ))}
                </svg>
            );
        default:
            return null;
    }
};

type SkillCardProps = {
    skill: Skill;
};

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    const { language } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClick = () => setIsFlipped(!isFlipped);

    const patternType = skill.name.length;
    const description = language === "ja" ? skill.descriptionJa : skill.descriptionKo;

    return (
        <div
            style={{
                perspective: "1000px",
                width: "100%",
                aspectRatio: "1/1",
            }}
        >
            <div
                onClick={handleClick}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                    transform: isFlipped
                        ? "rotateY(180deg)"
                        : isHovered
                            ? "translateY(-5px)"
                            : "translateY(0)",
                    cursor: "pointer",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* --- FRONT SIDE --- */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        background: "#ffffff",
                        borderRadius: 16,
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #e5e7eb",
                        boxShadow: isHovered
                            ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)"
                            : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                        overflow: "hidden",
                    }}
                >
                    {/* Top Row: Icon Box & Date/Meta */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "auto" }}>
                        <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: `${skill.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `1px solid ${skill.color}30`
                        }}>
                            <img
                                src={skill.icon}
                                alt={skill.name}
                                style={{
                                    width: "60%",
                                    height: "60%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                        <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "monospace", fontWeight: 600 }}>
                            {skill.years} YEARS EXP
                        </span>
                    </div>

                    {/* Middle: Title */}
                    <div style={{ zIndex: 1, marginTop: 24 }}>
                        <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4, fontWeight: 500 }}>
                            {language === "ja" ? "スキル" : "Main Skill"}
                        </div>
                        <h4 style={{
                            margin: 0,
                            fontSize: 24,
                            fontWeight: 800,
                            color: "#111827",
                            lineHeight: 1.2
                        }}>
                            {skill.name}
                        </h4>
                    </div>

                    {/* Bottom: Info & Pattern */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginTop: 32
                    }}>
                        <div style={{ zIndex: 1 }}>
                            <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>Rank</div>
                            <div style={{ color: skill.color, fontWeight: 700, marginTop: 2, fontSize: 16 }}>
                                {skill.level}
                            </div>
                        </div>

                        <div style={{
                            position: "absolute",
                            bottom: -10,
                            right: -10,
                            pointerEvents: "none",
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                            transition: "transform 0.5s ease"
                        }}>
                            <GeometricPattern type={patternType} color={skill.color} />
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "#ffffff",
                        borderRadius: 16,
                        padding: 24,
                        display: "flex",
                        flexDirection: "column",
                        border: `1px solid ${skill.color}30`,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                    }}
                >
                    {/* Background Glow Effect */}
                    <div style={{
                        position: "absolute",
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
                        background: skill.color,
                        opacity: 0.05,
                        borderRadius: "50%",
                        filter: "blur(40px)",
                    }} />

                    <h4 style={{ color: skill.color, fontSize: 18, marginBottom: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: skill.color, display: "inline-block" }} />
                        {skill.name}
                    </h4>
                    <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, flex: 1 }}>
                        {description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {skill.tags.map((tag) => (
                            <span key={tag} style={{
                                fontSize: 11,
                                fontWeight: 600,
                                padding: "4px 8px",
                                background: "#f3f4f6",
                                border: `1px solid ${skill.color}20`,
                                color: skill.color,
                                borderRadius: 6
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
