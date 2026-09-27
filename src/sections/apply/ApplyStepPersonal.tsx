import { useTranslation } from "react-i18next";
import ApplyField from "./ApplyField";
import { GOVERNORATES } from "./governorates";

export type PersonalForm = {
  name: string;
  birthdate: string;
  maritalStatus: string;
  placeOfResidence: string;
  currentJob: string;
  drivingLicense: string;
  hasPassport: string;
  phone: string;
  email: string;
};

type ApplyStepPersonalProps = {
  values: PersonalForm;
  onChange: (field: keyof PersonalForm, value: string) => void;
};

const fieldClass =
  "w-full appearance-none rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/50";

const ApplyStepPersonal = ({ values, onChange }: ApplyStepPersonalProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <ApplyField label={t("applyPage.basicInfo.name")}>
        <input
          type="text"
          name="fullName"
          value={values.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder={t("applyPage.basicInfo.namePlaceholder")}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.birthdate")}>
        <input
          type="date"
          name="birthdate"
          value={values.birthdate}
          onChange={(e) => onChange("birthdate", e.target.value)}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.maritalStatus")}>
        <select
          name="maritalStatus"
          value={values.maritalStatus}
          onChange={(e) => onChange("maritalStatus", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          <option value="أعزب">{t("applyPage.basicInfo.single")}</option>
          <option value="متزوج">{t("applyPage.basicInfo.married")}</option>
          <option value="غير ذلك">{t("applyPage.basicInfo.other")}</option>
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.placeOfResidence")}>
        <select
          name="placeOfResidence"
          value={values.placeOfResidence}
          onChange={(e) => onChange("placeOfResidence", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.selectGovernorate")}</option>
          {GOVERNORATES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.currentJob")}>
        <input
          type="text"
          name="currentJob"
          value={values.currentJob}
          onChange={(e) => onChange("currentJob", e.target.value)}
          placeholder={t("applyPage.basicInfo.currentJobPlaceholder")}
          className={fieldClass}
        />
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.drivingLicense")}>
        <select
          name="drivingLicense"
          value={values.drivingLicense}
          onChange={(e) => onChange("drivingLicense", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          <option value="yes">{t("applyPage.basicInfo.yes")}</option>
          <option value="no">{t("applyPage.basicInfo.no")}</option>
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.basicInfo.passport")}>
        <select
          name="hasPassport"
          value={values.hasPassport}
          onChange={(e) => onChange("hasPassport", e.target.value)}
          className={fieldClass}
        >
          <option value="">{t("applyPage.basicInfo.select")}</option>
          <option value="yes">{t("applyPage.basicInfo.yes")}</option>
          <option value="no">{t("applyPage.basicInfo.no")}</option>
        </select>
      </ApplyField>

      <ApplyField label={t("applyPage.contactInfo.phone")}>
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
          placeholder={t("applyPage.contactInfo.phonePlaceholder")}
          className={fieldClass}
          dir="ltr"
        />
      </ApplyField>

      <ApplyField label={t("applyPage.contactInfo.email")}>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder={t("applyPage.contactInfo.emailPlaceholder")}
          className={fieldClass}
          dir="ltr"
        />
      </ApplyField>
    </div>
  );
};

export default ApplyStepPersonal;
