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
    <div className="relative min-h-screen bg-[#1a1f2e] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-400/10 via-slate-800 to-emerald-400/10" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-300/10 rounded-full blur-[180px] animate-blob" />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-[180px] animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>{t("common.back")}</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("applyPage.title")}
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {[1, 2, 3, ...(isQualified ? [4] : [])].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step
                      ? "bg-linear-to-r from-indigo-600 to-emerald-600 text-white"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {step}
                </div>
                {step <= (isQualified ? 3 : 2) && (
                  <div
                    className={`w-12 h-1 mx-2 transition-all ${
                      currentStep > step ? "bg-indigo-600" : "bg-white/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="relative bg-black/30 backdrop-blur-md rounded-3xl border border-white/10 p-10">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-right">
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-right appearance-none"
                    dir="rtl"
                  >
                    <option value="" disabled className="bg-black/30">
                      الحالة الاجتماعية *
                    </option>
                    <option value="أعزب" className="bg-black/30">
                      أعزب
                    </option>
                    <option value="متزوج" className="bg-black/30">
                      متزوج
                    </option>
                    <option value="غير ذلك" className="bg-black/30">
                      غير ذلك
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="w-5 h-5 text-white/60" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-blue-400">📍</span>
                  </div>
                  <select
                    value={placeOfResidence}
                    onChange={(e) => setPlaceOfResidence(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-right appearance-none"
                    dir="rtl"
                  >
                    <option value="" disabled>
                      محل الإقامة *
                    </option>
                    <option value="القاهرة" className="bg-black/30">
                      القاهرة
                    </option>
                    <option value="الجيزة" className="bg-black/30">
                      الجيزة
                    </option>
                    <option value="الإسكندرية" className="bg-black/30">
                      الإسكندرية
                    </option>
                    <option value="الدقهلية" className="bg-black/30">
                      الدقهلية
                    </option>
                    <option value="الشرقية" className="bg-black/30">
                      الشرقية
                    </option>
                    <option value="الدلتا" className="bg-black/30">
                      الدلتا
                    </option>
                    <option value="كفر الشيخ" className="bg-black/30">
                      كفر الشيخ
                    </option>
                    <option value="الفيوم" className="bg-black/30">
                      الفيوم
                    </option>
                    <option value="بني سويف" className="bg-black/30">
                      بني سويف
                    </option>
                    <option value="المنيا" className="bg-black/30">
                      المنيا
                    </option>
                    <option value="الأقصر" className="bg-black/30">
                      الأقصر
                    </option>
                    <option value="أسوان" className="bg-black/30">
                      أسوان
                    </option>
                    <option value="البحر الأحمر" className="bg-black/30">
                      البحر الأحمر
                    </option>
                    <option value="الوادي الجديد" className="bg-black/30">
                      الوادي الجديد
                    </option>
                    <option value="مطروح" className="bg-black/30">
                      مطروح
                    </option>
                    <option value="شمال سيناء" className="bg-black/30">
                      شمال سيناء
                    </option>
                    <option value="جنوب سيناء" className="bg-black/30">
                      جنوب سيناء
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="w-5 h-5 text-white/60" />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-yellow-400">�</span>
                  </div>
                  <input
                    type="text"
                    placeholder="الوظيفة الحالية / المسمى الوظيفي *"
                    value={currentJob}
                    onChange={(e) => setCurrentJob(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-right"
                    dir="rtl"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl">
                  <input
                    type="checkbox"
                    id="drivingLicense"
                    checked={hasDrivingLicense}
                    onChange={(e) => setHasDrivingLicense(e.target.checked)}
                    className="w-5 h-5 rounded border-white/20 bg-white/10 text-indigo-600 focus:ring-2 focus:ring-indigo-500/50"
                  />
                  <label
                    htmlFor="drivingLicense"
                    className="text-white/90 cursor-pointer"
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
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-right appearance-none"
                      dir="rtl"
                    >
                      <option value="" disabled className="bg-black/30">
                        نوع الرخصة
                      </option>
                      <option value="خاصة" className="bg-black/30">
                        خاصة
                      </option>
                      <option value="ثالثة" className="bg-black/30">
                        ثالثة
                      </option>
                      <option value="ثانية" className="bg-black/30">
                        ثانية
                      </option>
                      <option value="أولى" className="bg-black/30">
                        أولى
                      </option>
                      <option value="دراجة نارية" className="bg-black/30">
                        دراجة نارية
                      </option>
                    </select>
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <IoChevronDown className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-right">
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-right">التعليم</h2>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <span className="text-cyan-400">🎓</span>
                  </div>
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-12 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-right appearance-none"
                    dir="rtl"
                  >
                    <option value="" disabled className="bg-black/30">
                      المستوى التعليمي *
                    </option>
                    <option value="ثانوي عام" className="bg-black/30">
                      بدون مؤهل
                    </option>
                    <option value="ثانوي عام" className="bg-black/30">
                      ثانوي عام
                    </option>
                    <option value="دبلوم" className="bg-black/30">
                      دبلوم
                    </option>
                    <option value="بكالوريوس" className="bg-black/30">
                      بكالوريوس
                    </option>
                    <option value="ماجستير" className="bg-black/30">
                      ماجستير
                    </option>
                    <option value="دكتوراه" className="bg-black/30">
                      دكتوراه
                    </option>
                  </select>
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <IoChevronDown className="w-5 h-5 text-white/60" />
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-right"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && isQualified && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6 text-right">
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-right"
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
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 text-right"
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
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl pr-12 pl-4 py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                      required
                    />
                    <label className="block text-white/70 text-sm mt-2 text-right">
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
              className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < (isQualified ? 4 : 3) ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-emerald-600 text-white font-semibold hover:from-indigo-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="px-6 py-3 rounded-2xl bg-linear-to-r from-indigo-600 to-emerald-600 text-white font-semibold hover:from-indigo-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
