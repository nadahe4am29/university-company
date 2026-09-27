import { useTranslation } from "react-i18next";
import ApplyField from "./ApplyField";

export type EducationForm = {
  educationLevel: string;
  schoolName: string;
  specialization: string;
  graduationYear: string;
  grade: string;
};

type ApplyStepEducationProps = {
  values: EducationForm;
  onChange: (field: keyof EducationForm, value: string) => void;
};

const fieldClass =
  "w-full appearance-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50";

const LEVELS = [
  "بدون مؤهل",
  "ثانوي عام",
  "دبلوم",
  "بكالوريوس",
  "ماجستير",
  "دكتوراه",
];

const ApplyStepEducation = ({ values, onChange }: ApplyStepEducationProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <ApplyField label={t("applyPage.education.educationLevel")}>
        <select
          name="educationLevel"
          value={values.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.education.schoolName")}>
        <input
          type="text"
          name="schoolName"
          value={values.schoolName}
          onChange={(e) => onChange("schoolName", e.target.value)}
          placeholder={t("applyPage.education.schoolName")}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.education.specialization")}>
        <input
          type="text"
          name="specialization"
          value={values.specialization}
          onChange={(e) => onChange("specialization", e.target.value)}
          placeholder={t("applyPage.education.specialization")}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.education.graduationYear")}>
        <input
          type="text"
          name="graduationYear"
          value={values.graduationYear}
          onChange={(e) => onChange("graduationYear", e.target.value)}
          placeholder={t("applyPage.education.graduationYear")}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.education.grade")}>
        <input
          type="text"
          name="grade"
          value={values.grade}
          onChange={(e) => onChange("grade", e.target.value)}
          placeholder={t("applyPage.education.grade")}
          className={fieldClass}
        />
      </ApplyField>
    </div>
  );
};

export default ApplyStepEducation;
