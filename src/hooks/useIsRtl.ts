import { useTranslation } from "react-i18next";

/** True when the interface is RTL (Arabic). Use to mirror horizontal motion and offsets. */
export function useIsRtl() {
  const { i18n } = useTranslation();
  return i18n.language.startsWith("ar");
}
