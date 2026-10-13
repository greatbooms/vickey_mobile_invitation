import { useState } from "react";
import { Copy, MapPin, Navigation } from "lucide-react";
import { locales, type Language } from "../locales";

export function LocationMap({
  name,
  address,
  url,
  image,
  language,
  onCopy,
  loading = "lazy",
}: {
  name: string;
  address: string;
  url: string;
  image?: string;
  language: Language;
  onCopy: (value: string) => Promise<void>;
  loading?: "eager" | "lazy";
}) {
  const c = locales[language];
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    image ? "loading" : "error",
  );
  const [attempt, setAttempt] = useState(0);
  return (
    <div className="location-map">
      <div className="location-map-frame" aria-busy={status === "loading"}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} · ${c.map}`}
        >
          {image && (
            <img
              key={attempt}
              src={`${image}${attempt ? `?retry=${attempt}` : ""}`}
              alt={`${name} · 高德地图`}
              width="1000"
              height="650"
              loading={loading}
              decoding="async"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              style={{ opacity: status === "loaded" ? 1 : 0 }}
            />
          )}
        </a>
        {status !== "loaded" && (
          <div className="location-map-status" role="status">
            <MapPin size={24} strokeWidth={1.3} />
            <span>{status === "error" ? c.imageFailed : c.imageLoading}</span>
            {status === "error" && image && (
              <button
                className="text-button"
                onClick={() => {
                  setStatus("loading");
                  setAttempt((value) => value + 1);
                }}
              >
                {c.retry}
              </button>
            )}
          </div>
        )}
      </div>
      <div className="location-map-actions">
        <a
          className="button outlined"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={16} />
          {c.map}
        </a>
        <button className="button outlined" onClick={() => onCopy(address)}>
          <Copy size={16} />
          {c.copyAddress}
        </button>
      </div>
    </div>
  );
}
