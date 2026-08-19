"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { HeroReel } from "@/components/experience/HeroReel";
import {
  CursorBlock,
  PhotoPop,
  ScrollRevealImage,
} from "@/components/portfolio/CursorBlock";
import { SocialIcon } from "@/components/SocialIcons";
import type { Dictionary } from "@/content/dictionary";
import {
  mapsEmbed,
  mapsLink,
  photos,
  companyWhatsAppHref,
  socialLinks,
  wazeLink,
} from "@/content/media";
import type { Locale } from "@/lib/i18n";
import styles from "./SscExperience.module.css";

const SCROLL_KEY = "ssc-scroll-y";
const HERO_WATCH_MS = 5000;

const processStepPhotos = [
  photos.whyLeadership,
  photos.whyJurisdictions,
  photos.deskFocus,
] as const;

const aaaLovePhotos = [
  photos.loveService,
  photos.loveFirm,
  photos.floor,
] as const;

const processStepIcons = [
  // Leadership — named person responsible
  <svg key="lead" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M5.5 19.25c.7-3.2 3-5 6.5-5s5.8 1.8 6.5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>,
  // Two jurisdictions — dual markets
  <svg key="jurisdictions" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4.5 12h15M12 4c2.2 2.4 3.3 5 3.3 8s-1.1 5.6-3.3 8c-2.2-2.4-3.3-5-3.3-8s1.1-5.6 3.3-8z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
  // Ready file — orderly archive
  <svg key="file" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 3.75h7.5L19 8.25v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 3.9V8.2H18.7M9 14.2l2 2 4-4.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
] as const;

const aaaLoveIcons = [
  // Love of service
  <svg key="service" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M12 20.25s-6.5-3.9-6.5-8.4A3.6 3.6 0 0 1 12 8.7a3.6 3.6 0 0 1 6.5 3.15c0 4.5-6.5 8.4-6.5 8.4z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>,
  // Love of the firm
  <svg key="firm" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4.75 20.25h14.5M6.5 20.25V7.5L12 4.75 17.5 7.5v12.75M10 20.25v-4.5h4v4.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.25 10.5h1.5M13.25 10.5h1.5M9.25 13.75h1.5M13.25 13.75h1.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>,
  // Love of efficiency
  <svg key="efficiency" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M13 3.75 6.75 13.5h5.1L11 20.25 17.25 10.5h-5.1L13 3.75z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
] as const;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function SscExperience({ locale, dict }: Props) {
  const router = useRouter();
  const [sent, setSent] = useState(false);
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const [heroWatching, setHeroWatching] = useState(false);
  const [navOnLight, setNavOnLight] = useState(false);
  const [navProgress, setNavProgress] = useState(0);
  const heroIdleTimer = useRef<number | null>(null);
  const heroCollapsedRef = useRef(false);
  const stickyNavRef = useRef<HTMLDivElement>(null);
  const lightBandRef = useRef<HTMLDivElement>(null);

  function clearHeroIdle() {
    if (heroIdleTimer.current != null) {
      window.clearTimeout(heroIdleTimer.current);
      heroIdleTimer.current = null;
    }
  }

  function armHeroIdle() {
    clearHeroIdle();
    setHeroWatching(false);
    heroIdleTimer.current = window.setTimeout(() => {
      if (!heroCollapsedRef.current && window.scrollY < 48) {
        setHeroWatching(true);
      }
    }, HERO_WATCH_MS);
  }

  useEffect(() => {
    const onScroll = () => {
      const nearTop = window.scrollY < 48;
      const collapsed = window.scrollY >= window.innerHeight - 4;
      heroCollapsedRef.current = collapsed;
      setHeroCollapsed(collapsed);

      const lightBand = lightBandRef.current;
      const stickyNav = stickyNavRef.current;
      if (lightBand && stickyNav) {
        const navBottom = stickyNav.getBoundingClientRect().bottom;
        const band = lightBand.getBoundingClientRect();
        setNavOnLight(band.top < navBottom - 4 && band.bottom > navBottom - 12);
      } else {
        setNavOnLight(false);
      }

      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      setNavProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));

      if (!nearTop) {
        setHeroWatching(false);
        clearHeroIdle();
        return;
      }

      // Back at the hero — keep the idle fade loop alive.
      if (!heroIdleTimer.current) armHeroIdle();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (heroCollapsed) {
      setHeroWatching(false);
      clearHeroIdle();
      return;
    }

    armHeroIdle();

    const onActivity = () => {
      if (heroCollapsedRef.current || window.scrollY >= 48) return;
      armHeroIdle();
    };

    window.addEventListener("pointerdown", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("wheel", onActivity, { passive: true });
    return () => {
      clearHeroIdle();
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("wheel", onActivity);
    };
  }, [heroCollapsed]);

  useEffect(() => {
    const raw = sessionStorage.getItem(SCROLL_KEY);
    if (!raw) return;
    sessionStorage.removeItem(SCROLL_KEY);
    const y = Number(raw);
    if (!Number.isFinite(y)) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "auto" });
    });
  }, [locale]);

  function switchLocale(next: Locale) {
    if (next === locale) return;
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
    router.push(`/${next}`);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(
      `SSC contact — ${company || name || "Inquiry"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    setSent(true);
    window.location.href = `mailto:${dict.contact.info.email}?subject=${subject}&body=${body}`;
  }

  const companyWaHref = companyWhatsAppHref(dict.contact.info.whatsappMessage);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="SSC Outsourcing">
        <div className={styles.topBar}>
          <div className={styles.langSwitch} role="group" aria-label="Language">
            <button
              type="button"
              className={`${styles.langBtn} ${locale === "es" ? styles.langBtnActive : ""}`}
              onClick={() => switchLocale("es")}
              aria-pressed={locale === "es"}
            >
              ES
            </button>
            <button
              type="button"
              className={`${styles.langBtn} ${locale === "en" ? styles.langBtnActive : ""}`}
              onClick={() => switchLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>
        </div>

        <HeroReel />

        <div
          className={`${styles.heroContent} ${heroWatching ? styles.heroContentWatching : ""}`}
          onPointerEnter={armHeroIdle}
          onPointerDown={armHeroIdle}
          onFocusCapture={armHeroIdle}
        >
          <h1 className={styles.srOnly}>
            {dict.hero.headline.replace(/\n/g, " ")}
          </h1>
          <BrandLogo height={234} priority className={styles.heroLogo} />
          <p className={styles.support}>{dict.hero.support}</p>
          <div className={styles.actions}>
            <a href="#services" className={`btn btn-primary ${styles.heroCta}`}>
              <span className={styles.heroCtaLabel}>{dict.hero.ctaSecondary}</span>
            </a>
            <a href="#contact" className={`btn btn-ghost ${styles.heroCta}`}>
              <span className={styles.heroCtaLabel}>{dict.hero.ctaPrimary}</span>
            </a>
          </div>
          <p className={styles.scrollHint}>{dict.hero.scrollHint}</p>
        </div>
      </section>

      <main className={styles.portfolio}>
        <div
          ref={stickyNavRef}
          className={`${styles.stickyNav} ${heroCollapsed ? styles.stickyNavReady : ""} ${navOnLight ? styles.stickyNavLight : ""}`}
          style={{ ["--nav-progress" as string]: String(navProgress) }}
          aria-hidden={!heroCollapsed}
        >
          <div className={styles.stickyNavInner}>
            <a
              href="#ssc"
              className={styles.navBrand}
              aria-label="SSC Outsourcing"
              tabIndex={heroCollapsed ? 0 : -1}
            >
              <BrandLogo
                height={46}
                className={styles.navLogo}
                tone={navOnLight ? "onLight" : "onDark"}
              />
            </a>
            <nav className={styles.navLinks} aria-label="Portfolio">
              <a href="#ssc" tabIndex={heroCollapsed ? 0 : -1}>
                {dict.nav.why}
              </a>
              <a href="#services" tabIndex={heroCollapsed ? 0 : -1}>
                {dict.nav.services}
              </a>
              <a href="#process" tabIndex={heroCollapsed ? 0 : -1}>
                {dict.nav.process}
              </a>
              <a href="#team" tabIndex={heroCollapsed ? 0 : -1}>
                {dict.nav.leadership}
              </a>
              <a href="#contact" tabIndex={heroCollapsed ? 0 : -1}>
                {dict.nav.contact}
              </a>
            </nav>
            <div className={styles.navEnd}>
              <a
                href={`/${locale}/book`}
                className={`${styles.navBook} ${navOnLight ? styles.navBookLight : ""}`}
                tabIndex={heroCollapsed ? 0 : -1}
              >
                {dict.nav.book}
              </a>
              <div
                className={styles.langSwitch}
                role="group"
                aria-label="Language"
              >
                <button
                  type="button"
                  className={`${styles.langBtn} ${locale === "es" ? styles.langBtnActive : ""}`}
                  onClick={() => switchLocale("es")}
                  aria-pressed={locale === "es"}
                  tabIndex={heroCollapsed ? 0 : -1}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={`${styles.langBtn} ${locale === "en" ? styles.langBtnActive : ""}`}
                  onClick={() => switchLocale("en")}
                  aria-pressed={locale === "en"}
                  tabIndex={heroCollapsed ? 0 : -1}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
          <div className={styles.navProgress} aria-hidden="true">
            <span className={styles.navProgressBar} />
          </div>
        </div>

        <div className={styles.portfolioInner}>
          <section id="ssc" className={styles.section}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>{dict.wedge.eyebrow}</p>
              <h2 className={styles.title}>{dict.wedge.headline}</h2>
              <p className={styles.copy}>{dict.wedge.support}</p>
            </header>

            <div className={styles.statRow}>
              {dict.trust.stats.map((stat) => (
                <CursorBlock key={stat.label} tone="compact">
                  <div className={styles.stat}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </CursorBlock>
              ))}
            </div>

            <div className={styles.profileBlock}>
              <p className={styles.eyebrow}>{dict.wedge.profile.pillarsLabel}</p>
              <div className={styles.pillarGrid}>
                {dict.wedge.profile.pillars.map((pillar) => (
                  <CursorBlock key={pillar.label} tone="padded">
                    <article className={styles.pillar}>
                      <h3 className={styles.pillarLabel}>{pillar.label}</h3>
                      <p className={styles.pillarBody}>{pillar.body}</p>
                    </article>
                  </CursorBlock>
                ))}
              </div>
            </div>

            <div className={styles.profileBlock}>
              <p className={styles.eyebrow}>{dict.wedge.profile.valuesLabel}</p>
              <ul className={styles.valueList}>
                {dict.wedge.profile.values.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>

            <div className={styles.profileBlock}>
              <header className={styles.sectionHead}>
                <p className={styles.eyebrow}>{dict.wedge.profile.aaa.eyebrow}</p>
                <h3 className={styles.aaaTitle}>{dict.wedge.profile.aaa.headline}</h3>
              </header>
              <ol className={styles.processSteps}>
                {dict.wedge.profile.aaa.items.map((item, index) => {
                  const photo = aaaLovePhotos[index] ?? photos.meeting;
                  return (
                    <li key={item.title} className={styles.processStep}>
                      <PhotoPop delayMs={index * 80} className={styles.processCardPop}>
                        <article className={styles.processCard}>
                          <div className={styles.processCardMedia}>
                            <Image
                              src={photo.src}
                              alt={photo.alt[locale]}
                              fill
                              quality={90}
                              unoptimized
                              className="object-cover object-center"
                              sizes="(max-width: 900px) 100vw, 28vw"
                            />
                            <span className={styles.processCardNum} aria-hidden="true">
                              0{index + 1}
                            </span>
                            <span className={styles.processCardMark} aria-hidden="true">
                              {aaaLoveIcons[index]}
                            </span>
                          </div>
                          <div className={styles.processCardCopy}>
                            <h3>{item.title}</h3>
                            <p>{item.body}</p>
                          </div>
                        </article>
                      </PhotoPop>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className={styles.pillarGrid}>
              {dict.wedge.points.map((point) => (
                <CursorBlock key={point.title} tone="padded">
                  <article className={styles.pillar}>
                    <h3 className={styles.pillarLabel}>{point.title}</h3>
                    <p className={styles.pillarBody}>{point.body}</p>
                  </article>
                </CursorBlock>
              ))}
            </div>

            <p className={styles.eyebrow}>{dict.trust.sectorsLabel}</p>
            <div className={styles.sectors}>
              {dict.trust.sectors.map((sector) => (
                <span key={sector}>{sector}</span>
              ))}
            </div>

            <ScrollRevealImage className={styles.sectionMedia}>
              <Image
                src={photos.meeting.src}
                alt={photos.meeting.alt[locale]}
                fill
                quality={90}
                unoptimized
                className="object-cover object-[center_40%]"
                sizes="(max-width: 900px) 100vw, 72rem"
              />
            </ScrollRevealImage>
          </section>
        </div>

        <div
          ref={lightBandRef}
          className={styles.lightBand}
          data-nav-theme="light"
        >
          <div className={styles.lightBandInner}>
            <section id="services" className={styles.section}>
              <header className={styles.sectionHead}>
                <p className={styles.eyebrow}>{dict.services.eyebrow}</p>
                <h2 className={styles.title}>{dict.services.headline}</h2>
              </header>

              <div className={styles.serviceBoard}>
                {[
                  dict.services.items.slice(0, 4),
                  dict.services.items.slice(4, 7),
                ].map((row, rowIndex) => (
                  <ol
                    key={rowIndex === 0 ? "services-row-a" : "services-row-b"}
                    className={styles.serviceRow}
                  >
                    {row.map((item, rowItemIndex) => {
                      const index =
                        rowIndex === 0 ? rowItemIndex : rowItemIndex + 4;
                      return (
                        <li
                          key={item.id}
                          id={item.id}
                          className={styles.serviceItem}
                        >
                          <article className={styles.serviceCard} tabIndex={0}>
                            <div className={styles.serviceTop}>
                              <span className={styles.serviceNum}>
                                {String(index + 1).padStart(2, "0")}
                              </span>
                              <h3>{item.title}</h3>
                            </div>
                            <div className={styles.serviceExpand}>
                              <div>
                                <p className={styles.serviceLead}>{item.body}</p>
                                <p className={styles.serviceDetailCopy}>
                                  {item.detail}
                                </p>
                                <a
                                  href="#contact"
                                  className={styles.serviceMore}
                                >
                                  {dict.services.learnMore}
                                  <span aria-hidden="true">→</span>
                                </a>
                              </div>
                            </div>
                            <span
                              className={styles.serviceArrow}
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                ))}
              </div>
            </section>

            <section id="process" className={styles.section}>
              <header className={styles.sectionHead}>
                <p className={styles.eyebrow}>{dict.process.eyebrow}</p>
                <h2 className={styles.title}>{dict.process.headline}</h2>
                <p className={styles.copy}>{dict.process.support}</p>
              </header>

              <ol className={styles.processSteps}>
                {dict.process.steps.map((step, index) => {
                  const photo = processStepPhotos[index] ?? photos.deskFocus;
                  return (
                    <li key={step.title} className={styles.processStep}>
                      <PhotoPop delayMs={index * 80} className={styles.processCardPop}>
                        <article className={styles.processCard}>
                          <div className={styles.processCardMedia}>
                            <Image
                              src={photo.src}
                              alt={photo.alt[locale]}
                              fill
                              quality={90}
                              unoptimized
                              className="object-cover object-center"
                              sizes="(max-width: 900px) 100vw, 28vw"
                            />
                            <span className={styles.processCardNum} aria-hidden="true">
                              0{index + 1}
                            </span>
                            <span className={styles.processCardMark} aria-hidden="true">
                              {processStepIcons[index]}
                            </span>
                          </div>
                          <div className={styles.processCardCopy}>
                            <h3>{step.title}</h3>
                            <p>{step.body}</p>
                          </div>
                        </article>
                      </PhotoPop>
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>
        </div>

        <div className={styles.portfolioInner}>
          <section id="team" className={styles.section}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>{dict.nav.leadership}</p>
              <h2 className={styles.title}>{dict.trust.leadershipTitle}</h2>
            </header>

            <article className={styles.director}>
              <PhotoPop delayMs={0}>
                <figure className={styles.directorFigure}>
                  <div className={styles.directorFrame}>
                    <Image
                      src={photos.shirley.src}
                      alt={photos.shirley.alt[locale]}
                      fill
                      quality={92}
                      unoptimized
                      className="object-cover object-[center_18%]"
                      sizes="(max-width: 900px) 100vw, 48vw"
                    />
                  </div>
                </figure>
              </PhotoPop>
              <div className={styles.directorCopy}>
                <p className={styles.directorRole}>{dict.trust.lead.role}</p>
                <h3 className={styles.directorName}>{dict.trust.lead.name}</h3>
                <p className={styles.directorBio}>{dict.trust.lead.bio}</p>
                <div className={styles.directorActions}>
                  <a
                    href={`mailto:${dict.trust.lead.email}`}
                    className={styles.directorAction}
                    aria-label={`Email ${dict.trust.lead.name}`}
                    title={dict.trust.lead.email}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.directorIcon}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
                      />
                    </svg>
                    <span>{dict.trust.lead.email}</span>
                  </a>
                </div>
              </div>
            </article>

            <div className={styles.teamBlock}>
              <p className={styles.eyebrow}>{dict.trust.teamLabel}</p>
              <div className={styles.teamGallery}>
                <PhotoPop delayMs={80}>
                  <figure>
                    <div className={styles.teamShot}>
                      <Image
                        src={photos.team.src}
                        alt={photos.team.alt[locale]}
                        fill
                        quality={90}
                        unoptimized
                        className="object-cover object-[center_30%]"
                        sizes="(max-width: 900px) 100vw, 36vw"
                      />
                    </div>
                  </figure>
                </PhotoPop>
                <PhotoPop delayMs={160}>
                  <figure>
                    <div className={styles.teamShot}>
                      <Image
                        src={photos.teamWide.src}
                        alt={photos.teamWide.alt[locale]}
                        fill
                        quality={90}
                        unoptimized
                        className="object-cover object-[center_40%]"
                        sizes="(max-width: 900px) 100vw, 36vw"
                      />
                    </div>
                  </figure>
                </PhotoPop>
              </div>
            </div>
          </section>
        </div>

        <footer id="contact" className={styles.contactBand}>
          <div className={styles.contactInner}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>{dict.contact.eyebrow}</p>
              <h2 className={styles.title}>{dict.contact.headline}</h2>
              <p className={styles.copy}>{dict.contact.support}</p>
            </header>

            <div className={styles.bookingCtaBand}>
              <div>
                <p className={styles.eyebrow}>{dict.contact.booking.eyebrow}</p>
                <h3 className={styles.bookingCtaTitle}>
                  {dict.contact.booking.headline}
                </h3>
                <p className={styles.bookingCtaCopy}>
                  {dict.contact.booking.support}
                </p>
              </div>
              <a href={`/${locale}/book`} className={`btn btn-primary ${styles.contactBtn}`}>
                {dict.contact.booking.cta}
              </a>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactAside}>
                <div className={styles.mapWrap}>
                  <iframe
                    className={styles.mapFrame}
                    title={dict.contact.info.mapsLabel}
                    src={`${mapsEmbed}&hl=${locale}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className={styles.mapActions}>
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.contact.info.mapsCta}
                    </a>
                    <a
                      href={wazeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.contact.info.wazeCta}
                    </a>
                  </div>
                </div>

                <dl className={styles.meta}>
                  <div>
                    <dt>{dict.contact.info.addressLabel}</dt>
                    <dd>
                      <a
                        href={mapsLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dict.contact.info.address}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>{dict.contact.info.phoneLabel}</dt>
                    <dd>
                      <a
                        href={`tel:${dict.contact.info.phone.replace(/[^\d+]/g, "")}`}
                      >
                        {dict.contact.info.callLabel} · {dict.contact.info.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>{dict.contact.info.whatsappLabel}</dt>
                    <dd>
                      <a
                        href={companyWaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {dict.contact.info.whatsappLabel} ·{" "}
                        {dict.contact.info.whatsapp}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt>{dict.contact.info.emailLabel}</dt>
                    <dd>
                      <a href={`mailto:${dict.contact.info.email}`}>
                        {dict.contact.info.email}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className={styles.socialRow}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label={link.label}
                      title={link.label}
                    >
                      <SocialIcon id={link.id} className={styles.socialIcon} />
                    </a>
                  ))}
                </div>
              </div>

              <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formRow}>
                  <label className={styles.field}>
                    {dict.contact.form.name}
                    <input
                      required
                      name="name"
                      className={styles.input}
                      autoComplete="name"
                    />
                  </label>
                  <label className={styles.field}>
                    {dict.contact.form.email}
                    <input
                      required
                      type="email"
                      name="email"
                      className={styles.input}
                      autoComplete="email"
                    />
                  </label>
                </div>
                <label className={styles.field}>
                  {dict.contact.form.company}
                  <input
                    name="company"
                    className={styles.input}
                    autoComplete="organization"
                  />
                </label>
                <label className={styles.field}>
                  {dict.contact.form.message}
                  <textarea
                    required
                    name="message"
                    className={styles.input}
                    rows={4}
                  />
                </label>
                <div className={styles.actions}>
                  <button type="submit" className={`btn btn-primary ${styles.contactBtn}`}>
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.contactBtnIcon}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
                      />
                    </svg>
                    {dict.contact.form.submit}
                  </button>
                  <a
                    href={`tel:${dict.contact.info.phone.replace(/[^\d+]/g, "")}`}
                    className={`btn btn-ghost ${styles.contactBtn}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.contactBtnIcon}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02z"
                      />
                    </svg>
                    {dict.contact.info.callLabel}
                  </a>
                  <a
                    href={companyWaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-ghost ${styles.contactBtn}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.contactBtnIcon}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M12.04 2c-5.46 0-9.91 4.43-9.91 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.9-4.44 9.9-9.9C21.94 6.43 17.5 2 12.04 2m5.83 14.24c-.25.7-1.44 1.28-1.99 1.36-.51.08-1.15.11-1.86-.12-.43-.13-.98-.29-1.69-.57-2.97-1.29-4.9-4.29-5.05-4.49-.14-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.25.59.85 2.07.92 2.22.08.15.12.32.02.51-.1.2-.15.32-.3.5-.14.17-.3.38-.43.51-.14.14-.29.29-.12.56.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.23 2.23 1.37.28.14.44.12.6-.07.17-.2.7-.81.88-1.09.19-.28.37-.23.63-.14.26.1 1.65.78 1.93.92.28.14.47.21.54.32.07.12.07.68-.18 1.38"
                      />
                    </svg>
                    {dict.contact.info.whatsappLabel}
                  </a>
                  {sent ? (
                    <p className={styles.formNote}>
                      {dict.contact.form.success}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>

            <p className={styles.footerNote}>
              © {new Date().getFullYear()} {dict.footer.rights}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
