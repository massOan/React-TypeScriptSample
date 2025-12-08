import React from "react";

const FEATURES = [
    {
        title: "Clean Header",
        description: "로고 + 탭 5개 + 로그인 버튼 구성의 심플한 헤더입니다.",
    },
    {
        title: "Hero Section",
        description: "타이틀과 버튼을 배치하여 주요 액션을 유도합니다.",
    },
    {
        title: "Content Cards",
        description: "서비스/제품/기능 등을 카드로 나누어 소개할 수 있습니다.",
    },
];

export const HomeFeatures: React.FC = () => {
    return (
        <section className="section">
            <div className="container">
                <h2 className="section-title">Features</h2>
                <p className="section-subtitle">
                    간단한 3개의 카드로 핵심 내용을 보여줍니다.
                </p>
                <div className="card-grid">
                    {FEATURES.map((feature) => (
                        <article key={feature.title} className="card">
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
