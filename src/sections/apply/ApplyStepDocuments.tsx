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
        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-foreground file:me-4 file:rounded-lg file:border-0 file:bg-[#1a2e5b] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
        />
      </ApplyField>
      {fileName && (
        <p className="text-sm text-muted-foreground">{fileName}</p>
      )}
    </div>
  );
};

export default ApplyStepDocuments;
