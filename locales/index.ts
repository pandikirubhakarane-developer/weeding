import ta from "./ta.json";
import en from "./en.json";
import hi from "./hi.json";
export type Dict = typeof en;
// Add a language: create locales/xx.json, import it here, add it to `dicts`. Missing keys fall back to English.
const dicts: Record<string, Partial<Dict>> = { ta, en, hi };
export const languages = [
  { code: "ta", label: "தமிழ்", tag: "ta-IN" },
  { code: "en", label: "English", tag: "en-IN" },
  { code: "hi", label: "हिन्दी", tag: "hi-IN" },
];
export const getDict = (code: string): Dict =>
  ({ ...en, ...(dicts[code] ?? {}) }) as Dict;
