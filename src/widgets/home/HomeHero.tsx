import React from "react";

export const HomeHero: React.FC = () => {
    return (
        <section className="hero">
            <div className="container hero-inner">
                <div>
                    <h1>Simple Web UI Mock</h1>
                    <p>
                        상단에 탭 5개가 있는 기본 웹 페이지 레이아웃입니다.
                        이 구조를 기반으로 React + TypeScript로 쉽게 확장할 수 있습니다.
                    </p>
                    <div className="hero-actions">
                        <button className="btn-primary">Get Started</button>
                        <button className="btn-ghost">Learn More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
