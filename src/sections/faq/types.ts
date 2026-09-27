export type FaqCategory = "all" | "seekers" | "employers" | "general" | "visas";

export type FaqItem = {
  category: Exclude<FaqCategory, "all">;
  q: string;
  a: string;
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  "all",
  "seekers",
  "employers",
  "general",
  "visas",
];
