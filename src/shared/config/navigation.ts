export type TabId = "home" | "products" | "pricing" | "blog" | "contact";

export type Tab = {
    id: TabId;
    label: string;
};

export const TABS: Tab[] = [
    { id: "home", label: "Home" },
    { id: "products", label: "Products" },
    { id: "pricing", label: "Pricing" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" },
];

export const DEFAULT_TAB_ID: TabId = "home";