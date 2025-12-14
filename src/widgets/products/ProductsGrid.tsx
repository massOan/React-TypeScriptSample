// src/widgets/products/ProductsGrid.tsx
import React, { useEffect, useMemo, useState } from "react";
import { messages } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";
import { fetchProjectsByLanguage, ProjectRow } from "../../shared/api/projects";
import {
    fetchProjectDetailSections,
    Section,
} from "../../shared/api/projectDetails";
import { ProjectDetailModal } from "./ProjectDetailModal";

export const ProductsGrid: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].products;

    const [projects, setProjects] = useState<ProjectRow[]>([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // ✅ 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [selected, setSelected] = useState<ProjectRow | null>(null);

    // ✅ 디테일 데이터 상태
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailError, setDetailError] = useState<string | null>(null);
    const [detailSections, setDetailSections] = useState<Section[]>([]);

    // 언어 바뀔 때마다 Supabase에서 프로젝트 로드
    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProjectsByLanguage({ language });
                if (!cancelled) setProjects(data);
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
                if (!cancelled) setLoading(false);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [language]);

    // ✅ 모달 열릴 때 선택된 프로젝트의 디테일 로드
    useEffect(() => {
        let cancelled = false;

        const loadDetail = async () => {
            if (!modalOpen || !selected) return;

            setDetailLoading(true);
            setDetailError(null);
            setDetailSections([]);

            try {
                const sections = await fetchProjectDetailSections({
                    projectId: selected.id,
                });

                if (!cancelled) setDetailSections(sections);
            } catch (e) {
                if (!cancelled) {
                    console.error(e);
                    setDetailError(
                        language === "ko"
                            ? "상세 정보를 불러오는 중 오류가 발생했습니다."
                            : "詳細情報の取得中にエラーが発生しました。"
                    );
                }
            } finally {
                if (!cancelled) setDetailLoading(false);
            }
        };

        loadDetail();
        return () => {
            cancelled = true;
        };
    }, [modalOpen, selected, language]);

    const filteredProjects = useMemo(() => {
        const lower = keyword.toLowerCase();
        if (!lower) return projects;

        return projects.filter((p) => {
            const target = `${p.name} ${p.period ?? ""} ${p.role ?? ""} ${p.description
                } ${(p.tags ?? []).join(" ")}`;
            return target.toLowerCase().includes(lower);
        });
    }, [projects, keyword]);

    const openModal = (p: ProjectRow) => {
        setSelected(p);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelected(null);
        setDetailSections([]);
        setDetailError(null);
    };

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <p className="section-subtitle">{t.subtitle}</p>

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

                <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>
                    {language === "ko"
                        ? `검색 결과: ${filteredProjects.length}개`
                        : `検索結果: ${filteredProjects.length}件`}
                </p>

                <div className="card-grid products-grid">
                    {filteredProjects.map((p) => (
                        <article
                            key={p.id}
                            className="card"
                            role="button"
                            tabIndex={0}
                            onClick={() => openModal(p)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") openModal(p);
                            }}
                        >
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

                {/* ✅ 큰 모달 */}
                <ProjectDetailModal
                    open={modalOpen}
                    project={selected}
                    onClose={closeModal}
                    sections={detailSections}
                    loading={detailLoading}
                    error={detailError}
                    highlights={(selected?.tags ?? []).slice(0, 4)}
                />
            </div>
        </section>
    );
};
