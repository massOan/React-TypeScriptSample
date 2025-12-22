// src/widgets/now/SkillCategorySection.tsx
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import { SkillCard } from "./SkillCard";
import type { SkillCategory } from "./types";

type SkillCategorySectionProps = {
    category: SkillCategory;
};

export const SkillCategorySection: React.FC<SkillCategorySectionProps> = ({ category }) => {
    const { language } = useLanguage();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const categoryTitle = language === "ja" ? category.titleJa : category.titleKo;

    return (
        <div style={{ position: "relative" }}>
            {/* Category Header */}
            <h3
                style={{
                    margin: "0 0 20px 0",
                    fontSize: 24,
                    fontWeight: 700,
                    color: "#111827",
                    display: "flex",
                    alignItems: "center",
                    gap: 12
                }}
            >
                <div style={{ width: 4, height: 24, background: "#3b82f6", borderRadius: 2 }} />
                {categoryTitle}
                <span style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "#52525b",
                    marginLeft: "auto",
                    display: showRightArrow || showLeftArrow ? "block" : "none"
                }}>
                    SCROLL {">>>"}
                </span>
            </h3>

            {/* Scroll Container Wrapper */}
            <div style={{ position: "relative", margin: "0 -20px", padding: "0 20px" }}>

                {/* Left Arrow Button - Minimal Style */}
                {showLeftArrow && (
                    <div
                        onClick={() => scroll("left")}
                        style={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 10,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "#ffffff",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#374151",
                            fontSize: 16,
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >‹</div>
                    </div>
                )}

                {/* Right Arrow Button - Minimal Style */}
                {showRightArrow && (
                    <div
                        onClick={() => scroll("right")}
                        style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: 10,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "#ffffff",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#374151",
                            fontSize: 16,
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >›</div>
                    </div>
                )}

                {/* Skills Row - Horizontal Scroll */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    style={{
                        display: "flex",
                        gap: "24px",
                        overflowX: "auto",
                        padding: "20px 4px",
                        scrollBehavior: "smooth",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    className="no-scrollbar"
                >
                    <style>{`
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {category.skills.map((skill) => (
                        <div
                            key={skill.name}
                            style={{
                                flex: "0 0 280px",
                                width: "280px",
                            }}
                        >
                            <SkillCard skill={skill} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
