import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";
import type { FaqItem } from "./types";

type FaqListProps = {
  items: FaqItem[];
  openIndex: number | null;
  onToggle: (index: number) => void;
};

const FaqList = ({ items, openIndex, onToggle }: FaqListProps) => {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-muted-foreground">
        {t("faqPage.noResults")}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <button
              type="button"
              onClick={() => onToggle(index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-sm font-semibold text-foreground sm:text-base"
            >
              <span>{item.q}</span>
              <FiChevronDown
                className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            {open && (
              <p className="border-t border-border px-5 py-4 text-sm leading-7 text-muted-foreground">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqList;
