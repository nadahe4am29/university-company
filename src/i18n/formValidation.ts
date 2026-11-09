import i18n from "./index";

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isField = (target: EventTarget | null): target is Field =>
  target instanceof HTMLInputElement ||
  target instanceof HTMLTextAreaElement ||
  target instanceof HTMLSelectElement;

function messageFor(field: Field): string {
  const { validity } = field;
  if (validity.valueMissing) {
    if (field instanceof HTMLSelectElement) return i18n.t("validation.selectOption");
    if (field instanceof HTMLInputElement && field.type === "file") return i18n.t("validation.chooseFile");
    return i18n.t("validation.required");
  }
  if (validity.typeMismatch && field instanceof HTMLInputElement && field.type === "email") {
    return i18n.t("validation.email");
  }
  return i18n.t("validation.invalid");
}

/**
 * Replaces the browser's built-in form validation messages (shown in the
 * device language) with messages in the site's current language.
 * `invalid` doesn't bubble, so listen in the capture phase on the document.
 */
export function installLocalizedValidation() {
  document.addEventListener(
    "invalid",
    (event) => {
      if (!isField(event.target)) return;
      const field = event.target;
      field.setCustomValidity("");
      // Read validity directly: checkValidity() would fire "invalid" again.
      if (!field.validity.valid) field.setCustomValidity(messageFor(field));
    },
    true,
  );

  // Clear the custom message as the user edits, so the field can become valid again.
  const clear = (event: Event) => {
    if (isField(event.target)) event.target.setCustomValidity("");
  };
  document.addEventListener("input", clear, true);
  document.addEventListener("change", clear, true);
}
