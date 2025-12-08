// src/shared/config/i18n.ts
export type Language = "ko" | "ja";

export const LANGUAGE_OPTIONS: { id: Language; label: string }[] = [
    { id: "ko", label: "한국어" },
    { id: "ja", label: "日本語" },
];

export const messages = {
    ko: {
        home: {
            heroTitle: "심플한 웹 UI 목업",
            heroDescription:
                "상단에 탭 5개가 있는 기본 웹 페이지 레이아웃입니다. 이 구조를 기반으로 React + TypeScript로 쉽게 확장할 수 있습니다.",
            featuresTitle: "기능 소개",
            featuresSubtitle: "간단한 카드 구성으로 핵심 기능을 소개합니다.",
        },
    },
    ja: {
        home: {
            heroTitle: "シンプルな Web UI モック",
            heroDescription:
                "上部に5つのタブがある基本的な Web ページレイアウトです。React と TypeScript をベースに簡単に拡張できます。",
            featuresTitle: "機能紹介",
            featuresSubtitle: "シンプルなカード構成で主な機能を紹介します。",
        },
    },
} as const;
