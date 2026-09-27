import { useTranslation } from "react-i18next";
import { FiChevronDown, FiSearch } from "react-icons/fi";

type JobsFiltersProps = {
  query: string;
  city: string;
  sector: string;
  cities: string[];
  sectors: string[];
  onQueryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onSectorChange: (value: string) => void;
};

const JobsFilters = ({
  query,
  city,
  sector,
  cities,
  sectors,
  onQueryChange,
  onCityChange,
  onSectorChange,
}: JobsFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-[0_1px_3px_rgba(11,17,30,0.06)]">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[2fr_1fr_1fr]">
        <label className="relative flex items-center rounded-xl border border-border bg-card px-4">
          <FiSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("jobsPage.searchPlaceholder")}
            data-testid="jobs-search"
            className="w-full bg-transparent px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>

        <label className="relative">
          <select
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="field-input"
          >
            <option value="all">{t("jobsPage.allCities")}</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 end-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </label>

        <label className="relative">
          <select
            value={sector}
            onChange={(e) => onSectorChange(e.target.value)}
            className="field-input"
          >
            <option value="all">{t("jobsPage.allSectors")}</option>
            {sectors.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute top-1/2 end-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </label>
      </div>
    </div>
  );
};

export default JobsFilters;
