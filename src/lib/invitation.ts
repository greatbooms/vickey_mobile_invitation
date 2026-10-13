import type { Language } from "../locales";
export function resolveLanguage(value: string | null): Language {
  return value === "ko" || value === "en" ? value : "zh";
}
export function countdown(date: string, now: number): number[] {
  const seconds = Math.max(0, Math.floor((Date.parse(date) - now) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
}
export function calendarDays(date: string): (number | null)[] {
  const [year, month] = date.slice(0, 10).split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const total = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return [
    ...Array<null>(first).fill(null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];
}
function escapeICS(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}
function utc(date: string) {
  return new Date(date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}
export function createCalendar(event: {
  start: string;
  end: string;
  title: string;
  location: string;
  description: string;
}): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Botanical Invitation//Wedding//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "UID:lin-yu-chen-yue-20261023@wedding-invitation",
    `DTSTAMP:${utc(new Date().toISOString())}`,
    `DTSTART:${utc(event.start)}`,
    `DTEND:${utc(event.end)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `LOCATION:${escapeICS(event.location)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // Fold by UTF-8 octets (RFC 5545); do not split a multibyte character.
  const encoder = new TextEncoder();
  return (
    lines
      .map((line) => {
        let result = "",
          width = 0;
        for (const char of line) {
          const bytes = encoder.encode(char).length;
          if (width + bytes > 75) {
            result += "\r\n ";
            width = 1;
          }
          result += char;
          width += bytes;
        }
        return result;
      })
      .join("\r\n") + "\r\n"
  );
}
export function amapUrl(venue: {
  lng: number;
  lat: number;
  name: string;
}): string {
  const params = new URLSearchParams({
    position: `${venue.lng},${venue.lat}`,
    name: venue.name,
    coordinate: "gaode",
    callnative: "1",
    src: "wedding-invitation",
  });
  return `https://uri.amap.com/marker?${params}`;
}

export function formatEventTime(
  date: string,
  timezone: string,
  locale: string,
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "long",
  }).format(new Date(date));
}
