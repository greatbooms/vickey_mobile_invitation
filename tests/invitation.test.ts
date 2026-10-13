import { describe, expect, it } from "vitest";
import {
  resolveLanguage,
  formatEventTime,
  countdown,
  calendarDays,
  createCalendar,
  amapUrl,
} from "../src/lib/invitation";
describe("invitation behavior", () => {
  it("keeps supported languages and defaults unsupported values to Chinese", () => {
    expect(resolveLanguage("ko")).toBe("ko");
    expect(resolveLanguage("en")).toBe("en");
    expect(resolveLanguage(null)).toBe("zh");
    expect(resolveLanguage("fr")).toBe("zh");
  });
  it("counts actual elapsed time and clamps past dates", () => {
    expect(
      countdown(
        "2027-05-16T16:00:00+08:00",
        Date.parse("2027-05-15T07:00:00Z"),
      ),
    ).toEqual([1, 1, 0, 0]);
    expect(countdown("2020-01-01T00:00:00Z", Date.now())).toEqual([0, 0, 0, 0]);
  });
  it("uses the wedding local date and includes leap-year month padding", () => {
    const days = calendarDays("2024-02-01T01:00:00+08:00");
    expect(days.slice(0, 5)).toEqual([null, null, null, null, 1]);
    expect(days.at(-1)).toBe(29);
    expect(days.length).toBe(33);
  });
  it("exports UTC calendar times and escapes special characters", () => {
    const ics = createCalendar({
      start: "2027-05-16T16:00:00+08:00",
      end: "2027-05-16T20:00:00+08:00",
      title: "Lin, Yue",
      location: "Hall; A",
      description: "Hello\nWorld",
    });
    expect(ics).toContain("DTSTART:20270516T080000Z");
    expect(ics).toContain("DTEND:20270516T120000Z");
    expect(ics).toContain("SUMMARY:Lin\\, Yue");
    expect(ics).toContain("LOCATION:Hall\\; A");
    expect(ics).toContain("DESCRIPTION:Hello\\nWorld");
    expect(ics).toContain("\r\n");
  });
  it("creates a GCJ-02 marker URL with encoded venue text", () => {
    const url = new URL(
      amapUrl({ lng: 121.4737, lat: 31.2304, name: "花园 & Hall" }),
    );
    expect(url.hostname).toBe("uri.amap.com");
    expect(url.searchParams.get("position")).toBe("121.4737,31.2304");
    expect(url.searchParams.get("name")).toBe("花园 & Hall");
    expect(url.searchParams.get("coordinate")).toBe("gaode");
  });
});

it("formats the configured ceremony time instead of fixed preview copy", () => {
  expect(
    formatEventTime("2027-05-16T18:30:00+08:00", "Asia/Shanghai", "en-US"),
  ).toContain("6:30");
  expect(
    formatEventTime("2027-05-16T18:30:00+08:00", "Asia/Seoul", "ko-KR"),
  ).toContain("7:30");
});
