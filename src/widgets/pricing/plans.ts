export type Plan = {
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
};

export const PLANS: Plan[] = [
    {
        name: "Starter",
        price: "Free",
        description: "개인 포트폴리오나 사이드 프로젝트용.",
        features: ["단일 페이지", "기본 컴포넌트", "이메일 문의"],
    },
    {
        name: "Pro",
        price: "¥4,000 / month",
        description: "작은 팀/스타트업용.",
        features: ["다중 페이지", "컴포넌트 라이브러리", "우선 지원"],
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Contact us",
        description: "커스텀 요구사항이 많은 기업용.",
        features: ["맞춤형 설계", "장기 유지보수", "전담 담당자"],
    },
];
