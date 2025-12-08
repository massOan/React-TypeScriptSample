// src/widgets/pricing/PricingPlans.tsx
import React from "react";

export const PricingPlans: React.FC = () => {
    return (
        <section className="section section-muted">
            <div className="container">
                <h2 className="section-title">Pricing</h2>
                <p className="section-subtitle">
                    아직 구체적인 플랜은 준비 중입니다. 나중에 요금 플랜 정보를 여기에
                    추가할 수 있습니다.
                </p>

                <div className="pricing-grid">
                    <article className="card pricing-card">
                        <h3>Coming soon</h3>
                        <p className="pricing-description">
                            이 영역은 요금 플랜, 서비스 플랜 등을 보여주기 위한 자리입니다.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};
