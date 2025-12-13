// src/widgets/products/ProductsGrid.tsx
import React, { useEffect, useMemo, useState } from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";
import {
    fetchProjectsByLanguage,
    ProjectRow,
} from "../../shared/api/projects";

export const ProductsGrid: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].products;

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 언어 바뀔 때마다 Supabase에서 다시 로드
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProjectsByLanguage({ language });
                if (!cancelled) {
                    setProjects(data);
                }
            } catch (e) {
                if (!cancelled) {
                    console.error(e);
                    setError(
                        language === "ko"
                            ? "프로젝트를 불러오는 중 오류가 발생했습니다."
                            : "プロジェクトの取得中にエラーが発生しました。"
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [language]);

    const filteredProjects = useMemo(() => {
        const lower = keyword.toLowerCase();
        if (!lower) return projects;

        return projects.filter((p) => {
            const target =
                `${p.name} ${p.period ?? ""} ${p.role ?? ""} ${p.description} ${(p.tags ?? []).join(" ")
                }`;
            return target.toLowerCase().includes(lower);
        });
    }, [projects, keyword]);

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

                {/* 검색 입력 */}
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            padding: "8px 12px",
                            borderRadius: 8,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            width: "100%",
                            maxWidth: 320,
                        }}
                    />
                </div>

                {/* 로딩/에러 상태 표시 */}
                {loading && (
                    <p style={{ fontSize: 13, color: "#6b7280" }}>
                        {language === "ko" ? "불러오는 중..." : "読み込み中..."}
                    </p>
                )}

                {error && (
                    <p style={{ fontSize: 13, color: "#ef4444", marginBottom: 8 }}>
                        {error}
                    </p>
                )}

                {/* 결과 개수 */}
                <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                    {language === "ko"
                        ? `검색 결과: ${filteredProjects.length}개`
                        : `検索結果: ${filteredProjects.length}件`}
                </p>

                {/* 카드 목록 */}
                <div className="card-grid products-grid">
                    {filteredProjects.map((p) => (
                        <article key={p.id} className="card">
                            <h3>{p.name}</h3>
                            {p.period && <p className="project-period">{p.period}</p>}
                            {p.role && <p className="project-role">{p.role}</p>}
                            <p>{p.description}</p>
                            <div className="pill-row">
                                {(p.tags ?? []).map((tag) => (
                                    <span key={tag} className="pill">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
