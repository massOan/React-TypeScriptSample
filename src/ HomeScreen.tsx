// src/HomeScreen.tsx
import React from 'react';
import './HomeScreen.css';

const quickCards = [
    { id: 1, title: 'DUMMY', subtitle: '단말 점검' },
    { id: 2, title: 'DUMMY', subtitle: '백업 · 복원' },
    { id: 3, title: 'DUMMY', subtitle: '해외 로밍' },
];

export const HomeScreen: React.FC = () => {
    return (
        <div className="page">
            {/* 인사 영역 */}
            <section className="section">
                <div className="greeting-row">
                    <h1 className="greeting-title">익준님, 안녕하세요!</h1>
                    <button className="link-button" type="button">
                        전체 보기 &gt;
                    </button>
                </div>

                {/* 가로 스크롤 카드 */}
                <div className="quick-card-row">
                    {quickCards.map((card) => (
                        <div key={card.id} className="quick-card">
                            <div className="quick-card-main">{card.title}</div>
                            <div className="quick-card-sub">{card.subtitle}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 생활 패턴 추천 카드 */}
            <section className="section">
                <h2 className="section-title">익준님 생활 패턴에 맞춘 추천</h2>

                <article className="recommend-card">
                    <div className="recommend-body">
                        <h3 className="recommend-title">배터리 최적화</h3>
                        <p className="recommend-text">
                            배터리를 많이 쓰는 앱을 확인하고 사용 패턴을 조정해보세요.
                        </p>

                        <div className="tag-chip">#배터리관리</div>
                    </div>
                </article>
            </section>

            {/* 다음 섹션 타이틀만 예시 */}
            <section className="section">
                <h2 className="section-title">익준님께 추천하는 서비스</h2>
                {/* 여기 아래에 또 카드 리스트 넣으면 됨 */}
            </section>
        </div>
    );
};
