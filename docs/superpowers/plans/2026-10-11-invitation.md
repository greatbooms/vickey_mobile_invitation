# Wedding Invitation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. User approved the design and instructed implementation in this session.

**Goal:** Ship an editable illustrated trilingual static wedding invitation.
**Architecture:** React renders localized data; pure helpers handle dates, links and ICS. SDK integrations are isolated and optional.
**Tech Stack:** React, TypeScript, Vite, CSS, Vitest, local watercolor artwork.
**Spec:** ../specs/2026-10-11-invitation-design.md

## Global Constraints
- Chinese default; English and Korean complete translations.
- No photos, gallery, bank accounts, DB, or required third-party font/CDN.
- Dummy venue and date clearly marked; Asia/Shanghai event timezone.
- No real provider sharing or embedded map claims without configured credentials.

## Review Focus
- Past event: countdown clamps to zero.
- Month boundaries: correct weekday padding and leap-year days.
- Invalid URL language: falls back to Chinese without crashing.
- Calendar: ICS preserves actual UTC event time and escapes strings.
- Restricted browser: clipboard and SDK failure produce usable link/manual instructions.

### Task 1: Content and pure behavior
Files: src/invitation.ts, src/locales/index.ts, src/lib/invitation.ts, tests/invitation.test.ts.
Interfaces: resolveLanguage(value): Language; countdown(date, now): number[]; calendarDays(date): (number|null)[]; createCalendar(event): string; amapUrl(venue): string.
- [x] Write and run failing tests for language fallback, leap month padding, countdown and ICS escaping/timezone.
- [x] Implement event configuration, translation schema and helpers; run npm test.

### Task 2: Illustrated responsive interface
Files: src/App.tsx, src/main.tsx, src/style.css, src/components/Botanical.tsx, public/images/hero.png, index.html.
- [x] Implement complete localized page, language URL persistence, calendar download, timeline, venue and accessible dialogs.
- [x] Implement conditional AMap and Kakao loaders with timeout and honest fallbacks in src/lib/integrations.ts.
- [x] Run npm run build; inspect mobile and desktop in browser; exercise language and sharing guidance.

### Task 3: Delivery
Files: README.md, .env.example, vercel.json, public/images/share-card.png.
- [x] Document content editing, provider credentials, static deployment and China availability limitations with official sources.
- [x] Run all tests and build, verify generated assets are local, leave preview available.
