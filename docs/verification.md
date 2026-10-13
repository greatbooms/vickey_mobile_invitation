# Verification — 2026-10-11

- npm test: 6 tests pass (language fallback, timezone-based countdown, calendar padding/leap month, ICS UTC/escaping, AMap URI encoding, configurable local ceremony time).
- npm run build: TypeScript and Vite production build pass.
- Dependency update: Vite 8.3.4 / Vitest 5.0.3. npm installation audit reports 0 vulnerabilities.
- Browser: Chinese, English, Korean at 320px and 390px; no horizontal overflow. Desktop screenshot visually checked.
- Browser: invalid lang falls back to Chinese; selected language reflected in URL.
- Browser: calendar download verified with UTC start 20270516T080000Z and end 20270516T120000Z. Link-copy success toast observed.
- Browser: WeChat guide, missing Kakao key guide, and missing AMap key guide verified. Escape closes dialogs.
- Production preview: local artwork loads, six content sections, no third-party scripts loaded initially.
- Share metadata: build with example origin produces absolute og:url / og:image; final build rebuilt without example origin.
- Final independent review: corrected configurable ceremony time, isDemo notice control, and configured hero path use in UI/Kakao.
- Runtime artwork is optimized local JPEG (about 298 KB); full original is retained in docs/artwork, outside public deployment assets.

Not verified: real AMap credentials/rendering, real Kakao card delivery, WeChat custom-card JS-SDK account rights, mainland China connectivity or external hosting. No production deployment performed.

## Pink redesign — 2026-10-12

- Names: groom 牛嘉汇 / Niu Jiahui, bride 郭飞琪 / Guo Feiqi.
- Ceremony: 2026-10-23 16:26 Asia/Shanghai.
- Schedule: 15:00–15:50 welcome/photo time, 16:26 ceremony, 18:08 dinner, 20:08 after party.
- Original header/footer cropped without regenerating the footer faces; local optimized JPEGs.
- Only the middle paper/ribbon tile repeats. Footer blank-paper edge fades; face pixels remain fully visible.
- Browser: 320px and 390px in all three languages, no horizontal overflow; event titles verified.
- Content growth check: adding 50 invitation lines increased body height from 4590.875px to 6340.875px. Header stayed 231px, footer stayed 307.125px, no overflow.
- Final independent review: no important actionable defects found; face crop confirmed against supplied original.

## Real venue — 2026-10-12

User-supplied venue: 南京山囿里酒店, 民宿. Address: 南京市玄武区博爱路18号T80科技文化国际社区35栋. Map link: https://surl.amap.com/dPgrKAeufB8.

Removed Shanghai example coordinates. All language pages use the real shared link; address copy uses the Chinese original. Optional snapshot slot is ready; no image assigned yet. Interactive-map controls removed in favor of screenshot + external link.

Map screenshot remains blocked by Ego browser location permission prompt, which requires direct user handling. User currently cannot interact with that PC. No screenshot captured or position independently verified.

## AMap snapshot completed — 2026-10-12

After user returned browser control, desktop AMap search required sign-in (POI request returned 419). The official shared link’s mobile page displayed 南京山囿里酒店 and its selected marker; map tiles loaded successfully. Shared URL coordinates: longitude 118.85114237666127, latitude 32.0415428076392. Visible map included T80科技文化国际社区.

Saved real browser capture with AMap logo/copyright retained, removing only app-promotion and interactive controls from the capture. Original: docs/previews/amap-venue-source.png. Runtime optimized JPEG: public/images/venue-map.jpg. No generated map artwork or substituted location.


## 2026-10-12: mobile image loading and background rendering

- User screenshots: iPhone KakaoTalk browser, partial horizontal loss of background artwork and empty map image.
- Confirmed slow-loading defect with Chromium mobile emulation: Network.emulateNetworkConditions (1,200ms latency, 16,000 bytes/sec), image ready=false and no visible loading feedback before the fix. Map also had no intrinsic width/height and native lazy loading.
- Desktop Safari and Chromium did not reproduce the exact iPhone background strips. WebKit repaint/compositing remains a hypothesis, not a confirmed root cause. No iOS device session was available.
- Replaced the 1040x4805 single repeated background on the tall body with short, sequential 640px-wide positioned image slices. Total network payload 140,218 bytes versus approximately 452KB. Their positions and repeats follow body dimensions with ResizeObserver; supplied artwork and footer faces preserved. Changed outer overflow:clip to overflow:hidden.
- Map/footer load eagerly; map reserves 1000:650 aspect ratio and shows localized loading/error/retry states. Header and first paper tile are preloaded.
- After fix: forced map failure with Network.setBlockedURLs, confirmed error feedback; slow-network retry showed loading feedback, then loaded naturalWidth=1000 with identical 204px box height.
- Mobile 320/390/428px across zh/en/ko: no document horizontal overflow or completed broken images. Screenshot docs/previews/mobile-bug-after.png. Desktop Safari verified background and venue map visually.
- npm test: 6 passed. npm run build: success. Exact iPhone KakaoTalk strip symptom still requires device confirmation; do not claim full reproduction or definitive root-cause resolution.


## 2026-10-12: QWeather venue weather integration

- User provided credentials stored only in ignored `.env.weather.local`, mode 0600. No credential values included in this record.
- Current/daily QWeather APIs returned HTTP 200 in zh/ko/en, including 7 forecast dates 2026-10-12 through 2026-10-18. The confirmed AMap venue coordinates are shared through src/venue.json. QWeather mainland coordinate guidance uses GCJ-02.
- Added server-only adapter, 30-minute language caches and concurrent request deduplication; recent cached results (maximum age 24 hours) carry a stale notice after provider failure. Keys are sent upstream in a header. Public JSON contains only normalized weather.
- Node server serves the existing preview at both 127.0.0.1:4173 and 100.87.153.41:4173. Vercel API entrypoint also included, but not deployed.
- Actual endpoint verified from both preview addresses. Weather UI validated across zh/ko/en at 320/390/428px: 7 forecast items, no horizontal document overflow, correct attribution. Forecast scroll remains inside the card.
- Browser forced API failure: clear localized fallback and retry button while invitation remains usable. Unblocked request and retry returned live weather.
- Added tests for schema normalization, cache, concurrent request deduplication, stale/expired data and invalid payloads. Final npm test: 9 passed; final npm run build: success.
- Browser build credential scan passed; env/source requests returned 404; encoded path traversal returned 403.
- Screenshots docs/previews/weather-mobile-zh.png and weather-mobile-ko.png (before final adjective-to-noun Korean label polish).
- October 23 is currently outside the 7-day forecast and is not fabricated. The card highlights the date automatically once included by the provider. No air-quality API was added.
