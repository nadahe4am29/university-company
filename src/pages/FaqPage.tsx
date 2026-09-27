import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import FaqList from "../sections/faq/FaqList";
import FaqToolbar from "../sections/faq/FaqToolbar";
import type { FaqCategory, FaqItem } from "../sections/faq/types";

const FaqPage = () => {
  const { t } = useTranslation();
  const items = t("faqPage.items", { returnObjects: true }) as FaqItem[];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<FaqCategory>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!Array.isArray(items)) return [];
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            {t("faqPage.title")}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground sm:text-base">
            {t("faqPage.subtitle")}
          </p>
        </div>

        <FaqToolbar
          query={query}
          category={category}
          onQueryChange={(value) => {
            setQuery(value);
            setOpenIndex(null);
          }}
          onCategoryChange={(value) => {
            setCategory(value);
            setOpenIndex(null);
          }}
        />

        <FaqList
          items={filtered}
          openIndex={openIndex}
          onToggle={(index) => setOpenIndex(openIndex === index ? null : index)}
        />
      </div>
    </div>
  );
};

export default FaqPage;
