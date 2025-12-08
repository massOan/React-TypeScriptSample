export type Product = {
    name: string;
    description: string;
    tags: string[];
};

export const PRODUCTS: Product[] = [
    {
        name: "Mobile App",
        description: "iOS / Android용 네이티브 앱 개발.",
        tags: ["React Native", "Kotlin", "Swift"],
    },
    {
        name: "Web Frontend",
        description: "React + TypeScript 기반 SPA 개발.",
        tags: ["React", "TypeScript", "SPA"],
    },
    {
        name: "Design System",
        description: "재사용 가능한 UI 컴포넌트 라이브러리 구축.",
        tags: ["UI Library", "Storybook"],
    },
];
