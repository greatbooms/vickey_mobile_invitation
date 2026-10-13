import venue from "../src/venue.json" with { type: "json" };
const TTL = 30 * 60_000;
const MAX_AGE = 24 * 60 * 60_000;

// Venue location: 南京山囿里酒店, from the confirmed AMap place link.
const LOCATION = {
  latitude: venue.coordinates.lat.toFixed(4),
  longitude: venue.coordinates.lng.toFixed(4),
};

function number(value) {
  if (typeof value !== "number" || !Number.isFinite(value))
    throw new Error("Invalid weather data");
  return value;
}
function condition(value) {
  if (
    !value ||
    typeof value.code !== "string" ||
    typeof value.text !== "string"
  )
    throw new Error("Invalid weather condition");
  return { code: value.code, text: value.text };
}

export function createWeatherService({
  host,
  key,
  fetcher = fetch,
  clock = Date.now,
}) {
  const cache = new Map();
  const pending = new Map();
  async function upstream(path, lang) {
    if (!host || !/^[a-z0-9.-]+\.qweatherapi\.com$/i.test(host) || !key)
      throw new Error("Weather is not configured");
    const url = new URL(
      `https://${host}/weather/v1/${path}/${LOCATION.latitude}/${LOCATION.longitude}`,
    );
    url.searchParams.set("lang", lang);
    url.searchParams.set("localTime", "true");
    if (path === "daily") url.searchParams.set("days", "10");
    const response = await fetcher(url.toString(), {
      headers: { "X-QW-Api-Key": key },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Weather provider unavailable");
    return response.json();
  }
  return async function getWeather(language) {
    const lang = ["zh", "ko", "en"].includes(language) ? language : "zh";
    const previous = cache.get(lang);
    if (previous && clock() - previous.fetched < TTL)
      return { ...previous.data, stale: false };
    if (pending.has(lang)) return pending.get(lang);
    const request = (async () => {
      try {
        const [current, forecast] = await Promise.all([
          upstream("current", lang),
          upstream("daily", lang),
        ]);
        if (!Array.isArray(forecast.days) || !forecast.days.length)
          throw new Error("Invalid forecast");
        const data = {
          updatedAt: new Date(clock()).toISOString(),
          current: {
            ...condition(current.condition),
            temperature: number(current.temperature?.value),
            windSpeed: number(current.wind?.speed?.value),
            uv:
              typeof current.uvIndex === "number"
                ? number(current.uvIndex)
                : null,
          },
          days: forecast.days.map((day) => {
            if (!/^\d{4}-\d{2}-\d{2}T/.test(day.forecastStartTime))
              throw new Error("Invalid forecast date");
            const probabilities = [
              day.daytime?.precipitation?.probability,
              day.nighttime?.precipitation?.probability,
            ].filter(
              (value) => typeof value === "number" && value >= 0 && value <= 1,
            );
            return {
              date: day.forecastStartTime.slice(0, 10),
              ...condition(day.daytime?.condition),
              high: number(day.temperatureMax?.value),
              low: number(day.temperatureMin?.value),
              rain: probabilities.length
                ? Math.round(Math.max(...probabilities) * 100)
                : null,
            };
          }),
        };
        cache.set(lang, { data, fetched: clock() });
        return { ...data, stale: false };
      } catch {
        if (previous && clock() - previous.fetched < MAX_AGE)
          return { ...previous.data, stale: true };
        throw new Error("Weather temporarily unavailable");
      } finally {
        pending.delete(lang);
      }
    })();
    pending.set(lang, request);
    return request;
  };
}

export const getWeather = createWeatherService({
  host: process.env.QWEATHER_API_HOST,
  key: process.env.QWEATHER_API_KEY,
});

export async function weatherHandler(request, response) {
  if (request.method !== "GET") {
    response.writeHead(405, { Allow: "GET" });
    response.end();
    return;
  }
  const language = new URL(request.url, "http://localhost").searchParams.get(
    "lang",
  );
  try {
    const data = await getWeather(language);
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": data.stale ? "no-store" : "public, max-age=300",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(JSON.stringify(data));
  } catch {
    response.writeHead(503, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    response.end(JSON.stringify({ error: "weather_unavailable" }));
  }
}
