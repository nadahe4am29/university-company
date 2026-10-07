import { useTranslation } from "react-i18next";
import ApplyField from "./ApplyField";

export type EducationForm = {
  educationLevel: string;
  literacyLevel: string;
  schoolName: string;
  faculty: string;
  specialization: string;
  graduationYear: string;
  grade: string;
  hasForeignLanguage: string;
  foreignLanguage: string;
  languageLevel: string;
  hasHigherQualification: string;
  acceptedTerms: string;
};

type ApplyStepEducationProps = {
  values: EducationForm;
  onChange: (field: keyof EducationForm, value: string) => void;
};

const fieldClass =
  "w-full appearance-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50";

const EMPTY_DETAILS: Omit<EducationForm, "educationLevel"> = {
  literacyLevel: "",
  schoolName: "",
  faculty: "",
  specialization: "",
  graduationYear: "",
  grade: "",
  hasForeignLanguage: "",
  foreignLanguage: "",
  languageLevel: "",
  hasHigherQualification: "",
  acceptedTerms: "",
};

export function isEducationStepComplete(values: EducationForm) {
  if (!values.educationLevel) return false;

  if (values.educationLevel === "none") {
    return Boolean(values.literacyLevel && values.acceptedTerms === "yes");
  }

  const academic = Boolean(
    values.schoolName &&
      values.specialization &&
      values.graduationYear &&
      values.grade &&
      values.hasForeignLanguage &&
      (values.hasForeignLanguage !== "yes" ||
        (values.foreignLanguage && values.languageLevel)),
  );

  if (values.educationLevel === "diploma") return academic;
  if (values.educationLevel === "bachelor") {
    return academic && Boolean(values.faculty && values.hasHigherQualification);
  }
  if (values.educationLevel === "postgraduate") {
    return academic && Boolean(values.faculty);
  }

  return false;
}

const ApplyStepEducation = ({ values, onChange }: ApplyStepEducationProps) => {
  const { t } = useTranslation();
  const level = values.educationLevel;
  const isHigherEducation = level === "bachelor" || level === "postgraduate";

  const changeLevel = (next: string) => {
    onChange("educationLevel", next);
    (Object.keys(EMPTY_DETAILS) as (keyof typeof EMPTY_DETAILS)[]).forEach((field) => {
      onChange(field, "");
    });
  };

  return (
    <div className="space-y-5">
      <ApplyField label={t("applyPage.education.educationLevel")}>
        <select
          name="educationLevel"
          value={level}
          onChange={(e) => changeLevel(e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          <option value="none">{t("applyPage.education.none")}</option>
          <option value="diploma">{t("applyPage.education.diploma")}</option>
          <option value="bachelor">{t("applyPage.education.bachelor")}</option>
          <option value="postgraduate">{t("applyPage.education.postgraduate")}</option>
        </select>
      </ApplyField>

      {level === "none" && (
        <>
          <ApplyField label={t("applyPage.education.literacy")}>
            <select
              name="literacyLevel"
              value={values.literacyLevel}
              onChange={(e) => onChange("literacyLevel", e.target.value)}
              className={fieldClass}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              <option value="illiterate">{t("applyPage.education.illiterate")}</option>
              <option value="read">{t("applyPage.education.readOnly")}</option>
              <option value="readWrite">{t("applyPage.education.readWrite")}</option>
            </select>
          </ApplyField>

          <label className="flex items-center gap-3 text-sm text-foreground">
            <span>{t("applyPage.education.terms")}</span>
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={values.acceptedTerms === "yes"}
              onChange={(e) => onChange("acceptedTerms", e.target.checked ? "yes" : "")}
              className="h-4 w-4 shrink-0 accent-[#1a2e5b]"
            />
          </label>
        </>
      )}

      {(level === "diploma" || isHigherEducation) && (
        <>
          <ApplyField
            label={
              level === "diploma"
                ? t("applyPage.education.institute")
                : t("applyPage.education.university")
            }
          >
            <input
              type="text"
              name="schoolName"
              value={values.schoolName}
              onChange={(e) => onChange("schoolName", e.target.value)}
              className={fieldClass}
            />
          </ApplyField>

          {isHigherEducation && (
            <ApplyField label={t("applyPage.education.faculty")}>
              <input
                type="text"
                name="faculty"
                value={values.faculty}
                onChange={(e) => onChange("faculty", e.target.value)}
                className={fieldClass}
              />
            </ApplyField>
          )}

          <ApplyField label={t("applyPage.education.specialization")}>
            <input
              type="text"
              name="specialization"
              value={values.specialization}
              onChange={(e) => onChange("specialization", e.target.value)}
              className={fieldClass}
            />
          </ApplyField>

          <ApplyField label={t("applyPage.education.graduationYear")}>
            <input
              type="text"
              name="graduationYear"
              inputMode="numeric"
              value={values.graduationYear}
              onChange={(e) =>
                onChange("graduationYear", e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="2020"
              className={fieldClass}
            />
          </ApplyField>

          <ApplyField label={t("applyPage.education.grade")}>
            <select
              name="grade"
              value={values.grade}
              onChange={(e) => onChange("grade", e.target.value)}
              className={fieldClass}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              <option value="excellent">{t("applyPage.education.excellent")}</option>
              <option value="veryGood">{t("applyPage.education.veryGood")}</option>
              <option value="good">{t("applyPage.education.good")}</option>
              <option value="pass">{t("applyPage.education.pass")}</option>
            </select>
          </ApplyField>

          {level === "bachelor" && (
            <ApplyField label={t("applyPage.education.higherQualification")}>
              <select
                name="hasHigherQualification"
                value={values.hasHigherQualification}
                onChange={(e) => onChange("hasHigherQualification", e.target.value)}
                className={fieldClass}
              >
                <option value="">{t("applyPage.basicInfo.select")}</option>
                <option value="yes">{t("applyPage.basicInfo.yes")}</option>
                <option value="no">{t("applyPage.basicInfo.no")}</option>
              </select>
            </ApplyField>
          )}

          <ApplyField label={t("applyPage.education.foreignLanguage")}>
            <select
              name="hasForeignLanguage"
              value={values.hasForeignLanguage}
              onChange={(e) => {
                const next = e.target.value;
                onChange("hasForeignLanguage", next);
                if (next !== "yes") {
                  onChange("foreignLanguage", "");
                  onChange("languageLevel", "");
                }
              }}
              className={fieldClass}
            >
              <option value="">{t("applyPage.basicInfo.select")}</option>
              <option value="yes">{t("applyPage.basicInfo.yes")}</option>
              <option value="no">{t("applyPage.basicInfo.no")}</option>
            </select>
          </ApplyField>

          {values.hasForeignLanguage === "yes" && (
            <div className="grid grid-cols-2 gap-4">
              <ApplyField label={t("applyPage.education.language")}>
                <input
                  type="text"
                  name="foreignLanguage"
                  value={values.foreignLanguage}
                  onChange={(e) => onChange("foreignLanguage", e.target.value)}
                  className={fieldClass}
                />
              </ApplyField>
              <ApplyField label={t("applyPage.education.languageLevel")}>
                <select
                  name="languageLevel"
                  value={values.languageLevel}
                  onChange={(e) => onChange("languageLevel", e.target.value)}
                  className={fieldClass}
                >
                  <option value="">{t("applyPage.basicInfo.select")}</option>
                  <option value="beginner">{t("applyPage.education.beginner")}</option>
                  <option value="intermediate">{t("applyPage.education.intermediate")}</option>
                  <option value="advanced">{t("applyPage.education.advanced")}</option>
                  <option value="fluent">{t("applyPage.education.fluent")}</option>
                </select>
              </ApplyField>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApplyStepEducation;
