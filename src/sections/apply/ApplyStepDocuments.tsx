import { useTranslation } from "react-i18next";
import ApplyField from "./ApplyField";

type ApplyStepDocumentsProps = {
  fileName?: string;
  onFileChange: (file: File | null) => void;
};

const ApplyStepDocuments = ({ fileName, onFileChange }: ApplyStepDocumentsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <ApplyField label={t("applyPage.additionalInfo.cvUpload")}>
        <div className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-border bg-background px-4 py-3.5 text-sm focus-within:ring-2 focus-within:ring-[#1a2e5b]/40">
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={(e) => onFileChange(e.target.files?.[0] || null)}
            className="sr-only"
          />
          <span className="shrink-0 rounded-lg bg-[#1a2e5b] px-4 py-2 text-sm font-semibold text-white">
            {t("common.chooseFile")}
          </span>
          <span className="truncate text-muted-foreground" dir="auto">
            {fileName || t("common.noFileChosen")}
          </span>
        </div>
      </ApplyField>
    </div>
  );
};

export default ApplyStepDocuments;
