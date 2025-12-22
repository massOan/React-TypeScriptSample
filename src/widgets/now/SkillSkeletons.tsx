// src/widgets/now/SkillSkeletons.tsx
import React from "react";

export const SkillCardSkeleton: React.FC = () => (
    <div
        style={{
            flex: "0 0 280px",
            width: "280px",
            aspectRatio: "1/1",
            background: "#f3f4f6",
            borderRadius: 16,
            animation: "pulse 1.5s infinite",
        }}
    />
);

export const SkillCategorySkeleton: React.FC = () => (
    <div style={{ marginBottom: 48 }}>
        <div
            style={{
                width: 150,
                height: 28,
                background: "#e5e7eb",
                borderRadius: 6,
                marginBottom: 20,
            }}
        />
        <div style={{ display: "flex", gap: 24 }}>
            <SkillCardSkeleton />
            <SkillCardSkeleton />
            <SkillCardSkeleton />
        </div>
        <style>{`
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `}</style>
    </div>
);
