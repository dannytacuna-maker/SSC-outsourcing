"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import type { Dictionary } from "@/content/dictionary";
import { photos } from "@/content/media";
import {
  buildMonthGrid,
  formatDayLabel,
  formatMonthTitle,
  getSlotsForDate,
  shiftMonth,
  type BookingChannel,
} from "@/lib/booking";
import type { Locale } from "@/lib/i18n";
import styles from "./BookingExperience.module.css";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const WEEKDAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SLIDE_MS = 480;

export function BookingExperience({ locale, dict }: Props) {
  const router = useRouter();
  const copy = dict.contact.booking;
  const now = useMemo(() => new Date(), []);
  const initial = useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Costa_Rica",
      year: "numeric",
      month: "numeric",
    }).formatToParts(now);
    return {
      year: Number(parts.find((p) => p.type === "year")?.value),
      month: Number(parts.find((p) => p.type === "month")?.value),
    };
  }, [now]);

  const [year, setYear] = useState(initial.year);
  const [month, setMonth] = useState(initial.month);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [startIso, setStartIso] = useState("");
  const [bookedIsos, setBookedIsos] = useState<string[]>([]);
  const [channel, setChannel] = useState<BookingChannel>("zoom");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [calendarUrl, setCalendarUrl] = useState("");
  const [panelPhase, setPanelPhase] = useState<"entering" | "open" | "leaving">(
    "entering",
  );

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPanelPhase("open");
      return;
    }
    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setPanelPhase("open"));
    });
    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadBooked() {
      try {
        const response = await fetch("/api/book/booked", { cache: "no-store" });
        if (!response.ok) return;
        const payload = (await response.json()) as { startIsos?: string[] };
        if (!cancelled && Array.isArray(payload.startIsos)) {
          setBookedIsos(payload.startIsos);
        }
      } catch {
        // Timetable still works if availability fetch fails.
      }
    }
    void loadBooked();
    return () => {
      cancelled = true;
    };
  }, []);

  const bookedSet = useMemo(() => new Set(bookedIsos), [bookedIsos]);

  const grid = useMemo(
    () => buildMonthGrid(year, month, locale, bookedSet),
    [year, month, locale, bookedSet],
  );
  const slots = useMemo(
    () => (dateKey ? getSlotsForDate(dateKey, locale, bookedSet) : []),
    [dateKey, locale, bookedSet],
  );

  useEffect(() => {
    if (startIso && !slots.some((slot) => slot.startIso === startIso)) {
      setStartIso("");
    }
  }, [slots, startIso]);

  const selectedDayLabel = dateKey
    ? formatDayLabel(dateKey, locale).long
    : null;
  const weekdays = locale === "es" ? WEEKDAYS_ES : WEEKDAYS_EN;
  const homeHref = `/${locale}`;
  const otherLocale = locale === "es" ? "en" : "es";

  function goMonth(delta: number) {
    const next = shiftMonth(year, month, delta);
    setYear(next.year);
    setMonth(next.month);
    setDateKey(null);
    setStartIso("");
  }

  function returnToSite() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      router.push(homeHref);
      return;
    }
    setPanelPhase("leaving");
    window.setTimeout(() => {
      router.push(homeHref);
    }, SLIDE_MS);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!startIso) return;

    const data = new FormData(event.currentTarget);
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          company: String(data.get("company") ?? ""),
          note: String(data.get("note") ?? ""),
          channel,
          startIso,
          locale,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        calendarUrl?: string;
        provider?: string;
        notifyUrl?: string;
        notifyPayload?: Record<string, string>;
        hostEmail?: string;
      };

      if (!response.ok) {
        const raw = payload.error || copy.error;
        throw new Error(
          /<!DOCTYPE|<html|Just a moment/i.test(raw) ? copy.error : raw,
        );
      }

      if (payload.provider === "client-notify" && payload.notifyUrl && payload.notifyPayload) {
        const notifyResponse = await fetch(payload.notifyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload.notifyPayload),
        });

        const notifyText = await notifyResponse.text();
        if (
          !notifyResponse.ok ||
          /<!DOCTYPE|<html|Just a moment|cloudflare/i.test(notifyText)
        ) {
          throw new Error(copy.notifyFailed);
        }

        try {
          const notifyJson = JSON.parse(notifyText) as {
            success?: boolean | string;
            message?: string;
          };
          if (
            notifyJson.success === false ||
            notifyJson.success === "false"
          ) {
            throw new Error(notifyJson.message || copy.notifyFailed);
          }
        } catch (parseError) {
          if (parseError instanceof Error && parseError.message === copy.notifyFailed) {
            throw parseError;
          }
          // Non-JSON success bodies from FormSubmit are still acceptable.
        }
      }

      setCalendarUrl(payload.calendarUrl ?? "");
      setBookedIsos((prev) =>
        prev.includes(startIso) ? prev : [...prev, startIso],
      );
      setStatus("success");
    } catch (error) {
      setStatus("error");
      const raw = error instanceof Error ? error.message : copy.error;
      setErrorMessage(
        /<!DOCTYPE|<html|Just a moment/i.test(raw) ? copy.error : raw,
      );
    }
  }

  const panelClass = [
    styles.page,
    panelPhase === "entering" ? styles.pageEntering : "",
    panelPhase === "open" ? styles.pageOpen : "",
    panelPhase === "leaving" ? styles.pageLeaving : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.stage} aria-hidden={panelPhase === "leaving"}>
      <div className={panelClass}>
        <header className={styles.topBar}>
          <BrandLogo height={36} />
          <div className={styles.topActions}>
            <button type="button" className={styles.backLink} onClick={returnToSite}>
              ← {copy.backHome}
            </button>
            <div className={styles.langSwitch} role="group" aria-label="Language">
              <Link
                href={`/${locale}/book`}
                className={`${styles.langBtn} ${styles.langBtnActive}`}
              >
                {locale.toUpperCase()}
              </Link>
              <Link href={`/${otherLocale}/book`} className={styles.langBtn}>
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </div>
        </header>

        {status === "success" ? (
          <div className={styles.successPanel}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 className={styles.successTitle}>{copy.doneTitle}</h1>
            <p className={styles.support}>{copy.doneBody}</p>
            <div className={styles.successActions}>
              {calendarUrl ? (
                <a
                  className="btn btn-primary"
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.calendarCta}
                </a>
              ) : null}
              <button
                type="button"
                className={styles.successBack}
                onClick={returnToSite}
              >
                {copy.backHome}
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.shell}>
            <aside className={styles.info}>
              <p className={styles.eyebrow}>{copy.eyebrow}</p>
              <h1 className={styles.headline}>{copy.pageHeadline}</h1>
              <p className={styles.support}>{copy.pageSupport}</p>

              <ul className={styles.features}>
                {copy.features.map((feature) => (
                  <li key={feature.title}>
                    <span className={styles.featureIcon} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path
                          fill="currentColor"
                          d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9Zm.75-14.5h-1.5v6.25l5.25 3.15.75-1.23-4.5-2.67Z"
                        />
                      </svg>
                    </span>
                    <div>
                      <strong>{feature.title}</strong>
                      <p>{feature.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.hostCard}>
                <div className={styles.hostPhoto}>
                  <Image
                    src={photos.shirley.src}
                    alt={photos.shirley.alt[locale]}
                    fill
                    unoptimized
                    className={styles.hostImg}
                    sizes="72px"
                  />
                </div>
                <div>
                  <strong>{dict.trust.lead.name}</strong>
                  <p>{dict.trust.lead.role}</p>
                </div>
              </div>
            </aside>

            <section className={styles.calendarPane}>
              {!startIso ? (
                <>
                  <div className={styles.calendarHeader}>
                    <h2 className={styles.monthTitle}>
                      {formatMonthTitle(year, month, locale)}
                    </h2>
                    <div className={styles.monthNav}>
                      <button
                        type="button"
                        className={styles.monthBtn}
                        onClick={() => goMonth(-1)}
                        aria-label="Previous month"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className={styles.monthBtn}
                        onClick={() => goMonth(1)}
                        aria-label="Next month"
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className={styles.weekdayRow}>
                    {weekdays.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className={styles.monthGrid}>
                    {grid.map((cell, index) =>
                      cell.dateKey ? (
                        <button
                          key={cell.dateKey}
                          type="button"
                          disabled={!cell.available}
                          className={`${styles.dayCell} ${
                            cell.available ? styles.dayAvailable : ""
                          } ${dateKey === cell.dateKey ? styles.daySelected : ""}`}
                          onClick={() => {
                            setDateKey(cell.dateKey);
                            setStartIso("");
                          }}
                        >
                          <span>{cell.day}</span>
                          {cell.available ? (
                            <i className={styles.dot} aria-hidden="true" />
                          ) : null}
                        </button>
                      ) : (
                        <span key={`empty-${index}`} className={styles.dayEmpty} />
                      ),
                    )}
                  </div>

                  {dateKey ? (
                    <div className={styles.timesBlock}>
                      <p className={styles.timesLabel}>{selectedDayLabel}</p>
                      {slots.length > 0 ? (
                        <div className={styles.slotGrid}>
                          {slots.map((slot) => (
                            <button
                              key={slot.startIso}
                              type="button"
                              className={styles.slotBtn}
                              onClick={() => setStartIso(slot.startIso)}
                            >
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className={styles.empty}>{copy.emptySlots}</p>
                      )}
                    </div>
                  ) : (
                    <p className={styles.hint}>{copy.pickDay}</p>
                  )}
                </>
              ) : (
                <form className={styles.form} onSubmit={onSubmit}>
                  <button
                    type="button"
                    className={styles.changeTime}
                    onClick={() => setStartIso("")}
                  >
                    ← {selectedDayLabel} ·{" "}
                    {slots.find((slot) => slot.startIso === startIso)?.label}
                  </button>

                  <p className={styles.timesLabel}>{copy.detailsLabel}</p>

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.legend}>{copy.channelLabel}</legend>
                    <div className={styles.channelRow}>
                      <button
                        type="button"
                        className={`${styles.channelBtn} ${channel === "zoom" ? styles.channelActive : ""}`}
                        aria-pressed={channel === "zoom"}
                        onClick={() => setChannel("zoom")}
                      >
                        {copy.zoom}
                      </button>
                      <button
                        type="button"
                        className={`${styles.channelBtn} ${channel === "whatsapp" ? styles.channelActive : ""}`}
                        aria-pressed={channel === "whatsapp"}
                        onClick={() => setChannel("whatsapp")}
                      >
                        {copy.whatsapp}
                      </button>
                    </div>
                  </fieldset>

                  <div className={styles.fields}>
                    <label className={styles.field}>
                      {copy.name}
                      <input
                        required
                        name="name"
                        className={styles.input}
                        autoComplete="name"
                      />
                    </label>
                    <label className={styles.field}>
                      {copy.email}
                      <input
                        required
                        type="email"
                        name="email"
                        className={styles.input}
                        autoComplete="email"
                      />
                    </label>
                    <label className={styles.field}>
                      {copy.phone}
                      <input
                        required={channel === "whatsapp"}
                        name="phone"
                        className={styles.input}
                        autoComplete="tel"
                        placeholder={copy.phoneHint}
                      />
                    </label>
                    <label className={styles.field}>
                      {copy.company}
                      <input
                        name="company"
                        className={styles.input}
                        autoComplete="organization"
                      />
                    </label>
                    <label className={`${styles.field} ${styles.noteField}`}>
                      {copy.note}
                      <textarea
                        name="note"
                        className={styles.input}
                        rows={4}
                        placeholder={copy.notePlaceholder}
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submit}`}
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? copy.submitting : copy.submit}
                  </button>

                  {status === "error" ? (
                    <p className={styles.errorText}>{errorMessage || copy.error}</p>
                  ) : null}
                </form>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
