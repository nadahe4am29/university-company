import { useTranslation } from "react-i18next";
import ApplyField from "./ApplyField";
import BirthdateField from "./BirthdateField";

export type EmploymentStatus = "company" | "freelance" | "available" | "";

export type ExperienceForm = {
  years: string;
  employmentStatus: EmploymentStatus;
  companyName: string;
  lastCompanyName: string;
  workStartDate: string;
  workEndDate: string;
  skills: string;
};

type ApplyStepExperienceProps = {
  values: ExperienceForm;
  onChange: (field: keyof ExperienceForm, value: string) => void;
};

export const fieldClass =
  "w-full appearance-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50";

export const YEARS_OPTIONS = [
  "بدون خبرة",
  "أقل من سنة",
  "1-3 سنوات",
  "4-6 سنوات",
  "7-10 سنوات",
  "أكثر من 10 سنوات",
];

const currentYear = new Date().getFullYear();

function WorkDateField({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <BirthdateField
      name={name}
      value={value}
      onChange={onChange}
      fromYear={1970}
      toYear={currentYear}
      className={fieldClass}
    />
  );
}

const ApplyStepExperience = ({ values, onChange }: ApplyStepExperienceProps) => {
  const { t } = useTranslation();
  const status = values.employmentStatus;

  return (
    <div className="space-y-5">
      <ApplyField label={t("applyPage.experience.years")}>
        <select
          name="experienceYears"
          value={values.years}
          onChange={(e) => onChange("years", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          {YEARS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.experience.employmentStatus")}>
        <select
          name="employmentStatus"
          value={values.employmentStatus}
          onChange={(e) => onChange("employmentStatus", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          <option value="company">{t("applyPage.experience.statusCompany")}</option>
          <option value="freelance">{t("applyPage.experience.statusFreelance")}</option>
          <option value="available">{t("applyPage.experience.statusAvailable")}</option>
        </select>
      </ApplyField>

      {status === "company" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ApplyField label={t("applyPage.experience.currentCompany")}>
            <input
              type="text"
              name="companyName"
              value={values.companyName}
              onChange={(e) => onChange("companyName", e.target.value)}
              className={fieldClass}
            />
          </ApplyField>
          <ApplyField label={t("applyPage.experience.workStartDate")}>
            <WorkDateField
              name="workStartDate"
              value={values.workStartDate}
              onChange={(next) => onChange("workStartDate", next)}
            />
          </ApplyField>
        </div>
      )}

      {status === "freelance" && (
        <ApplyField label={t("applyPage.experience.workStartDate")}>
          <WorkDateField
            name="workStartDate"
            value={values.workStartDate}
            onChange={(next) => onChange("workStartDate", next)}
          />
        </ApplyField>
      )}

      {status === "available" && (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ApplyField label={t("applyPage.experience.lastCompany")}>
              <input
                type="text"
                name="lastCompanyName"
                value={values.lastCompanyName}
                onChange={(e) => onChange("lastCompanyName", e.target.value)}
                className={fieldClass}
              />
            </ApplyField>
            <ApplyField label={t("applyPage.experience.workStartDateAlt")}>
              <WorkDateField
                name="workStartDate"
                value={values.workStartDate}
                onChange={(next) => onChange("workStartDate", next)}
              />
            </ApplyField>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <ApplyField label={t("applyPage.experience.workEndDate")}>
              <WorkDateField
                name="workEndDate"
                value={values.workEndDate}
                onChange={(next) => onChange("workEndDate", next)}
              />
            </ApplyField>
          </div>
        </>
      )}

      <ApplyField label={t("applyPage.experience.skills")}>
        <textarea
          name="skills"
          value={values.skills}
          onChange={(e) => onChange("skills", e.target.value)}
          placeholder={t("applyPage.experience.skillsPlaceholder")}
          rows={4}
          className={`${fieldClass} resize-y`}
        />
      </ApplyField>
    </div>
  );
};

export default ApplyStepExperience;
