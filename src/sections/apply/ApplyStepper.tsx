import { useTranslation } from "react-i18next";

const STEP_KEYS = [
  "personal",
  "education",
  "experience",
  "documents",
] as const;

type ApplyStepperProps = {
  currentStep: number;
};

const ApplyStepper = ({ currentStep }: ApplyStepperProps) => {
  const { t } = useTranslation();

  return (
    <ol className="mx-auto mb-10 flex max-w-3xl items-start">
      {STEP_KEYS.map((key, index) => {
        const step = index + 1;
        const active = currentStep === step;
        const done = currentStep > step;

        return (
          <li key={key} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className={`h-px flex-1 ${index === 0 ? "bg-transparent" : done || active ? "bg-foreground/30" : "bg-border"}`} />
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  active || done
                    ? "bg-[#1a2e5b] text-white"
                    : "border border-border bg-card text-muted-foreground"
                }`}
              >
                {done ? "✓" : step}
              </div>
              <div className={`h-px flex-1 ${index === STEP_KEYS.length - 1 ? "bg-transparent" : currentStep > step ? "bg-foreground/30" : "bg-border"}`} />
            </div>
            <p
              className={`mt-2 max-w-24 text-center text-[11px] leading-4 sm:max-w-none sm:text-xs ${
                active ? "font-semibold text-foreground" : "text-muted-foreground"
              }`}
            >
              {t(`applyPage.steps.${key}`)}
            </p>
          </li>
        );
      })}
    </ol>
  );
};

export default ApplyStepper;
