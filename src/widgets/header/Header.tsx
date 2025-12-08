import React from "react";
import { TabId, TABS } from "../../shared/config/navigation";

type HeaderProps = {
    activeTabId: TabId;
    onTabChange: (id: TabId) => void;
};

export const Header: React.FC<HeaderProps> = ({
    activeTabId,
    onTabChange,
}) => {
    return (
        <header className="header">
            <div className="container header-inner">
                <div className="logo">MySite</div>

                <nav className="nav-tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={`tab ${activeTabId === tab.id ? "active" : ""}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <button className="btn-ghost">Sign In</button>
            </div>
        </header>
    );
};
