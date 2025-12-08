// src/widgets/blog/posts.ts
export type Post = {
    id: number;
    title: string;
    date: string;
    summary: string;
};

export const POSTS: Post[] = [
    {
        id: 1,
        title: "React + TypeScript로 포트폴리오 만들기",
        date: "2025-01-10",
        summary:
            "컴포넌트 분리와 타입 설계를 어떻게 하면 좋은지, 개인 프로젝트 기준으로 정리했습니다.",
    },
    {
        id: 2,
        title: "모바일과 웹 프론트엔드 모두 다루는 방법",
        date: "2025-02-02",
        summary:
            "Android / iOS 경험을 웹 프론트엔드로 확장하는 과정에서 배운 점들을 공유합니다.",
    },
    {
        id: 3,
        title: "UI/UX를 개선할 때 중요한 지표들",
        date: "2025-03-15",
        summary:
            "화면 전환 시간, 이탈률, 클릭률 등 어떤 지표를 보고 개선을 진행했는지 소개합니다.",
    },
];
