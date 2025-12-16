// src/widgets/footer/Footer.tsx
import React from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import { messages } from "../../shared/config/i18n";

export const Footer: React.FC = () => {
    const { language } = useLanguage();
    const t = messages[language].footer;
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-inner">
                <div className="footer-brand">
                    <div className="footer-title">{t.brand}</div>
                    <div className="footer-sub">{t.tagline}</div>
                </div>

                <div className="footer-links">
                    <a
                        className="footer-link"
                        href="https://github.com/massOan"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {t.links.github}
                    </a>
                    <span className="footer-dot">·</span>
                    <a className="footer-link" href="mailto:jang.ikjun1998@gmail.com">
                        {t.links.email}
                    </a>
                </div>

                <div className="footer-meta">
                    <div className="footer-built">{t.builtWith}</div>
                    <div className="footer-copy">
                        © {year} {t.brand}. {t.copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
};
