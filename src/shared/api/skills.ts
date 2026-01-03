// src/shared/api/skills.ts
// REST API 스타일 + API Response 패턴 래핑

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY!;

// 공통 헤더
const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
};

// ============================================
// API Response 타입 정의
// ============================================
export type ApiResponse<T> = {
    success: boolean;
    data: T | null;
    error: string | null;
    status: number;
};

// ============================================
// 데이터 타입 정의
// ============================================
export type SkillCategoryRow = {
    id: number;
    title: string;
    title_ko: string | null;
    title_ja: string | null;
    display_order: number;
};

export type SkillRow = {
    id: number;
    category_id: number;
    name: string;
    years: number;
    level: "A" | "B" | "C" | "D";
    color: string;
    icon_url: string | null;
    description_ko: string | null;
    description_ja: string | null;
    tags: string[] | null;           // deprecated, 마이그레이션 후 제거 예정
    tags_ko: string[] | null;
    tags_ja: string[] | null;
    display_order: number;
    is_active: boolean;
};

export type SkillCategoryWithSkills = {
    id: number;
    title: string;
    title_ko: string | null;
    title_ja: string | null;
    display_order: number;
    skills: SkillRow[];
};

// ============================================
// API 함수
// ============================================

/**
 * 모든 카테고리 조회 (REST API + Response 래핑)
 */
export async function fetchSkillCategories(): Promise<ApiResponse<SkillCategoryRow[]>> {
    const url = `${SUPABASE_URL}/rest/v1/skill_categories?order=display_order.asc`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                data: null,
                error: `카테고리 조회 실패: ${errorText}`,
                status: response.status,
            };
        }

        const data: SkillCategoryRow[] = await response.json();
        return {
            success: true,
            data,
            error: null,
            status: response.status,
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err instanceof Error ? err.message : '알 수 없는 오류',
            status: 0,
        };
    }
}

/**
 * 모든 활성 스킬 조회 (REST API + Response 래핑)
 */
export async function fetchSkills(): Promise<ApiResponse<SkillRow[]>> {
    const url = `${SUPABASE_URL}/rest/v1/skills?is_active=eq.true&order=display_order.asc`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return {
                success: false,
                data: null,
                error: `스킬 조회 실패: ${errorText}`,
                status: response.status,
            };
        }

        const data: SkillRow[] = await response.json();
        return {
            success: true,
            data,
            error: null,
            status: response.status,
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err instanceof Error ? err.message : '알 수 없는 오류',
            status: 0,
        };
    }
}

/**
 * 카테고리별로 스킬을 그룹화해서 조회 (REST API + Response 래핑)
 */
export async function fetchSkillsGroupedByCategory(): Promise<ApiResponse<SkillCategoryWithSkills[]>> {
    try {
        // 카테고리와 스킬을 병렬로 조회
        const [categoriesRes, skillsRes] = await Promise.all([
            fetchSkillCategories(),
            fetchSkills(),
        ]);

        // 에러 체크
        if (!categoriesRes.success) {
            return {
                success: false,
                data: null,
                error: categoriesRes.error,
                status: categoriesRes.status,
            };
        }

        if (!skillsRes.success) {
            return {
                success: false,
                data: null,
                error: skillsRes.error,
                status: skillsRes.status,
            };
        }

        const categories = categoriesRes.data!;
        const skills = skillsRes.data!;

        // 카테고리별로 스킬 그룹화
        const grouped: SkillCategoryWithSkills[] = categories.map((category) => ({
            ...category,
            skills: skills
                .filter((skill) => skill.category_id === category.id)
                .sort((a, b) => a.display_order - b.display_order),
        }));

        return {
            success: true,
            data: grouped,
            error: null,
            status: 200,
        };
    } catch (err) {
        return {
            success: false,
            data: null,
            error: err instanceof Error ? err.message : '알 수 없는 오류',
            status: 0,
        };
    }
}
