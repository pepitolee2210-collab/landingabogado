"use client";

import { createContext, useContext } from "react";
import { en } from "./en";
import { es } from "./es";

export type Lang = "en" | "es";
export type Dict = typeof en;

export const DICTS: Record<Lang, Dict> = { en, es };
export const LANG_KEY = "ulp-lang";

type LangContextValue = {
  lang: Lang;
  dict: Dict;
  setLang: (lang: Lang) => void;
};

export const LangContext = createContext<LangContextValue>({
  lang: "en",
  dict: en,
  setLang: () => {},
});

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

export function readStoredLang(): Lang | null {
  try {
    const value = localStorage.getItem(LANG_KEY);
    return value === "en" || value === "es" ? value : null;
  } catch {
    return null;
  }
}

export function storeLang(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* almacenamiento bloqueado: la elección vive solo en memoria */
  }
}
