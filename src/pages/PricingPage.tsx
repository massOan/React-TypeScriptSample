// src/pages/PricingPage.tsx
import React from "react";
import { useLanguage } from "../shared/context/LanguageContext";

export const PricingPage: React.FC = () => {
    const { language } = useLanguage();

    const title =
        language === "ko" ? "협업 방식 / 역할 소개 예정" : "Collaboration style (WIP)";
    const subtitle =
        language === "ko"
            ? "이 탭은 나중에 함께 일하는 방식이나 맡고 싶은 역할을 정리하는 용도로 사용할 예정입니다."
            : "This page will be used later to describe how I usually work in a team and which roles I like to take.";

    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">{title}</h2>
                <p className="section-subtitle">{subtitle}</p>

                <div
                    style={{
                        padding: 24,
                        borderRadius: 16,
                        border: "1px dashed #d1d5db",
                        background: "#f9fafb",
                        fontSize: 14,
                        color: "#4b5563",
                    }}
                >
                    {language === "ko"
                        ? "현재는 임시로 비워둔 상태입니다. 나중에 Android 메인 담당 / 크로스스택(Android+Web) / 멘토링 같은 협업 패턴을 카드 형태로 정리해 넣을 수 있습니다."
                        : "For now this page is intentionally simple. Later I plan to add cards describing patterns like Android lead, cross-stack (Android + Web), or mentoring / team support."}
                </div>
            </div>
        </section>
    );
};
