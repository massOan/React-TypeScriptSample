// src/widgets/header/Header.tsx
import React from "react";
import { TabId, TABS } from "../../shared/config/navigation";
import { LANGUAGE_OPTIONS, Language } from "../../shared/config/i18n";
import { useLanguage } from "../../shared/context/LanguageContext";

type HeaderProps = {
    activeTabId: TabId;
    onTabChange: (id: TabId) => void;
};

export const NAV_LABELS: Record<Language, Record<TabId, string>> = {
    ko: {
        home: "홈 / 소개",
        products: "프로젝트",
        pricing: "강점 & 제공가치",
        blog: "노트 / 블로그",
        contact: "연락처",
    },
    ja: {
        home: "ホーム / プロフィール",
        products: "プロジェクト",
        pricing: "強み・提供価値",
        blog: "ノート / ブログ",
        contact: "お問い合わせ",
    },
};

export const Header: React.FC<HeaderProps> = ({
    activeTabId,
    onTabChange,
}) => {
    const { language, setLanguage } = useLanguage(); // ✅ 여기서 꺼내씀

    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo">
                    <div className="logo-main">ikjun.dev</div>
                    <div className="logo-sub">Android × Web Engineer</div>
                </div>


                <nav className="nav-tabs">
                    {TABS.map((tab) => {
                        const label = NAV_LABELS[language][tab.id];
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                className={`tab ${activeTabId === tab.id ? "active" : ""}`}
                                onClick={() => onTabChange(tab.id)}
                            >
                                {label}
                            </button>
                        );
                    })}
                </nav>

                <div className="lang-switch">
                    {LANGUAGE_OPTIONS.map((opt) => (
                        <button
                            key={opt.id}
                            type="button"
                            className={
                                "lang-btn" + (language === opt.id ? " lang-btn-active" : "")
                            }
                            onClick={() => setLanguage(opt.id)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>
        </header>
    );
};
