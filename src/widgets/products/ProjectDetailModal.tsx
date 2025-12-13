// src/widgets/products/ProjectDetailModal.tsx
import React from "react";
import { CommonModal } from "../../shared/ui/CommonModal";
import { useLanguage } from "../../shared/context/LanguageContext";
import type { ProjectRow } from "../../shared/api/projects";

type ProjectDetailModalProps = {
    open: boolean;
    project: ProjectRow | null;
    onClose: () => void;
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    open,
    project,
    onClose,
}) => {
    const { language } = useLanguage();

    // 선택된 프로젝트가 없으면 아무것도 렌더링하지 않음
    if (!project) {
        return null;
    }

    const footer = (
        <>
            <button type="button" className="btn-ghost" onClick={onClose}>
                {language === "ko" ? "닫기" : "閉じる"}
            </button>
        </>
    );

    return (
        <CommonModal
            open={open}
            onClose={onClose}
            title={project.name}
            description={project.period ?? ""} // null일 경우 빈 문자열
            size="md"
            footer={footer}
        >
            {project.role && (
                <p
                    style={{
                        fontSize: 13,
                        color: "#4b5563",
                        fontWeight: 500,
                        marginBottom: 12,
                    }}
                >
                    {project.role}
                </p>
            )}

            <p style={{ marginBottom: 16 }}>{project.description}</p>

            <h4
                style={{
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 6,
                }}
            >
                {language === "ko" ? "사용 기술" : "使用技術"}
            </h4>

            <div className="pill-row">
                {(project.tags ?? []).map((tech) => (
                    <span key={tech} className="pill">
                        {tech}
                    </span>
                ))}
            </div>
        </CommonModal>
    );
};
