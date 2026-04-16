import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isQualified] = useState(location.state?.isQualified || false);
  const [currentStep, setCurrentStep] = useState(1);

  console.log(isQualified, "isQualified");

  // Step 1: Basic Info
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [placeOfResidence, setPlaceOfResidence] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [hasDrivingLicense, setHasDrivingLicense] = useState(false);
  const [licenseType, setLicenseType] = useState("");

  // Step 2: Contact Info
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Step 3: Education
  const [educationLevel, setEducationLevel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [grade, setGrade] = useState("");

  // Step 4: Additional Info
  const [higherDegree, setHigherDegree] = useState("");
  const [degreePlace, setDegreePlace] = useState("");
  const [degreeSpecialization, setDegreeSpecialization] = useState("");
  const [degreeYear, setDegreeYear] = useState("");
  const [degreeGrade, setDegreeGrade] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("birthdate", birthdate);
      formData.append("maritalStatus", maritalStatus);
      formData.append("placeOfResidence", placeOfResidence);
      formData.append("currentJob", currentJob);
      formData.append("hasDrivingLicense", hasDrivingLicense.toString());
      formData.append("licenseType", licenseType);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("educationLevel", educationLevel);
      formData.append("schoolName", schoolName);
      formData.append("specialization", specialization);
      formData.append("graduationYear", graduationYear);
      formData.append("grade", grade);
      formData.append("isQualified", isQualified.toString());
      if (isQualified) {
        formData.append("higherDegree", higherDegree);
        formData.append("degreePlace", degreePlace);
        formData.append("degreeSpecialization", degreeSpecialization);
        formData.append("degreeYear", degreeYear);
        formData.append("degreeGrade", degreeGrade);
      }
      if (cvFile) formData.append("cv", cvFile);

      await fetch(`http://localhost:5000/api/jobs/${id}/apply`, {
        method: "POST",
        body: formData,
      });

      alert("✅ تم تقديم الطلب بنجاح");
      navigate("/qualified-home");
    } catch (error) {
      alert("فشل في تقديم الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    const maxStep = isQualified ? 4 : 3;
    if (currentStep < maxStep) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          name && birthdate && maritalStatus && placeOfResidence && currentJob
        );
      case 2:
        return phone && phone.length === 11 && email;
      case 3:
        return (
          educationLevel &&
          schoolName &&
          specialization &&
          graduationYear &&
          grade
        );
      case 4:
        const baseFieldsValid =
          higherDegree &&
          degreePlace &&
          degreeSpecialization &&
          degreeYear &&
          degreeGrade;
        if (isQualified) {
          return baseFieldsValid && cvFile;
        }
        return baseFieldsValid;
      default:
        return false;
    }
  };

  return (
    <div className="page-mesh relative min-h-screen overflow-hidden pb-16">
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-12">
        <div className="mb-10 text-center md:mb-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground"
          >
            <span>←</span>
            <span>{t("common.back")}</span>
          </button>

          <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t("applyPage.title")}
          </h1>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {[1, 2, 3, ...(isQualified ? [4] : [])].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all sm:h-10 sm:w-10 ${
                    currentStep >= step
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                {step <= (isQualified ? 3 : 2) && (
                  <div
                    className={`mx-1 h-1 w-8 rounded-full transition-all sm:mx-2 sm:w-12 ${
                      currentStep > step ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6 sm:p-8 md:p-10">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="mb-6 text-right text-2xl font-bold text-foreground">
                {t("applyPage.steps.basicInfo")}
              </h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-indigo-400">👤</span>
                  </div>
                  <input
                    type="text"
                    placeholder={t("applyPage.basicInfo.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-emerald-400">📅</span>
                  </div>
                  <input
                    type="date"
                    placeholder={t("applyPage.basicInfo.birthdate")}
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-purple-400">💑</span>
                  </div>
                  <select
                    value={maritalStatus}
                    onChange={(e) => setMaritalStatus(e.target.value)}
                    className="input-field appearance-none pr-12 pl-12 text-right"
                    dir="rtl"
                  >
                    <option value="" disabled className="bg-card">
                      الحالة الاجتماعية *
                    </option>
                    <option value="أعزب" className="bg-card">
                      أعزب
                    </option>
                    <option value="متزوج" className="bg-card">
                      متزوج
                    </option>
                    <option value="غير ذلك" className="bg-card">
                      غير ذلك
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-blue-400">📍</span>
                  </div>
                  <select
                    value={placeOfResidence}
                    onChange={(e) => setPlaceOfResidence(e.target.value)}
                    className="input-field appearance-none pr-12 pl-12 text-right"
                    dir="rtl"
                  >
                    <option value="" disabled>
                      محل الإقامة *
                    </option>
                    <option value="القاهرة" className="bg-card">
                      القاهرة
                    </option>
                    <option value="الجيزة" className="bg-card">
                      الجيزة
                    </option>
                    <option value="الإسكندرية" className="bg-card">
                      الإسكندرية
                    </option>
                    <option value="الدقهلية" className="bg-card">
                      الدقهلية
                    </option>
                    <option value="الشرقية" className="bg-card">
                      الشرقية
                    </option>
                    <option value="الدلتا" className="bg-card">
                      الدلتا
                    </option>
                    <option value="كفر الشيخ" className="bg-card">
                      كفر الشيخ
                    </option>
                    <option value="الفيوم" className="bg-card">
                      الفيوم
                    </option>
                    <option value="بني سويف" className="bg-card">
                      بني سويف
                    </option>
                    <option value="المنيا" className="bg-card">
                      المنيا
                    </option>
                    <option value="الأقصر" className="bg-card">
                      الأقصر
                    </option>
                    <option value="أسوان" className="bg-card">
                      أسوان
                    </option>
                    <option value="البحر الأحمر" className="bg-card">
                      البحر الأحمر
                    </option>
                    <option value="الوادي الجديد" className="bg-card">
                      الوادي الجديد
                    </option>
                    <option value="مطروح" className="bg-card">
                      مطروح
                    </option>
                    <option value="شمال سيناء" className="bg-card">
                      شمال سيناء
                    </option>
                    <option value="جنوب سيناء" className="bg-card">
                      جنوب سيناء
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-accent" aria-hidden>
                      💼
                    </span>
                  </div>
                  <input
                    type="text"
                    placeholder="الوظيفة الحالية / المسمى الوظيفي *"
                    value={currentJob}
                    onChange={(e) => setCurrentJob(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="card-surface flex items-center gap-3 p-4">
                  <input
                    type="checkbox"
                    id="drivingLicense"
                    checked={hasDrivingLicense}
                    onChange={(e) => setHasDrivingLicense(e.target.checked)}
                    className="h-5 w-5 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label
                    htmlFor="drivingLicense"
                    className="cursor-pointer text-foreground"
                  >
                    هل لديك رخصة قيادة؟ *
                  </label>
                </div>

                {hasDrivingLicense && (
                  <div className="relative">
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-orange-400">🚗</span>
                    </div>
                    <select
                      value={licenseType}
                      onChange={(e) => setLicenseType(e.target.value)}
                      className="input-field appearance-none pr-12 pl-12 text-right"
                      dir="rtl"
                    >
                      <option value="" disabled className="bg-card">
                        نوع الرخصة
                      </option>
                      <option value="خاصة" className="bg-card">
                        خاصة
                      </option>
                      <option value="ثالثة" className="bg-card">
                        ثالثة
                      </option>
                      <option value="ثانية" className="bg-card">
                        ثانية
                      </option>
                      <option value="أولى" className="bg-card">
                        أولى
                      </option>
                      <option value="دراجة نارية" className="bg-card">
                        دراجة نارية
                      </option>
                    </select>
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <IoChevronDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="mb-6 text-right text-2xl font-bold text-foreground">
                بيانات التواصل
              </h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-emerald-400">📱</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="رقم الهاتف (واتساب) *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={11}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-indigo-400">✉️</span>
                  </div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="mb-6 text-right text-2xl font-bold text-foreground">التعليم</h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-cyan-400">🎓</span>
                  </div>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="input-field appearance-none pr-12 pl-12 text-right"
                    dir="rtl"
                  >
                    <option value="" disabled className="bg-card">
                      المستوى التعليمي *
                    </option>
                    <option value="ثانوي عام" className="bg-card">
                      بدون مؤهل
                    </option>
                    <option value="ثانوي عام" className="bg-card">
                      ثانوي عام
                    </option>
                    <option value="دبلوم" className="bg-card">
                      دبلوم
                    </option>
                    <option value="بكالوريوس" className="bg-card">
                      بكالوريوس
                    </option>
                    <option value="ماجستير" className="bg-card">
                      ماجستير
                    </option>
                    <option value="دكتوراه" className="bg-card">
                      دكتوراه
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-purple-400">🏫</span>
                  </div>
                  <input
                    type="text"
                    placeholder="اسم المدرسة/الجامعة *"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-pink-400">📚</span>
                  </div>
                  <input
                    type="text"
                    placeholder="التخصص *"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-emerald-400">📅</span>
                  </div>
                  <input
                    type="text"
                    placeholder="سنة التخرج *"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-yellow-400">📊</span>
                  </div>
                  <input
                    type="text"
                    placeholder="التقدير *"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && isQualified && (
            <div className="space-y-6">
              <h2 className="mb-6 text-right text-2xl font-bold text-foreground">
                معلومات إضافية
              </h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-purple-400">🎓</span>
                  </div>
                  <input
                    type="text"
                    placeholder="الدرجة العلمية العليا *"
                    value={higherDegree}
                    onChange={(e) => setHigherDegree(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-blue-400">📍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="مكان الحصول على الدرجة *"
                    value={degreePlace}
                    onChange={(e) => setDegreePlace(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-pink-400">📚</span>
                  </div>
                  <input
                    type="text"
                    placeholder="تخصص الدرجة العليا *"
                    value={degreeSpecialization}
                    onChange={(e) => setDegreeSpecialization(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-emerald-400">📅</span>
                  </div>
                  <input
                    type="text"
                    placeholder="سنة الحصول على الدرجة *"
                    value={degreeYear}
                    onChange={(e) => setDegreeYear(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-yellow-400">📊</span>
                  </div>
                  <input
                    type="text"
                    placeholder="تقدير الدرجة العليa *"
                    value={degreeGrade}
                    onChange={(e) => setDegreeGrade(e.target.value)}
                    className="input-field pr-12 text-right"
                    dir="rtl"
                  />
                </div>

                {isQualified && (
                  <div className="relative">
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <span className="text-rose-400">📄</span>
                    </div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                      className="input-field pr-12 text-right file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary-hover"
                      required
                    />
                    <label className="mt-2 block text-right text-sm text-muted-foreground">
                      يرجى إرفاق السيرة الذاتية (PDF, DOC, DOCX) *
                    </label>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {currentStep < (isQualified ? 4 : 3) ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
