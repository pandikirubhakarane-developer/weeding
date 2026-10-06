'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getDict, languages, Dict } from '@/locales';
type Ctx = { code: string; t: Dict; tag: string; setCode: (c: string) => void };
const C = createContext<Ctx>(null!);
export const useLang = () => useContext(C);
export function LangProvider({ children }: { children: ReactNode }) {
  const [code, set] = useState('ta');
  useEffect(() => { try { const s = localStorage.getItem('lang'); if (s && languages.some(l => l.code === s)) set(s); } catch {} }, []);
  useEffect(() => { document.documentElement.lang = code; }, [code]);
  const setCode = (c: string) => { set(c); try { localStorage.setItem('lang', c); } catch {} };
  return <C.Provider value={{ code, t: getDict(code), tag: languages.find(l => l.code === code)!.tag, setCode }}>{children}</C.Provider>;
}
