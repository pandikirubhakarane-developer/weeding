"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { wedding as w } from "@/config/wedding";
import { useLang } from "@/lib/i18n";

import LanguageSelector from "./LanguageSelector";
import Music from "./Music";
import Sections from "./Sections";
import Couple from "./Couple";

import YouTubeMusic, { YouTubeMusicHandle } from "./YouTubeMusic";

/* =========================================================
   NAMES
========================================================= */

const Names = ({ className = "" }: { className?: string }) => (
  <div className={`font-display text-center ${className}`}>
    <div className="gold-text text-3xl font-bold leading-tight">
      {w.groomName}
    </div>

    <div className="my-1 text-xl" aria-label="and">
      ❤️
    </div>

    <div className="gold-text text-3xl font-bold leading-tight">
      {w.brideName}
    </div>
  </div>
);

/* =========================================================
   INVITATION
========================================================= */

export default function Invitation() {
  const { t, tag } = useLang();

  const reduce = useReducedMotion();

  /* ---------------------------------------------------------
     STATES
  --------------------------------------------------------- */

  const [stage, setStage] = useState<"loading" | "cover" | "open">("loading");

  const [opening, setOpening] = useState(false);

  const [lite, setLite] = useState(false);

  const [muted, setMuted] = useState(false);

  /* ---------------------------------------------------------
     YOUTUBE MUSIC REF
  --------------------------------------------------------- */

  const musicRef = useRef<YouTubeMusicHandle>(null);

  /* ---------------------------------------------------------
     INITIAL LOAD
  --------------------------------------------------------- */

  useEffect(() => {
    setLite(!!reduce || (navigator.hardwareConcurrency || 8) <= 4);

    try {
      setMuted(sessionStorage.getItem("muted") === "1");
    } catch {}

    const id = setTimeout(() => {
      setStage("cover");
    }, 1100);

    return () => clearTimeout(id);
  }, [reduce]);

  /* ---------------------------------------------------------
     OPEN INVITATION
  --------------------------------------------------------- */

  const open = () => {
    if (opening) return;

    setOpening(true);

    /*
     * IMPORTANT
     *
     * Start music directly from the user's click/tap.
     * Browsers are much more likely to allow playback here.
     */
    if (!muted) {
      musicRef.current?.play();
    }

    setTimeout(
      () => {
        setStage("open");
      },
      reduce ? 100 : 1700,
    );
  };

  /* ---------------------------------------------------------
     MUSIC ON / OFF
  --------------------------------------------------------- */

  const toggle = () => {
    const next = !muted;

    setMuted(next);

    try {
      sessionStorage.setItem("muted", next ? "1" : "0");
    } catch {}

    if (next) {
      musicRef.current?.pause();
    } else {
      musicRef.current?.play();
    }
  };

  /* ---------------------------------------------------------
     DATE
  --------------------------------------------------------- */

  const dateStr = new Intl.DateTimeFormat(tag, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${w.weddingDate}T00:00:00Z`));

  /* ---------------------------------------------------------
     PERFORMANCE
  --------------------------------------------------------- */

  const petals = lite ? 0 : 14;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen w-full max-w-none overflow-x-hidden">
      {/* =====================================================
          YOUTUBE BACKGROUND MUSIC

          This remains mounted during:
          loading -> cover -> invitation

          So changing stages DOES NOT destroy the player.
      ===================================================== */}

      <YouTubeMusic ref={musicRef} />

      {/* =====================================================
          MUSIC BUTTON

          IMPORTANT:
          Outside stage === "open"

          Therefore it will NOT disappear after opening.
      ===================================================== */}

      <Music muted={muted} toggle={toggle} />

      {/* =====================================================
          LOADING + COVER
      ===================================================== */}

      <AnimatePresence>
        {/* ================= LOADING ================= */}

        {stage === "loading" && (
          <motion.div
            key="load"
            exit={{
              opacity: 0,
            }}
            className="
              kolam
              fixed
              inset-0
              z-50
              grid
              place-items-center
              bg-maroon
            "
          >
            <div className="text-center text-gold">
              <div
                className="
                  mx-auto
                  h-14
                  w-14
                  animate-[spin-slow_2.4s_linear_infinite]
                  rounded-full
                  border-2
                  border-gold/30
                  border-t-gold
                "
              />

              <div className="mt-4 text-2xl">🪔</div>
            </div>
          </motion.div>
        )}

        {/* ================= COVER ================= */}

        {stage === "cover" && (
          <motion.div
            key="cover"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,

              transition: {
                duration: 0.8,
              },
            }}
            className="
              kolam
              fixed
              inset-0
              z-40
              grid
              place-items-center
              bg-maroon
              px-4
            "
          >
            {/* =========================================
                INVITATION CARD
            ========================================= */}

            <motion.button
              type="button"
              onClick={open}
              aria-label={t.tap}
              animate={
                opening
                  ? {
                      scale: 1.12,
                      opacity: 0,

                      transition: {
                        delay: 0.8,
                        duration: 0.8,
                      },
                    }
                  : {
                      y: [0, -4, 0],
                    }
              }
              transition={{
                repeat: opening ? 0 : Infinity,
                duration: 4,
              }}
              className="
                temple
                relative
                aspect-[3/4.3]
                w-[84vw]
                max-w-sm
                overflow-hidden
                rounded-md
                bg-ivory
                text-ink
                shadow-[0_30px_60px_rgba(0,0,0,.55)]
              "
            >
              {/* Kolam */}

              <div
                className="
                  kolam
                  absolute
                  inset-0
                  opacity-60
                "
              />

              {/* Border */}

              <div
                className="
                  absolute
                  inset-3
                  border
                  border-antique/70
                "
              />

              {/* Lotus */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-8
                  text-center
                  text-3xl
                "
              >
                🪷
              </div>

              {/* Invitation text */}

              <div
                className="
                  absolute
                  inset-x-0
                  top-[17%]
                  text-center
                  font-tamil
                  text-sm
                  tracking-wide
                  text-royal
                "
              >
                {t.invite}
              </div>

              {/* Couple Names */}

              <Names
                className="
                  absolute
                  inset-x-0
                  top-[24%]
                  [&>div]:!text-[1.6rem]
                "
              />

              {/* Tap text */}

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-7
                  px-6
                  text-center
                  font-tamil
                  text-sm
                  text-royal
                "
              >
                {t.tap}
              </div>

              {/* =====================================
                  RED RIBBON
              ===================================== */}

              <motion.div
                aria-hidden
                animate={
                  opening
                    ? {
                        x: "120%",
                        rotate: 4,
                        opacity: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.9,

                  ease: [0.6, 0, 0.2, 1],
                }}
                className="
                  absolute
                  -inset-x-2
                  top-1/2
                  h-16
                  -translate-y-1/2
                  bg-gradient-to-b
                  from-royal
                  via-[#a3132a]
                  to-maroon
                  shadow-[0_8px_14px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.2)]
                "
              >
                {/* Top gold */}

                <div
                  className="
                    absolute
                    inset-x-0
                    top-1.5
                    h-[3px]
                    bg-gradient-to-r
                    from-antique
                    via-gold
                    to-antique
                  "
                />

                {/* Bottom gold */}

                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-1.5
                    h-[3px]
                    bg-gradient-to-r
                    from-antique
                    via-gold
                    to-antique
                  "
                />

                {/* Heart */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    grid
                    h-12
                    w-12
                    -translate-x-1/2
                    -translate-y-1/2
                    place-items-center
                    rounded-full
                    border-2
                    border-gold
                    bg-maroon
                    text-xl
                    shadow-lg
                  "
                >
                  ❤️
                </div>
              </motion.div>
            </motion.button>

            {/* =========================================
                GOLD PARTICLES
            ========================================= */}

            {opening &&
              Array.from({
                length: petals,
              }).map((_, i) => (
                <motion.span
                  key={i}
                  className="
                    absolute
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-gold
                  "
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: Math.cos(i) * 140,

                    y: Math.sin(i * 2) * 220,

                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.6,
                    delay: 0.5,
                  }}
                />
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          OPENED INVITATION
      ===================================================== */}

      {stage === "open" && (
        <>
          {/* =================================================
              HERO
          ================================================= */}

          <header
            className="
    kolam
    relative
    flex
    min-h-[100svh]
    w-full
    max-w-none
    flex-col
    items-center
    justify-end
    overflow-hidden
    bg-maroon
    pb-10
    text-center
    text-ivory
  "
          >
            {/* Invitation text */}

            <div
              className="
                absolute
                inset-x-0
                top-16
                px-6
              "
            >
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.2,
                }}
                className="
                  font-tamil
                  text-lg
                  text-gold
                "
              >
                {t.invite}
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 1.6,
                }}
                className="
                  mx-auto
                  mt-3
                  max-w-xs
                  font-tamil
                  text-base
                  leading-relaxed
                  text-ivory/90
                "
              >
                {t.quote}
              </motion.p>
            </div>

            {/* Couple Illustration */}

            <Couple reduce={!!reduce} />

            {/* Names + Date */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.4,
                duration: 1,
              }}
              className="
                relative
                z-10
                px-4
              "
            >
              <div
                className="
                  font-display
                  text-3xl
                  font-bold
                  text-gold
                "
              >
                {w.groomName}
              </div>

              <div
                className="
                  font-tamil
                  text-lg
                  italic
                  text-ivory
                "
              >
                {t.weds}
              </div>

              <div
                className="
                  font-display
                  text-3xl
                  font-bold
                  text-gold
                "
              >
                {w.brideName}
              </div>

              <div
                className="
                  mt-2
                  font-display
                  text-2xl
                  tracking-[.3em]
                  text-ivory
                "
              >
                20 • 11 • 2026
              </div>
            </motion.div>
          </header>

          {/* =================================================
              SECTIONS
          ================================================= */}

          <Sections dateStr={dateStr} />

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer
            className="
              kolam
              bg-maroon
              px-6
              py-14
              text-center
              text-ivory
            "
          >
            <Couple reduce={!!reduce} small />

            <Names className="mt-4" />

            <p
              className="
                mt-3
                font-display
                text-2xl
                tracking-[.25em]
                text-gold
              "
            >
              20 • 11 • 2026
            </p>

            <p
              className="
                mx-auto
                mt-6
                max-w-xs
                font-tamil
                text-lg
                leading-relaxed
              "
            >
              {t.closing}
            </p>

            <p
              className="
                mt-6
                font-tamil
                text-gold
              "
            >
              {t.withLove}
            </p>

            <p
              className="
                font-display
                text-2xl
              "
            >
              {w.groomShort} &amp; {w.brideShort}
            </p>
          </footer>

          {/* Language */}

          <LanguageSelector />
        </>
      )}
    </main>
  );
}
