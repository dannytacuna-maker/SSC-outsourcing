"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SscExperience.module.css";

export const REELS = [
  "/media/reel-05.mp4",
  "/media/reel-01.mp4",
  "/media/reel-02.mp4",
  "/media/reel-03.mp4",
  "/media/reel-06.mp4",
  "/media/reel-07.mp4",
  "/media/reel-08.mp4",
] as const;

const CUT_EARLY_MS = 220;

type FrameVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: () => void) => number;
};

export function HeroReel() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
  const [front, setFront] = useState<"a" | "b">("a");
  const [cover, setCover] = useState<"a" | "b" | null>(null);

  useEffect(() => {
    const slotA = aRef.current;
    const slotB = bRef.current;
    if (!slotA || !slotB) return;

    let cancelled = false;
    let timer = 0;

    const other = (el: HTMLVideoElement) => (el === slotA ? slotB : slotA);
    const nameOf = (el: HTMLVideoElement): "a" | "b" =>
      el === slotA ? "a" : "b";

    const assign = (el: HTMLVideoElement, i: number) => {
      const src = REELS[i];
      if (el.dataset.src !== src) {
        el.dataset.src = src;
        el.src = src;
        el.load();
      }
      try {
        if (el.currentTime > 0.03) el.currentTime = 0;
      } catch {
        /* ignore seek before ready */
      }
    };

    const waitFrame = (el: FrameVideo, fn: () => void) => {
      let done = false;
      const run = () => {
        if (done || cancelled) return;
        done = true;
        fn();
      };
      if (typeof el.requestVideoFrameCallback === "function") {
        el.requestVideoFrameCallback(() => run());
      } else {
        el.addEventListener("playing", run, { once: true });
      }
    };

    const armCut = (el: HTMLVideoElement) => {
      window.clearTimeout(timer);
      const schedule = () => {
        if (cancelled) return;
        const dur = el.duration;
        if (!Number.isFinite(dur) || dur <= 0) return;
        timer = window.setTimeout(
          () => cutFrom(el),
          Math.max(400, dur * 1000 - CUT_EARLY_MS),
        );
      };
      if (el.readyState >= 1) schedule();
      else el.addEventListener("loadedmetadata", schedule, { once: true });
    };

    const cutFrom = (outgoing: HTMLVideoElement) => {
      if (cancelled) return;
      const nextI = (indexRef.current + 1) % REELS.length;
      const incoming = other(outgoing);
      assign(incoming, nextI);

      const playIncoming = () => {
        if (cancelled) return;
        const play = incoming.play();
        if (play) play.catch(() => undefined);
        waitFrame(incoming as FrameVideo, () => {
          if (cancelled) return;
          setCover(nameOf(incoming));
          requestAnimationFrame(() => {
            if (cancelled) return;
            setFront(nameOf(incoming));
            setCover(null);
            indexRef.current = nextI;
            outgoing.pause();
            assign(outgoing, (nextI + 1) % REELS.length);
            armCut(incoming);
          });
        });
      };

      if (incoming.readyState >= 2) playIncoming();
      else incoming.addEventListener("canplay", playIncoming, { once: true });
    };

    assign(slotA, 0);
    assign(slotB, 1);

    const start = () => {
      if (cancelled) return;
      const play = slotA.play();
      if (play) play.catch(() => undefined);
      waitFrame(slotA as FrameVideo, () => {
        if (cancelled) return;
        setFront("a");
        armCut(slotA);
      });
    };
    if (slotA.readyState >= 2) start();
    else slotA.addEventListener("canplay", start, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      slotA.pause();
      slotB.pause();
    };
  }, []);

  function slotClass(slot: "a" | "b") {
    if (cover === slot) return `${styles.video} ${styles.videoCover}`;
    if (front === slot) return `${styles.video} ${styles.videoFront}`;
    return styles.video;
  }

  return (
    <div className={styles.media} aria-hidden="true">
      <video
        ref={aRef}
        className={slotClass("a")}
        src={REELS[0]}
        muted
        playsInline
        preload="auto"
      />
      <video
        ref={bRef}
        className={slotClass("b")}
        src={REELS[1]}
        muted
        playsInline
        preload="auto"
      />
      <div className={styles.overlay} />
    </div>
  );
}
