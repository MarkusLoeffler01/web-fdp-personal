"use client";

import { useRef } from "react";

interface Props {
  src: string;
  caption: string;
  permalink: string;
}

export function InstagramVideoCard({ src, caption, permalink }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handleMouseEnter() {
    videoRef.current?.play();
  }

  function handleMouseLeave() {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }

  return (
    <a
      href={permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="ig-card"
      aria-label={caption || "Instagram Reel öffnen"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="ig-card__img">
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div className="ig-card__overlay">
          <span className="ig-card__type-icon">&#9654;</span>
          {caption && <p className="ig-card__caption">{caption}</p>}
        </div>
      </div>
    </a>
  );
}
