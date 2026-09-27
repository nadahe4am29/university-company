import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ApplyStepDocuments from "../sections/apply/ApplyStepDocuments";
import ApplyStepEducation, {
  type EducationForm,
} from "../sections/apply/ApplyStepEducation";
import ApplyStepExperience, {
  type ExperienceForm,
} from "../sections/apply/ApplyStepExperience";
import ApplyStepPersonal, {
  type PersonalForm,
} from "../sections/apply/ApplyStepPersonal";
import ApplyStepper from "../sections/apply/ApplyStepper";

const TOTAL_STEPS = 4;

const emptyPersonal: PersonalForm = {
  name: "",
  birthdate: "",
  maritalStatus: "",
  placeOfResidence: "",
  currentJob: "",
  drivingLicense: "",
  hasPassport: "",
  phone: "",
  email: "",
};

const emptyEducation: EducationForm = {
  educationLevel: "",
  schoolName: "",
  specialization: "",
  graduationYear: "",
  grade: "",
};

const emptyExperience: ExperienceForm = {
  years: "",
  employmentStatus: "",
  companyName: "",
  lastCompanyName: "",
  workStartDate: "",
  workEndDate: "",
  skills: "",
};

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const isQualified = Boolean(location.state?.isQualified);
  const [currentStep, setCurrentStep] = useState(1);
  const [personal, setPersonal] = useState<PersonalForm>(emptyPersonal);
  const [education, setEducation] = useState<EducationForm>(emptyEducation);
  const [experience, setExperience] = useState<ExperienceForm>(emptyExperience);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePersonal = (field: keyof PersonalForm, value: string) => {
    setPersonal((current) => ({ ...current, [field]: value }));
  };

  const updateEducation = (field: keyof EducationForm, value: string) => {
    setEducation((current) => ({ ...current, [field]: value }));
  };

  const updateExperience = (field: keyof ExperienceForm, value: string) => {
    setExperience((current) => ({ ...current, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return Boolean(
          personal.name &&
            personal.birthdate &&
            personal.maritalStatus &&
            personal.placeOfResidence &&
            personal.currentJob &&
            personal.drivingLicense &&
            personal.hasPassport &&
            personal.phone.length === 11,
        );
      case 2:
        return Boolean(
          education.educationLevel &&
            education.schoolName &&
            education.specialization &&
            education.graduationYear &&
            education.grade,
        );
      case 3: {
        const hasBase = Boolean(experience.years && experience.employmentStatus);
        if (experience.employmentStatus === "company") {
          return hasBase && Boolean(experience.companyName && experience.workStartDate);
        }
        if (experience.employmentStatus === "freelance") {
          return hasBase && Boolean(experience.workStartDate);
        }
        return hasBase;
      }
      case 4:
        return Boolean(cvFile);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) setCurrentStep((step) => step + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((step) => step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", personal.name);
      formData.append("birthdate", personal.birthdate);
      formData.append("maritalStatus", personal.maritalStatus);
      formData.append("placeOfResidence", personal.placeOfResidence);
      formData.append("currentJob", personal.currentJob);
      formData.append("hasDrivingLicense", String(personal.drivingLicense === "yes"));
      formData.append("hasPassport", String(personal.hasPassport === "yes"));
      formData.append("phone", personal.phone);
      formData.append("email", personal.email);
      formData.append("educationLevel", education.educationLevel);
      formData.append("schoolName", education.schoolName);
      formData.append("specialization", education.specialization);
      formData.append("graduationYear", education.graduationYear);
      formData.append("grade", education.grade);
      formData.append("isQualified", String(isQualified));
      formData.append("experienceYears", experience.years);
      formData.append("employmentStatus", experience.employmentStatus);
      formData.append("companyName", experience.companyName);
      formData.append("lastCompanyName", experience.lastCompanyName);
      formData.append("workStartDate", experience.workStartDate);
      formData.append("workEndDate", experience.workEndDate);
      formData.append("skills", experience.skills);
      if (cvFile) formData.append("cv", cvFile);

      await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: "POST",
        body: formData,
      });

      alert("✅ تم تقديم الطلب بنجاح");
      navigate("/");
    } catch {
      alert("فشل في تقديم الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-foreground md:text-4xl">
            {t("applyPage.title")}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {t("applyPage.subtitle")}
          </p>
        </div>

        <ApplyStepper currentStep={currentStep} />

        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10">
          {currentStep === 1 && (
            <ApplyStepPersonal values={personal} onChange={updatePersonal} />
          )}
          {currentStep === 2 && (
            <ApplyStepEducation values={education} onChange={updateEducation} />
          )}
          {currentStep === 3 && (
            <ApplyStepExperience values={experience} onChange={updateExperience} />
          )}
          {currentStep === 4 && (
            <ApplyStepDocuments
              fileName={cvFile?.name}
              onFileChange={setCvFile}
            />
          )}

          <div className="mt-8 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
              >
                {t("common.previous")}
              </button>
            ) : (
              <span />
            )}

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                data-testid="apply-next"
                className="rounded-xl bg-[#1a2e5b] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#152547] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("common.next")}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="rounded-xl bg-[#1a2e5b] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#152547] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting
                  ? t("applyPage.additionalInfo.submitting")
                  : t("applyPage.submit")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
