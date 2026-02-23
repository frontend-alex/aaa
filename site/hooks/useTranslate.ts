import { useTranslationContext } from "../lib/context/TranslationContext";
import { dictionaries, TranslationKey } from "../lib/i18n/dictionaries";

export function useTranslate() {
  const { language, setLanguage } = useTranslationContext();

  const t = (key: TranslationKey | string) => {
    // We cast this to any initially or safely access it
    const translation = (dictionaries[language] as any)[key];
    return translation || key;
  };

  return { t, language, setLanguage };
}
