"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Music({
  muted,
  toggle,
}: {
  muted: boolean;
  toggle: () => void;
}) {
  const { t } = useLang();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!muted}
      aria-label={muted ? t.musicOff : t.musicOn}
      className="
        fixed
        right-4
        top-4
        z-[9999]
        grid
        h-12
        w-12
        place-items-center
        rounded-full
        border
        border-gold
        bg-maroon/95
        text-gold
        shadow-[0_8px_30px_rgba(0,0,0,.35)]
        backdrop-blur-md
        transition
        duration-300
        hover:scale-105
        active:scale-95
      "
    >
      {muted ? <VolumeX size={21} /> : <Volume2 size={21} />}
    </button>
  );
}
