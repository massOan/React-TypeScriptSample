import React from "react";

export const ContactForm: React.FC = () => {
    return (
        <section className="section section-muted">
            <div className="container">
                <h2 className="section-title">Contact</h2>
                <p className="section-subtitle">
                    문의 폼은 아직 준비 중입니다. 나중에 이메일 전송 기능을 붙이거나,
                    외부 서비스와 연동할 수 있습니다.
                </p>

                <div className="card">
                    <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                        예: 간단한 이름/이메일/메시지 입력 폼을 넣고, 제출 시 백엔드로
                        전송하도록 구현할 수 있습니다.
                    </p>
                </div>
            </div>
        </section>
    );
};
