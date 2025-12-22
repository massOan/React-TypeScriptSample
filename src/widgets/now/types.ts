// src/widgets/now/types.ts

export type SkillLevel = "A" | "B" | "C" | "D";

export type Skill = {
    name: string;
    years: number;
    level: SkillLevel;
    color: string;
    icon: string;
    descriptionKo: string;
    descriptionJa: string;
    tags: string[];
};

export type SkillCategory = {
    id: number;
    title: string;
    titleKo: string;
    titleJa: string;
    skills: Skill[];
};
