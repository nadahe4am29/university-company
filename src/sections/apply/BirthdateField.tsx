import { useEffect, useId, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { formatBirthdate, isAtLeast21, maxBirthdate } from "./birthdate";

const MONTHS_AR = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FIRST_YEAR = 1940;

type Parts = { day: string; month: string; year: string };

type BirthdateFieldProps = {
  value: string;
  onChange: (value: string) => void;
  className: string;
  name?: string;
  fromYear?: number;
  toYear?: number;
};

function partsFromValue(value: string): Parts {
  const [year = "", month = "", day = ""] = value.split("-");
  return { day, month, year };
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const BirthdateField = ({
  value,
  onChange,
  className,
  name = "birthdate",
  fromYear,
  toYear,
}: BirthdateFieldProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language.startsWith("ar");
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [parts, setParts] = useState<Parts>(() => partsFromValue(value));
  const latestBirthdate = maxBirthdate();
  const [maxYear, maxMonth, maxDay] = latestBirthdate.split("-").map(Number);
  const months = isArabic ? MONTHS_AR : MONTHS_EN;

  useEffect(() => {
    setParts(partsFromValue(value));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    return () => document.removeEventListener("pointerdown", closeOnOutside);
  }, [open]);

  const isCustomRange = fromYear !== undefined && toYear !== undefined;
  const yearNumber = Number(parts.year);
  const monthNumber = Number(parts.month);
  const monthLimit = !isCustomRange && yearNumber === maxYear ? maxMonth : 12;
  const dayLimit =
    !isCustomRange && yearNumber === maxYear && monthNumber === maxMonth
      ? maxDay
      : daysInMonth(yearNumber || (isCustomRange ? fromYear : maxYear), monthNumber || 1);

  const years = isCustomRange
    ? Array.from({ length: toYear - fromYear + 1 }, (_, index) => fromYear + index)
    : Array.from({ length: maxYear - FIRST_YEAR + 1 }, (_, index) => maxYear - index);

  const commit = (next: Parts) => {
    setParts(next);
    if (!next.day || !next.month || !next.year) return;

    const iso = `${next.year}-${next.month}-${next.day}`;
    if (!isCustomRange && !isAtLeast21(iso)) {
      setAgeError(true);
      onChange("");
      return;
    }

    setAgeError(false);
    onChange(iso);
    setOpen(false);
  };

  const selectClass =
    "w-full rounded-lg border border-border bg-background px-2 py-2 text-sm text-foreground outline-none";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className={`${className} flex items-center justify-between gap-3 text-start ${
          ageError ? "border-red-400" : ""
        }`}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value
            ? formatBirthdate(value, isArabic)
            : t("applyPage.basicInfo.birthdatePlaceholder")}
        </span>
        <FiCalendar className="shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>

      <input
        type="date"
        name={name}
        value={value}
        max={isCustomRange ? undefined : latestBirthdate}
        tabIndex={-1}
        onChange={(event) => {
          const next = event.target.value;
          if (!isCustomRange && next && !isAtLeast21(next)) {
            setAgeError(true);
            onChange("");
            return;
          }
          setAgeError(false);
          onChange(next);
        }}
        aria-invalid={ageError}
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {open && (
        <div
          id={panelId}
          className="absolute inset-x-0 z-20 mt-2 grid grid-cols-3 gap-2 rounded-xl border border-border bg-card p-3 shadow-lg"
        >
          <label className="block text-xs text-muted-foreground">
            {t("applyPage.basicInfo.day")}
            <select
              value={parts.day}
              onChange={(event) => commit({ ...parts, day: event.target.value })}
              className={`${selectClass} mt-1`}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              {Array.from({ length: dayLimit }, (_, index) => {
                const day = String(index + 1).padStart(2, "0");
                return (
                  <option key={day} value={day}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="block text-xs text-muted-foreground">
            {t("applyPage.basicInfo.month")}
            <select
              value={parts.month}
              onChange={(event) => {
                const month = event.target.value;
                const nextDayLimit =
                  !isCustomRange && yearNumber === maxYear && Number(month) === maxMonth
                    ? maxDay
                    : daysInMonth(yearNumber || (isCustomRange ? fromYear : maxYear), Number(month) || 1);
                const day =
                  parts.day && Number(parts.day) > nextDayLimit ? "" : parts.day;
                commit({ ...parts, month, day });
              }}
              className={`${selectClass} mt-1`}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              {months.slice(0, monthLimit).map((label, index) => {
                const month = String(index + 1).padStart(2, "0");
                return (
                  <option key={month} value={month}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="block text-xs text-muted-foreground">
            {t("applyPage.basicInfo.year")}
            <select
              value={parts.year}
              onChange={(event) => {
                const year = event.target.value;
                const nextMonthLimit =
                  !isCustomRange && Number(year) === maxYear ? maxMonth : 12;
                const month =
                  parts.month && Number(parts.month) > nextMonthLimit ? "" : parts.month;
                const nextDayLimit =
                  !isCustomRange && Number(year) === maxYear && Number(month) === maxMonth
                    ? maxDay
                    : daysInMonth(
                        Number(year) || (isCustomRange ? fromYear : maxYear),
                        Number(month) || 1,
                      );
                const day =
                  parts.day && Number(parts.day) > nextDayLimit ? "" : parts.day;
                commit({ year, month, day });
              }}
              className={`${selectClass} mt-1`}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {ageError && (
        <p className="mt-2 text-sm text-red-400">{t("applyPage.basicInfo.birthdateMinAge")}</p>
      )}
    </div>
  );
};

export default BirthdateField;
