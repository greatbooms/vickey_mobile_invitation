import { describe, expect, it, vi } from "vitest";
import { createWeatherService } from "../server/weather.mjs";

const current = {
  condition: { code: "100", text: "晴" },
  temperature: { value: 25.8 },
  wind: { speed: { value: 2.5 } },
  uvIndex: 3,
};
const forecast = {
  days: [
    {
      forecastStartTime: "2026-10-12T00:00+08:00",
      temperatureMax: { value: 26 },
      temperatureMin: { value: 16 },
      daytime: {
        condition: { code: "100", text: "晴" },
        precipitation: { probability: 0.2 },
      },
      nighttime: { precipitation: { probability: 0.5 } },
    },
  ],
};

describe("weather server", () => {
  it("normalizes the provider response and shares concurrent requests", async () => {
    const fetcher = vi.fn(
      async (url: string) =>
        new Response(
          JSON.stringify(url.includes("/current/") ? current : forecast),
        ),
    );
    const service = createWeatherService({
      host: "example.qweatherapi.com",
      key: "server-secret",
      fetcher,
    });
    const [a, b] = await Promise.all([service("zh"), service("zh")]);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(a).toEqual(b);
    expect(a.days[0]).toMatchObject({ date: "2026-10-12", rain: 50 });
    expect(a.current.temperature).toBe(25.8);
    expect(JSON.stringify(a)).not.toContain("server-secret");
    await service("zh");
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
  it("uses recent cached weather after an upstream failure, but rejects expired data", async () => {
    let now = Date.parse("2026-10-12T00:00Z");
    const fetcher = vi.fn(
      async (url: string) =>
        new Response(
          JSON.stringify(url.includes("/current/") ? current : forecast),
        ),
    );
    const service = createWeatherService({
      host: "example.qweatherapi.com",
      key: "secret",
      fetcher,
      clock: () => now,
    });
    await service("ko");
    fetcher.mockRejectedValue(new Error("offline"));
    now += 31 * 60_000;
    expect((await service("ko")).stale).toBe(true);
    now += 24 * 60 * 60_000;
    await expect(service("ko")).rejects.toThrow();
  });
  it("rejects invalid upstream payloads rather than inventing weather", async () => {
    const service = createWeatherService({
      host: "example.qweatherapi.com",
      key: "secret",
      fetcher: async () => new Response("{}"),
    });
    await expect(service("en")).rejects.toThrow();
  });
});
