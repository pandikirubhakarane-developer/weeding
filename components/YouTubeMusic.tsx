"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

export type YouTubeMusicHandle = {
  play: () => void;
  pause: () => void;
};

/*
 * Wedding Background Song
 *
 * YouTube:
 * https://www.youtube.com/watch?v=x84OUIVai3Y
 *
 * To change the song later,
 * only change this VIDEO_ID.
 */
const VIDEO_ID = "x84OUIVai3Y";

const YouTubeMusic = forwardRef<YouTubeMusicHandle>(
  (_, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const sendCommand = (func: string) => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args: [],
        }),
        "*",
      );
    };

    useImperativeHandle(ref, () => ({
      play() {
        sendCommand("playVideo");
      },

      pause() {
        sendCommand("pauseVideo");
      },
    }));

    return (
      <div
        className="
          pointer-events-none
          fixed
          bottom-0
          left-0
          h-px
          w-px
          overflow-hidden
          opacity-0
        "
        aria-hidden="true"
      >
        <iframe
          ref={iframeRef}
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=0&controls=0&playsinline=1&loop=1&playlist=${VIDEO_ID}&rel=0`}
          title="Wedding background music"
          allow="autoplay; encrypted-media"
          tabIndex={-1}
        />
      </div>
    );
  },
);

YouTubeMusic.displayName = "YouTubeMusic";

export default YouTubeMusic;