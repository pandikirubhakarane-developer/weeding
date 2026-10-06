'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CalendarPlus, MapPin, Share2 } from 'lucide-react';
import { wedding as w, weddingStart } from '@/config/wedding';
import { useLang } from '@/lib/i18n';

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 text-center font-tamil text-2xl font-semibold text-royal"><span className="mb-1 block text-antique">❖</span>{children}</h2>
);
const Sec = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <section className={`px-5 py-12 ${dark ? 'kolam bg-maroon text-ivory' : ''}`}><div className="mx-auto max-w-md">{children}</div></section>
);

function Calendar() {
  const { t, tag } = useLang();
  const [y, m] = w.weddingDate.split('-').map(Number); const day = Number(w.weddingDate.slice(8));
  const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(); const n = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const wd = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(tag, { weekday: 'narrow', timeZone: 'UTC' }).format(new Date(Date.UTC(2023, 0, 1 + i))));
  const month = new Intl.DateTimeFormat(tag, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, 1)));
  const cells = [...Array(first).fill(null), ...Array.from({ length: n }, (_, i) => i + 1)];
  return (<>
    <Title>{t.saveDate}</Title>
    <div className="temple rounded-md bg-white/60 p-4">
      <div className="mb-3 text-center font-tamil text-xl text-maroon">{month}</div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {wd.map((d, i) => <div key={i} className="font-semibold text-antique">{d}</div>)}
        {cells.map((c, i) => <div key={i} className="grid h-10 place-items-center">{c === day
          ? <span className="pulse-ring relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-royal to-maroon text-lg font-bold text-gold ring-2 ring-gold">{c}<span className="absolute -right-1 -top-2 text-xs">❤️</span></span>
          : c}</div>)}
      </div>
    </div></>);
}

function Countdown() {
  const { t } = useLang(); const [ms, setMs] = useState<number | null>(null);
  useEffect(() => { const tick = () => setMs(weddingStart().getTime() - Date.now()); tick(); const id = setInterval(tick, 1000); return () => clearInterval(id); }, []);
  if (ms === null) return <div className="h-24" />;
  if (ms <= 0) return <p className="text-center font-tamil text-xl text-gold">{t.celebrate}</p>;
  const s = Math.floor(ms / 1000);
  const parts = [[Math.floor(s / 86400), t.days], [Math.floor(s / 3600) % 24, t.hours], [Math.floor(s / 60) % 60, t.minutes], [s % 60, t.seconds]] as const;
  return (<><p className="mb-4 text-center font-tamil text-xl text-gold">{t.until}</p>
    <div className="grid grid-cols-4 gap-2" role="timer">{parts.map(([v, l]) => <div key={l} className="rounded-md border border-gold/70 bg-black/20 py-3 text-center">
      <div className="font-display text-3xl font-bold tabular-nums text-gold">{String(v).padStart(2, '0')}</div><div className="font-tamil text-[11px]">{l}</div></div>)}</div></>);
}

function Card({ title, date, time, venue, address }: { title: string; date: string; time?: string | null; venue?: string | null; address?: string | null }) {
  const { t } = useLang();
  const rows = [[t.date, date], [t.time, time], [t.venue, venue], [t.address, address]].filter(r => r[1]);
  return <div className="temple mb-6 rounded-md bg-white/60 p-5"><h3 className="mb-3 text-center font-tamil text-lg font-semibold text-royal">{title}</h3>
    {rows.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-t border-antique/30 py-2 font-tamil text-sm"><span className="text-antique">{k}</span><span className="text-right">{v}</span></div>)}</div>;
}

function cal() {
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
  const s = weddingStart(), e = new Date(s.getTime() + 3 * 3600e3);
  return { s: f(s), e: f(e), body: ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN', 'BEGIN:VEVENT', `UID:${f(s)}@wedding`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(s)}`, `DTEND:${f(e)}`,
    `SUMMARY:${w.groomShort} & ${w.brideShort} Wedding`, `LOCATION:${[w.venueName, w.venueAddress].filter(Boolean).join(', ')}`, `DESCRIPTION:${w.mapsUrl}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n') };
}

export default function Sections({ dateStr }: { dateStr: string }) {
  const { t, tag } = useLang(); const [copied, setCopied] = useState(false); const [light, setLight] = useState<string | null>(null);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare('share' in navigator), []);
  const fmt = (d: string) => new Intl.DateTimeFormat(tag, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${d}T00:00:00Z`));
  const download = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([cal().body], { type: 'text/calendar' })); a.download = 'wedding.ics'; a.click(); };
  const share = async () => {
    const url = w.invitationUrl || location.href;
    try { if (navigator.share) await navigator.share({ title: document.title, url }); else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } } catch {}
  };
  const btn = 'inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gold bg-royal px-5 font-tamil text-sm text-ivory shadow';
  const g = cal();
  return (<>
    <Sec><Calendar /><p className="mt-4 text-center font-display text-xl text-maroon">{dateStr}</p>
      {w.weddingTime && <div className="mt-5 flex flex-wrap justify-center gap-3">
        <button onClick={download} className={btn}><CalendarPlus size={16} />{t.addCal}</button>
        <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${w.groomShort} & ${w.brideShort} Wedding`)}&dates=${g.s}/${g.e}&location=${encodeURIComponent(w.venueName ?? '')}`}>{t.gcal}</a></div>}</Sec>
    <Sec dark><Countdown /></Sec>
    <Sec><Title>{t.detailsTitle}</Title>
      <Card title={t.wedding} date={fmt(w.weddingDate)} time={w.weddingTime} venue={w.venueName} address={w.venueAddress} />
      {w.receptionDate && <Card title={t.reception} date={fmt(w.receptionDate)} time={w.receptionTime} venue={w.venueName} address={w.venueAddress} />}</Sec>
    {w.mapsUrl && <Sec dark><Title>{t.venueTitle}</Title>
      <div className="temple rounded-md bg-ivory/10 p-6 text-center"><MapPin className="mx-auto mb-2 text-gold" size={36} />
        {w.venueName && <p className="font-tamil text-lg">{w.venueName}</p>}{w.venueAddress && <p className="font-tamil text-sm opacity-90">{w.venueAddress}</p>}
        <a href={w.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${btn} mt-4`}><MapPin size={16} />{t.openMaps}</a></div></Sec>}
    {w.enableStory && w.story.text && <Sec><Title>{t.storyTitle}</Title>{w.story.photo && <Image src={w.story.photo} alt="Couple" width={600} height={600} loading="lazy" className="mb-4 rounded-md" />}<p className="text-center font-tamil leading-relaxed">{w.story.text}</p></Sec>}
    {w.enableGallery && w.gallery.length > 0 && <Sec><Title>{t.galleryTitle}</Title><div className="grid grid-cols-2 gap-3">
      {w.gallery.map(p => <button key={p.src} onClick={() => setLight(p.src)}><Image src={p.src} alt={p.alt} width={400} height={500} loading="lazy" className="aspect-[4/5] rounded-md object-cover" /></button>)}</div>
      {light && <div onClick={() => setLight(null)} role="dialog" aria-modal className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"><Image src={light} alt="" width={900} height={1100} className="max-h-full w-auto object-contain" /></div>}</Sec>}
    <Sec><Title>{t.blessTitle}</Title><p className="text-center font-tamil text-lg leading-loose">{t.blessings}</p>
      <div className="mt-6 text-center"><button onClick={share} className={btn}><Share2 size={16} />{copied ? t.copied : canShare ? t.share : t.copy}</button></div></Sec>
  </>);
}
