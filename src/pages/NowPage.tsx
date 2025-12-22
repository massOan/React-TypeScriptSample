// src/pages/NowPage.tsx
import React, { useEffect, useState } from "react";
import { useLanguage } from "../shared/context/LanguageContext";
import { messages } from "../shared/config/i18n";
import {
    fetchSkillsGroupedByCategory,
    type SkillCategoryWithSkills,
} from "../shared/api/skills";
import {
    DeveloperStats,
    SkillCategorySection,
    SkillCategorySkeleton,
    type SkillCategory,
} from "../widgets/now";

// Supabase 데이터를 UI 타입으로 변환하는 함수
function transformSkillData(data: SkillCategoryWithSkills[]): SkillCategory[] {
    return data.map((category) => ({
        id: category.id,
        title: category.title,
        titleKo: category.title_ko ?? category.title,
        titleJa: category.title_ja ?? category.title,
        skills: category.skills.map((skill) => ({
            name: skill.name,
            years: skill.years,
            level: skill.level,
            color: skill.color,
            icon: skill.icon_url ?? "",
            descriptionKo: skill.description_ko ?? "",
            descriptionJa: skill.description_ja ?? "",
            tags: skill.tags ?? [],
        })),
    }));
}

export const NowPage: React.FC = () => {
    const { language } = useLanguage();
    const t = (messages as any)[language]?.now;

    const [categories, setCategories] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadSkills = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchSkillsGroupedByCategory();

                if (!response.success || !response.data) {
                    throw new Error(response.error ?? '데이터 조회 실패');
                }

                setCategories(transformSkillData(response.data));
            } catch (err) {
                console.error("Failed to load skills:", err);
                setError(language === "ja"
                    ? "スキルデータの読み込みに失敗しました"
                    : "스킬 데이터를 불러오는데 실패했습니다");
            } finally {
                setLoading(false);
            }
        };

        loadSkills();
    }, [language]);

    return (
        <section className="section">
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: 40 }}>
                    <h2 className="section-title">{t?.title ?? "Skills"}</h2>
                    <p className="section-subtitle">
                        {language === "ko"
                            ? "기술 스택 및 경험을 확인하세요 - 카드를 클릭하여 상세 정보를 확인하세요"
                            : "技術スタックと経験をご確認ください - カードをクリックして詳細を確認"}
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div style={{
                        padding: 24,
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: 12,
                        color: "#dc2626",
                        textAlign: "center",
                        marginBottom: 32,
                    }}>
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
                        <SkillCategorySkeleton />
                        <SkillCategorySkeleton />
                    </div>
                ) : (
                    <>
                        {/* Developer Stats with Tooltip */}
                        <DeveloperStats categories={categories} />

                        {/* Skill Categories */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 48, paddingBottom: 48 }}>
                            {categories.map((category) => (
                                <SkillCategorySection key={category.id} category={category} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
