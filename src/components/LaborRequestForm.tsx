import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiChevronDown } from "react-icons/fi";

type EntityType = "" | "individual" | "company";

const inputClass =
  "w-full rounded-lg border border-[#243044] bg-[#070d18] px-4 py-3 text-sm text-white outline-none transition focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]";

const LaborRequestForm = () => {
  const { t } = useTranslation();
  const fileId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [entityType, setEntityType] = useState<EntityType>("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const options: { value: EntityType; label: string }[] = [
    { value: "", label: t("laborRequest.choose") },
    { value: "individual", label: t("laborRequest.individual") },
    { value: "company", label: t("laborRequest.company") },
  ];

  const currentLabel =
    options.find((option) => option.value === entityType)?.label ??
    t("laborRequest.choose");

  const fields =
    entityType === "individual"
      ? {
          name: t("laborRequest.employerName"),
          address: t("laborRequest.employerAddress"),
          phone: t("laborRequest.employerPhone"),
          email: t("laborRequest.employerEmail"),
        }
      : entityType === "company"
        ? {
            name: t("laborRequest.orgName"),
            address: t("laborRequest.orgAddress"),
            phone: t("laborRequest.contactPhone"),
            email: t("laborRequest.correspondenceEmail"),
          }
        : null;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!entityType) {
      alert(t("laborRequest.selectType"));
      return;
    }

    alert(t("laborRequest.success"));
    setEntityType("");
    setName("");
    setAddress("");
    setPhone("");
    setEmail("");
    setMessage("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="bg-[#070b16] px-4 py-16 text-white sm:px-6 md:py-20">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {t("laborRequest.title")}
          </h1>
          <p className="mt-2 text-sm text-white/70 sm:text-base">
            {t("laborRequest.subtitle")}
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          data-testid="labor-request-form"
          className="rounded-2xl border border-[#2c3b52] bg-[#0d1526] p-5 shadow-xl sm:p-7"
        >
          <h2 className="border-b border-[#2c3b52] pb-4 text-lg font-bold">
            {t("laborRequest.sectionTitle")}
          </h2>

          <div className="mt-6">
            <span className="mb-2 block text-sm text-white/90">
              {t("laborRequest.entityType")}
            </span>
            <div ref={selectRef} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={t("laborRequest.entityType")}
                onClick={() => setOpen((current) => !current)}
                className={`flex w-full items-center justify-between rounded-lg border bg-[#070d18] px-4 py-3 text-sm text-white outline-none ${
                  open || entityType
                    ? "border-[#3b82f6] ring-1 ring-[#3b82f6]"
                    : "border-[#243044]"
                }`}
              >
                <span>{currentLabel}</span>
                <FiChevronDown
                  className={`h-4 w-4 text-white/80 transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <ul
                  role="listbox"
                  aria-label={t("laborRequest.entityType")}
                  className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-white bg-[#070d18] shadow-lg"
                >
                  {options.map((option) => {
                    const selected = option.value === entityType;
                    return (
                      <li key={option.label}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={`w-full px-4 py-2.5 text-start text-sm text-white transition ${
                            selected
                              ? "bg-[#1d6ef2]"
                              : "hover:bg-[#1d6ef2]"
                          }`}
                          onClick={() => {
                            setEntityType(option.value);
                            setOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {fields && (
            <div className="mt-5 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {fields.name}
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {fields.address}
                </span>
                <input
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className={inputClass}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {fields.phone}
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={inputClass}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {fields.email}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {t("laborRequest.message")}
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className={`${inputClass} resize-y`}
                  required
                />
              </label>

              <label htmlFor={fileId} className="block">
                <span className="mb-2 block text-sm text-white/90">
                  {t("laborRequest.attach")}
                </span>
                <div
                  dir="ltr"
                  className="rounded-lg border border-[#243044] bg-[#070d18] px-3 py-2.5"
                >
                  <input
                    ref={fileRef}
                    id={fileId}
                    type="file"
                    className="block w-full text-sm text-slate-300 file:rounded file:border-0 file:bg-white file:px-3 file:py-1 file:text-sm file:text-black"
                  />
                </div>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-linear-to-r from-[#2563eb] to-[#1d4ed8] py-3.5 text-base font-bold text-white transition hover:brightness-110"
          >
            {t("laborRequest.submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LaborRequestForm;
