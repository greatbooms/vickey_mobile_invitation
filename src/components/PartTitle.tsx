import { useLayoutEffect, useRef } from "react";

export function PartTitle({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const line = text.replace(/\s+/g, " ").trim();
  useLayoutEffect(() => {
    const heading = headingRef.current;
    const content = lineRef.current;
    if (!heading || !content) return;
    let previousWidth = -1;
    const fit = () => {
      const available = heading.clientWidth;
      if (!available || available === previousWidth) return;
      previousWidth = available;
      heading.style.fontSize = "22px";
      const width = content.getBoundingClientRect().width;
      heading.style.fontSize = `${Math.min(22, (22 * (available - 1)) / width)}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(heading.parentElement || heading);
    return () => observer.disconnect();
  }, [line]);
  return (
    <h2 className="part-title" ref={headingRef}>
      <span className="part-line" ref={lineRef}>
        {line}
      </span>
    </h2>
  );
}
