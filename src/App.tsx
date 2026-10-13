import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronRight,
  Copy,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
  TrainFront,
  Car,
  Camera,
  Wine,
  Gem,
  X,
  LoaderCircle,
} from "lucide-react";
import { invitation } from "./invitation";
import { locales, type Language } from "./locales";
import {
  calendarDays,
  countdown,
  formatEventTime,
  resolveLanguage,
} from "./lib/invitation";
import { RibbonCharm } from "./components/RibbonCharm";
import { PaperBackground } from "./components/PaperBackground";
import { WeatherCard } from "./components/WeatherCard";
function initialLanguage(): Language {
  const query = new URLSearchParams(location.search).get("lang");
  if (query !== null) return resolveLanguage(query);
  try {
    return resolveLanguage(localStorage.getItem("invitation-language"));
  } catch {
    return "zh";
  }
}
const languageCodes = { zh: "zh-CN", en: "en-US", ko: "ko-KR" };
const eventIcons = [Camera, Gem, Wine, Sparkles];
export default function App() {
  const [language, setLanguage] = useState<Language>(initialLanguage),
    [now, setNow] = useState(Date.now()),
    [toast, setToast] = useState("");
  const [dialog, setDialog] = useState<{ text: string; value?: string } | null>(
    null,
  );
  const [mapStatus, setMapStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [mapAttempt, setMapAttempt] = useState(0);
  const modalRef = useRef<HTMLDialogElement>(null);
  const c = locales[language],
    date = new Date(invitation.date),
    numbers = countdown(invitation.date, now);
  const dateLabel = new Intl.DateTimeFormat(languageCodes[language], {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: invitation.timezone,
  }).format(date);
  const monthLabel = new Intl.DateTimeFormat(languageCodes[language], {
    month: "long",
    year: "numeric",
    timeZone: invitation.timezone,
  }).format(date);
  const localTime = formatEventTime(
    invitation.date,
    invitation.timezone,
    languageCodes[language],
  );
  const day = Number(invitation.date.slice(8, 10));
  const shareUrl = () => {
    const url = new URL(location.href);
    url.searchParams.set("lang", language);
    url.hash = "";
    return url.href;
  };
  useEffect(() => {
    document.documentElement.lang = languageCodes[language];
    document.title = `${c.names.join(" & ")} · ${c.title}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", c.invitation.join(" "));
    try {
      localStorage.setItem("invitation-language", language);
    } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", language);
    history.replaceState(null, "", url);
  }, [language, c]);
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(id);
  }, [toast]);
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    if (dialog && !modal.open) modal.showModal();
    else if (!dialog && modal.open) modal.close();
  }, [dialog]);
  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setToast(c.copied);
    } catch {
      setDialog({ text: c.manualCopy, value });
    }
  }
  return (
    <>
      <div className="desktop-decoration left">
        <RibbonCharm />
        <span>
          Two hearts.
          <br />
          One beautiful story.
        </span>
      </div>
      <div className="desktop-decoration right">
        <span>
          WITH LOVE,
          <br />
          ALWAYS.
        </span>
        <RibbonCharm />
      </div>
      <main className="invitation">
        <header className="topbar">
          <a className="monogram" href="#home" aria-label={c.title}>
            {invitation.monogram}
            <span className="monogram-dot">✧</span>
          </a>
          <nav className="languages" aria-label="Language">
            {(["zh", "en", "ko"] as Language[]).map((lang) => (
              <button
                key={lang}
                lang={languageCodes[lang]}
                aria-pressed={language === lang}
                onClick={() => setLanguage(lang)}
              >
                {lang === "zh" ? "中文" : lang === "en" ? "EN" : "한국어"}
              </button>
            ))}
          </nav>
        </header>
        <img
          className="invitation-header-art"
          src={invitation.backgrounds.header}
          alt=""
          aria-hidden="true"
          width="1040"
          height="616"
          fetchPriority="high"
        />
        <div className="invitation-body">
          <PaperBackground />
          <section id="home" className="hero">
            <p className="eyebrow">WE ARE GETTING MARRIED</p>
            <h1>{c.title}</h1>
            <p className="hero-subtitle">{c.subtitle}</p>
            <div className="hero-art">
              <img
                src={invitation.hero}
                alt={
                  language === "zh"
                    ? "粉色水彩新郎新娘与小猫插画"
                    : language === "ko"
                      ? "분홍 수채화 신랑·신부와 고양이 일러스트"
                      : "Pink watercolor bride and groom with a cat"
                }
                fetchPriority="high"
                width="800"
                height="1200"
              />
            </div>
            <div className="hero-names">
              <span>{c.names[0]}</span>
              <i>&</i>
              <span>{c.names[1]}</span>
            </div>
            <div className="ornament">
              <span />
              <Heart size={13} strokeWidth={1.2} />
              <span />
            </div>
            <p className="hero-date">
              {invitation.date.slice(0, 10).replaceAll("-", " · ")}
            </p>
            <p className="hero-location">{c.venueName}</p>
            <a className="scroll-hint" href="#welcome" aria-label={c.welcome}>
              <ArrowDown size={16} />
            </a>
          </section>
          <section className="welcome section" id="welcome">
            <RibbonCharm className="section-sprig" />
            <p className="eyebrow">WELCOME TO OUR WEDDING</p>
            <h2>{c.welcome}</h2>
            <div className="invitation-copy">
              {c.invitation.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="couple-row">
              {c.names.map((name, i) => (
                <div className="person" key={name}>
                  <p className="role">{c.roles[i]}</p>
                  <h3>{name}</h3>
                  <span>{c.romanNames[i]}</span>
                </div>
              ))}
              <Heart className="couple-heart" size={19} strokeWidth={1} />
            </div>
            <p className="quiet-note">{c.coupleNote}</p>
          </section>
          <section className="date-section section" id="date">
            <p className="eyebrow">SAVE THE DATE</p>
            <h2>{c.dateTitle}</h2>
            <p className="date-label">{dateLabel}</p>
            <p className="muted">{localTime}</p>
            <div className="calendar">
              <p className="calendar-month">{monthLabel}</p>
              <div className="calendar-grid">
                {c.weekdays.map((weekday, i) => (
                  <span className="weekday" key={`w${i}`}>
                    {weekday}
                  </span>
                ))}
                {calendarDays(invitation.date).map((number, i) => (
                  <span
                    key={i}
                    className={`calendar-day ${number === day ? "wedding-day" : ""}`}
                    aria-label={
                      number === day ? `${dateLabel} · ${c.title}` : undefined
                    }
                  >
                    {number === day ? (
                      <>
                        <Heart
                          className="date-heart"
                          size={35}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                        <b>{number}</b>
                      </>
                    ) : (
                      number
                    )}
                  </span>
                ))}
              </div>
            </div>
            <p className="countdown-label">
              {numbers.some(Boolean) ? c.countdown : c.countdownEnd}
            </p>
            <div className="countdown">
              {numbers.map((n, i) => (
                <div key={i}>
                  <strong>{String(n).padStart(2, "0")}</strong>
                  <span>{c.units[i]}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="schedule-section section" id="schedule">
            <RibbonCharm className="timeline-sprig" />
            <p className="eyebrow">THE WEDDING DAY</p>
            <h2>{c.scheduleTitle}</h2>
            <p className="section-intro">{c.scheduleIntro}</p>
            <ol className="timeline">
              {c.events.map((event, i) => {
                const Icon = eventIcons[i];
                return (
                  <li key={event.title}>
                    <div className="event-icon">
                      <Icon size={33} strokeWidth={1} />
                      <span className="icon-sparkle">✧</span>
                    </div>
                    <div className="timeline-node">
                      <span>{i + 1}</span>
                    </div>
                    <div className="event-copy">
                      <time>{invitation.schedule[i]}</time>
                      <h3>{event.title}</h3>
                      <p>{event.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="ornament">
              <span />
              <Heart size={13} strokeWidth={1.2} />
              <span />
            </div>
          </section>
          <section className="venue-section section" id="venue">
            <p className="eyebrow">A PLACE FOR OUR PROMISES</p>
            <h2>{c.venueTitle}</h2>
            <h3 className="venue-name">{c.venueName}</h3>
            <p className="address">{c.address}</p>
            {invitation.venue.mapImage ? (
              <div
                className="venue-map-preview"
                aria-busy={mapStatus === "loading"}
              >
                <a
                  href={invitation.venue.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.venueName} · ${c.map}`}
                >
                  <img
                    key={mapAttempt}
                    src={`${invitation.venue.mapImage}${mapAttempt ? `?retry=${mapAttempt}` : ""}`}
                    alt={`${c.venueName} · ${c.venueTitle}`}
                    width="1000"
                    height="650"
                    loading="eager"
                    onLoad={() => setMapStatus("loaded")}
                    onError={() => setMapStatus("error")}
                    style={{ opacity: mapStatus === "loaded" ? 1 : 0 }}
                  />
                </a>
                {mapStatus !== "loaded" && (
                  <div className="image-status" role="status">
                    <MapPin size={28} strokeWidth={1.3} />
                    <span>
                      {mapStatus === "error" ? c.imageFailed : c.imageLoading}
                    </span>
                    {mapStatus === "error" && (
                      <button
                        className="text-button"
                        onClick={() => {
                          setMapStatus("loading");
                          setMapAttempt((value) => value + 1);
                        }}
                      >
                        {c.retry}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="venue-card">
                <RibbonCharm />
                <MapPin size={34} strokeWidth={1.3} />
                <span>{c.venueName}</span>
              </div>
            )}
            <a
              className="button primary"
              href={invitation.venue.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={17} />
              {c.map}
              <ChevronRight size={16} />
            </a>
            <div className="venue-actions">
              <button
                className="button outlined"
                onClick={() => copy(invitation.venue.address)}
              >
                <Copy size={15} />
                {c.copyAddress}
              </button>
            </div>
            <div className="transport">
              {c.transport.map((item, i) => {
                const Icon = [Car, TrainFront, Heart][i];
                return (
                  <div key={item.title}>
                    <Icon size={20} strokeWidth={1.5} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <div className="weather-section">
            <WeatherCard language={language} />
          </div>
          <section className="share-section section" id="share">
            <RibbonCharm className="share-ribbon" />
            <h2>{c.shareTitle}</h2>
            <p className="section-intro">{c.shareNote}</p>
            <p className="share-help">{c.shareHelp}</p>
            <div className="share-buttons">
              <button className="link" onClick={() => copy(shareUrl())}>
                <Copy size={19} />
                <span>{c.copyLink}</span>
              </button>
            </div>
          </section>
          <footer>
            <RibbonCharm />
            <p>{c.footer}</p>
            <span className="footer-names">
              {c.romanNames[0]} <i>&</i> {c.romanNames[1]}
            </span>
            {invitation.isDemo && <div className="footer-demo">{c.demo}</div>}
            <small>WITH LOVE · {invitation.date.slice(0, 4)}</small>
            <img
              className="invitation-footer-art"
              src={invitation.backgrounds.footer}
              alt={
                language === "ko"
                  ? "신부 궈페이치와 신랑 뉴자후이의 사진"
                  : language === "zh"
                    ? "新娘郭飞琪与新郎牛嘉汇合照"
                    : "Bride Guo Feiqi and groom Niu Jiahui"
              }
              width="1040"
              height="819"
              loading="eager"
            />
          </footer>
        </div>
        <nav className="bottom-nav" aria-label={c.title}>
          {c.nav.map((text, i) => (
            <a key={text} href={["#welcome", "#schedule", "#venue"][i]}>
              {text}
            </a>
          ))}
          <button onClick={() => copy(shareUrl())} aria-label={c.copyLink}>
            <Copy size={16} />
          </button>
        </nav>
      </main>
      <a
        href="#home"
        className="back-top"
        aria-label={
          language === "ko"
            ? "맨 위로"
            : language === "zh"
              ? "返回顶部"
              : "Back to top"
        }
      >
        <ArrowUp size={17} />
      </a>
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
      <dialog
        ref={modalRef}
        onCancel={() => setDialog(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setDialog(null);
        }}
        aria-labelledby="dialog-title"
      >
        <button
          className="dialog-close"
          aria-label={c.close}
          onClick={() => setDialog(null)}
        >
          <X size={20} />
        </button>
        <Heart size={27} strokeWidth={1} className="dialog-heart" />
        <h2 id="dialog-title">{c.shareTitle}</h2>
        <p>{dialog?.text}</p>
        {dialog?.value && (
          <input
            className="copy-field"
            aria-label={c.manualCopy}
            readOnly
            value={dialog.value}
            onFocus={(event) => event.currentTarget.select()}
          />
        )}
        <button className="button primary" onClick={() => setDialog(null)}>
          {c.close}
        </button>
      </dialog>
    </>
  );
}
