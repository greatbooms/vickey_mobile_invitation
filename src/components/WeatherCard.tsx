import { useEffect, useState, type CSSProperties } from "react";
import {
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  LoaderCircle,
  Moon,
  Sun,
} from "lucide-react";
import type { Language } from "../locales";
import { weatherCopy } from "../locales/weather";
import { invitation } from "../invitation";

interface Day {
  date: string;
  code: string;
  text: string;
  high: number;
  low: number;
  rain: number | null;
}
interface Weather {
  updatedAt: string;
  stale: boolean;
  current: {
    code: string;
    text: string;
    temperature: number;
    windSpeed: number;
    uv: number | null;
  };
  days: Day[];
}
const languageCodes = { zh: "zh-CN", ko: "ko-KR", en: "en-US" };
function conditionText(
  condition: { code: string; text: string },
  language: Language,
) {
  if (language === "ko" && ["100", "150"].includes(condition.code))
    return "맑음";
  return condition.text;
}
function WeatherIcon({ code, size = 27 }: { code: string; size?: number }) {
  const n = Number(code);
  const Icon =
    n === 100
      ? Sun
      : n === 150
        ? Moon
        : n === 101 ||
            n === 102 ||
            n === 103 ||
            n === 151 ||
            n === 152 ||
            n === 153
          ? CloudSun
          : n >= 300 && n < 400
            ? CloudRain
            : n >= 400 && n < 500
              ? CloudSnow
              : n >= 500 && n < 600
                ? CloudFog
                : Cloud;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
function dateAtVenue(date: Date) {
  const parts = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: invitation.timezone,
  }).formatToParts(date);
  return ["year", "month", "day"]
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join("-");
}
export function WeatherCard({ language }: { language: Language }) {
  const c = weatherCopy[language];
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setWeather(null);
    setLoading(true);
    const timeout = setTimeout(() => controller.abort(), 12_000);
    let active = true;
    fetch(`/api/weather?lang=${language}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unavailable");
        const data = await response.json();
        if (!data.current || !Array.isArray(data.days) || !data.days.length)
          throw new Error("Invalid weather");
        if (active) setWeather(data);
      })
      .catch(() => {
        /* The invitation remains usable when weather is unavailable. */
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [language, attempt]);
  useEffect(() => {
    const id = setInterval(() => setAttempt((value) => value + 1), 30 * 60_000);
    return () => clearInterval(id);
  }, []);
  const today = dateAtVenue(new Date());
  const tomorrow = dateAtVenue(new Date(Date.now() + 86400_000));
  const weddingDay = invitation.date.slice(0, 10);
  const formatter = new Intl.DateTimeFormat(languageCodes[language], {
    weekday: "short",
    timeZone: invitation.timezone,
  });
  const days = weather?.days || [];
  const min = Math.min(...days.map((day) => day.low));
  const max = Math.max(...days.map((day) => day.high));
  const y = (temperature: number) =>
    22 + ((max - temperature) / Math.max(1, max - min)) * 65;
  return (
    <section
      className="weather-card"
      aria-labelledby="weather-title"
      aria-busy={loading}
    >
      <h3 id="weather-title">{c.title}</h3>
      {weather ? (
        <>
          {weather.stale && (
            <p className="weather-status" role="status">
              {c.stale}
            </p>
          )}
          <div className="weather-current">
            <div>
              <p className="weather-city">{c.city}</p>
              <p className="weather-temperature">
                <span>{c.current}</span>{" "}
                {Math.round(weather.current.temperature)}
                <small>°C</small>
              </p>
              <p className="weather-condition">
                {conditionText(weather.current, language)} · {c.wind}{" "}
                {weather.current.windSpeed.toFixed(1)} m/s
                {weather.current.uv !== null && (
                  <>
                    {" "}
                    · {c.uv} {Math.round(weather.current.uv)}
                  </>
                )}
              </p>
            </div>
            <WeatherIcon code={weather.current.code} size={52} />
          </div>
          <p className="weather-forecast-title">{c.forecast}</p>
          <p className="weather-swipe">{c.hint}</p>
          <div
            className="weather-scroll"
            tabIndex={0}
            role="region"
            aria-label={c.forecast}
          >
            <div
              className="weather-week"
              style={{ "--forecast-days": days.length } as CSSProperties}
            >
              <ol className="weather-days">
                {days.map((day) => (
                  <li
                    key={day.date}
                    className={day.date === weddingDay ? "weather-wedding" : ""}
                  >
                    <span>
                      {day.date === today
                        ? c.today
                        : day.date === tomorrow
                          ? c.tomorrow
                          : formatter.format(
                              new Date(`${day.date}T12:00:00+08:00`),
                            )}
                    </span>
                    <time dateTime={day.date}>
                      {Number(day.date.slice(5, 7))}/
                      {Number(day.date.slice(8, 10))}
                    </time>
                    <WeatherIcon code={day.code} />
                    <span className="weather-day-description">
                      {conditionText(day, language)}
                    </span>
                    <span className="sr-only">
                      {Math.round(day.high)}°C / {Math.round(day.low)}°C
                    </span>
                    {day.date === weddingDay && (
                      <span className="weather-wedding-tag">{c.wedding}</span>
                    )}
                  </li>
                ))}
              </ol>
              <svg
                className="weather-chart"
                viewBox={`0 0 ${days.length * 65} 115`}
                aria-hidden="true"
              >
                <polyline
                  className="weather-high"
                  points={days
                    .map((day, i) => `${i * 65 + 32.5},${y(day.high)}`)
                    .join(" ")}
                />
                <polyline
                  className="weather-low"
                  points={days
                    .map((day, i) => `${i * 65 + 32.5},${y(day.low)}`)
                    .join(" ")}
                />
                {days.map((day, i) => (
                  <g key={day.date}>
                    <circle
                      className="weather-high"
                      cx={i * 65 + 32.5}
                      cy={y(day.high)}
                      r="2.5"
                    />
                    <text x={i * 65 + 32.5} y={y(day.high) - 9}>
                      {Math.round(day.high)}°
                    </text>
                    <circle
                      className="weather-low"
                      cx={i * 65 + 32.5}
                      cy={y(day.low)}
                      r="2.5"
                    />
                    <text
                      className="weather-low-label"
                      x={i * 65 + 32.5}
                      y={y(day.low) + 18}
                    >
                      {Math.round(day.low)}°
                    </text>
                  </g>
                ))}
              </svg>
              <ol className="weather-rain">
                {days.map((day) => (
                  <li
                    key={day.date}
                    aria-label={`${day.date} ${c.rain}: ${day.rain === null ? "—" : `${day.rain}%`}`}
                  >
                    <Droplets size={12} aria-hidden="true" />
                    {day.rain === null ? "—" : `${day.rain}%`}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          {weddingDay >= today &&
            !days.some((day) => day.date === weddingDay) && (
              <p className="weather-note">{c.pending}</p>
            )}
          <p className="weather-updated">
            {c.updated}:{" "}
            {new Intl.DateTimeFormat(languageCodes[language], {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              timeZone: invitation.timezone,
            }).format(new Date(weather.updatedAt))}{" "}
            (UTC+8)
          </p>
        </>
      ) : (
        <div className="weather-status" role="status">
          {loading && <LoaderCircle size={18} className="spin" />}
          {loading ? c.loading : c.unavailable}
          {!loading && (
            <button
              className="text-button"
              onClick={() => setAttempt((value) => value + 1)}
            >
              {c.retry}
            </button>
          )}
        </div>
      )}
      <p className="weather-note">{c.nearby}</p>
      <a
        className="weather-source"
        href="https://www.qweather.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {c.source}
      </a>
    </section>
  );
}
