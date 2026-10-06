'use client';
import { useState } from 'react';
import { Languages } from 'lucide-react';
import { languages } from '@/locales';
import { useLang } from '@/lib/i18n';
export default function LanguageSelector() {
  const { code, setCode, t } = useLang(); const [o, setO] = useState(false);
  return (
    <div className="fixed left-3 top-3 z-30">
      <button onClick={() => setO(!o)} aria-label={t.lang} aria-expanded={o} className="grid h-11 w-11 place-items-center rounded-full border border-gold bg-maroon/90 text-gold shadow-lg"><Languages size={20} /></button>
      {o && <ul role="listbox" className="mt-2 max-h-[70svh] w-40 overflow-auto rounded-lg border border-gold bg-ivory py-1 shadow-xl">
        {languages.map(l => <li key={l.code}><button role="option" aria-selected={l.code === code} onClick={() => { setCode(l.code); setO(false); }}
          className={`w-full px-4 py-2.5 text-left font-tamil ${l.code === code ? 'bg-royal text-ivory' : 'text-ink'}`}>{l.label}</button></li>)}
      </ul>}
    </div>
  );
}
