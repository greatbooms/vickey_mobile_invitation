import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "../locales";
import photos from "../gallery.json";

const copy = {
  zh: {
    title: "我们的照片",
    photo: "照片",
    previous: "上一张",
    next: "下一张",
    hint: "左右滑动，或点选下方照片",
    error: "照片暂时无法加载",
    retry: "重新加载",
  },
  ko: {
    title: "우리의 사진",
    photo: "사진",
    previous: "이전 사진",
    next: "다음 사진",
    hint: "좌우로 넘기거나 아래 사진을 골라보세요",
    error: "사진을 불러오지 못했어요",
    retry: "다시 불러오기",
  },
  en: {
    title: "Our photos",
    photo: "Photo",
    previous: "Previous photo",
    next: "Next photo",
    hint: "Swipe or choose a photo below",
    error: "This photo could not load",
    retry: "Try again",
  },
};

export function PhotoGallery({ language }: { language: Language }) {
  const c = copy[language];
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [visible, setVisible] = useState(false);
  const [imageState, setImageState] = useState<{
    key: string;
    status: "loaded" | "error";
  } | null>(null);
  const [retry, setRetry] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const photo = photos[index];
  const src = `/images/gallery/${photo.id}.webp`;
  const imageKey = `${photo.id}-${retry}`;
  const status = imageState?.key === imageKey ? imageState.status : "loading";
  const select = (next: number) => {
    setIndex((next + photos.length) % photos.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => setReducedMotion(media.matches);
    media.addEventListener("change", stop);
    return () => media.removeEventListener("change", stop);
  }, []);
  useEffect(() => {
    const next = new Image();
    next.src = `/images/gallery/${photos[(index + 1) % photos.length].id}.webp`;
  }, [index]);
  useEffect(() => {
    if (reducedMotion || !visible || status !== "loaded") return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden)
        timer = setTimeout(
          () => setIndex((value) => (value + 1) % photos.length),
          5000,
        );
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [reducedMotion, visible, status, index]);

  return (
    <div
      ref={root}
      className="photo-gallery"
      role="region"
      aria-label={c.title}
    >
      <div
        className="gallery-stage"
        tabIndex={0}
        aria-label={`${c.photo} ${index + 1} / ${photos.length}`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            select(index + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}
        onPointerDown={(event) => {
          start.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
        onPointerUp={(event) => {
          const point = start.current;
          start.current = null;
          if (!point) return;
          const dx = event.clientX - point.x,
            dy = event.clientY - point.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy))
            select(index + (dx < 0 ? 1 : -1));
        }}
      >
        <img
          key={imageKey}
          src={retry ? `${src}?retry=${retry}` : src}
          width={photo.width}
          height={photo.height}
          alt={`${c.title} · ${index + 1}`}
          draggable={false}
          fetchPriority={index === 0 ? "high" : "auto"}
          onLoad={() => setImageState({ key: imageKey, status: "loaded" })}
          onError={() => setImageState({ key: imageKey, status: "error" })}
        />
        {status === "error" && (
          <div className="gallery-error" role="status">
            <p>{c.error}</p>
            <button
              type="button"
              onClick={() => {
                setRetry((value) => value + 1);
              }}
            >
              {c.retry}
            </button>
          </div>
        )}
      </div>
      <div className="gallery-controls">
        <div className="gallery-navigation">
          <button
            type="button"
            aria-label={c.previous}
            onClick={() => select(index - 1)}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="gallery-count" aria-live="off">
            {String(index + 1).padStart(2, "0")} <i>/ {photos.length}</i>
          </span>
          <button
            type="button"
            aria-label={c.next}
            onClick={() => select(index + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <p className="gallery-hint">{c.hint}</p>
      <div className="gallery-thumbnails">
        {photos.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`${c.photo} ${i + 1}`}
            aria-pressed={i === index}
            onClick={() => select(i)}
          >
            <img
              src={`/images/gallery/${item.id}-thumb.webp`}
              width={192}
              height={192}
              loading="lazy"
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
}
