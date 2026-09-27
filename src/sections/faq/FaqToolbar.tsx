import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { FAQ_CATEGORIES, type FaqCategory } from "./types";

type FaqToolbarProps = {
  query: string;
  category: FaqCategory;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: FaqCategory) => void;
};

const FaqToolbar = ({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: FaqToolbarProps) => {
  const { t } = useTranslation();

  return (
    <>
      <label className="mb-5 flex items-center rounded-xl border border-border bg-card px-4">
        <FiSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("faqPage.searchPlaceholder")}
          data-testid="faq-search"
          className="w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </label>

      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {FAQ_CATEGORIES.map((key) => {
          const active = category === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onCategoryChange(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-primary text-white"
                  : "bg-card text-foreground/70 ring-1 ring-border hover:text-foreground"
              }`}
            >
              {t(`faqPage.categories.${key}`)}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default FaqToolbar;
