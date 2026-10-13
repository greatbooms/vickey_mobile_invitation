import { useLayoutEffect, useRef, useState } from "react";

const tiles = [
  { src: "/images/pink/middle-1.jpg", height: 1024 },
  { src: "/images/pink/middle-2.jpg", height: 1024 },
  { src: "/images/pink/middle-3.jpg", height: 909 },
];
const cycleHeight = tiles.reduce((sum, tile) => sum + tile.height, 0);

// Keep each painted image short, including when translated content grows.
export function PaperBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);
  const scale = size.width / 640;
  const cycles = scale ? Math.ceil(size.height / (cycleHeight * scale)) : 1;
  let offset = 0;
  return (
    <div ref={ref} className="paper-background" aria-hidden="true">
      {Array.from({ length: cycles }, (_, cycle) =>
        tiles.map((tile, i) => {
          const top = offset * scale;
          offset += tile.height;
          return (
            <img
              key={`${cycle}-${i}`}
              src={tile.src}
              alt=""
              width="640"
              height={tile.height}
              style={{ top, height: tile.height * scale + 0.5 }}
            />
          );
        }),
      )}
    </div>
  );
}
