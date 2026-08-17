"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TunnelIntro.module.css";

const VIDEO_SRC = "/videos/box.mp4";

export default function TunnelIntro({ text = "MANIKANT" }: { text?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaOk, setMediaOk] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video || !mediaOk) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const buildMask = () => {
      const w = Math.max(1, frame.clientWidth);
      const h = Math.max(1, frame.clientHeight);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const mask = document.createElement("canvas");
      mask.width = Math.floor(w * dpr);
      mask.height = Math.floor(h * dpr);
      const ctx = mask.getContext("2d");
      if (!ctx) return;

      ctx.scale(dpr, dpr);
      const family = getComputedStyle(document.body).fontFamily || "Inter, sans-serif";
      let size = h * 0.52;
      ctx.font = `900 ${size}px ${family}`;
      if ("letterSpacing" in ctx) {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "-0.04em";
      }
      const measured = ctx.measureText(text).width;
      size = Math.min(size, (size * (w * 0.88)) / Math.max(1, measured));
      ctx.font = `900 ${size}px ${family}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(text, w / 2, h / 2 + size * 0.02);

      const url = mask.toDataURL("image/png");
      video.style.maskImage = `url(${url})`;
      video.style.maskSize = "100% 100%";
      video.style.maskRepeat = "no-repeat";
      video.style.setProperty("-webkit-mask-image", `url(${url})`);
      video.style.setProperty("-webkit-mask-size", "100% 100%");
      video.style.setProperty("-webkit-mask-repeat", "no-repeat");
    };

    const resize = () => {
      buildMask();
      setReady(true);
      if (reduced) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
      });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(frame);
    resize();
    document.fonts?.ready?.then(() => {
      buildMask();
    });

    return () => {
      ro.disconnect();
      video.pause();
    };
  }, [text, mediaOk]);

  return (
    <section className={styles.intro}>
      <div className={styles.frame} ref={frameRef}>
        {mediaOk ? (
          <video
            ref={videoRef}
            className={styles.canvas}
            style={{ visibility: ready ? "visible" : "hidden" }}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onError={() => setMediaOk(false)}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <span className={styles.fallback}>{text}</span>
        )}
        <h1 className={styles.srOnly}>{text}</h1>
        <div className={styles.resumeActions}>
          <div className={styles.resumeButtons}>
            <a
              className={styles.resumeButton}
              href="/Manikant_Devops_resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="View resume"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </a>
            <a
              className={styles.resumeButton}
              href="/Manikant_Devops_resume.pdf"
              download="Manikant_Devops_resume.pdf"
              aria-label="Download resume"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v13" />
                <path d="m8 12 4 4 4-4" />
                <path d="M5 21h14" />
              </svg>
            </a>
          </div>
          <span className={styles.resumeLabel}>Resume</span>
        </div>
        <span className={styles.hint}>Scroll to enter</span>
      </div>
    </section>
  );
}
