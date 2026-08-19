export const BOOKING_TZ = "America/Costa_Rica";
export const BOOKING_DURATION_MIN = 30;
export const BOOKING_CHANNELS = ["zoom", "whatsapp"] as const;
export const BOOKING_TO_EMAIL_DEFAULT = "esolis@sscoutsourcing.com";

export type BookingChannel = (typeof BOOKING_CHANNELS)[number];

export type DaySlots = {
  dateKey: string;
  label: string;
  weekday: string;
  slots: { startIso: string; label: string }[];
};

export type CalendarCell = {
  dateKey: string | null;
  day: number | null;
  available: boolean;
  isToday: boolean;
};

const HOURS = [9, 10, 11, 13, 14, 15];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Build a Date for a wall-clock time in America/Costa_Rica. */
export function crLocalToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
): Date {
  const asUtc = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  const shown = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(asUtc);

  const get = (type: string) =>
    Number(shown.find((part) => part.type === type)?.value ?? "0");

  let hourPart = get("hour");
  if (hourPart === 24) hourPart = 0;

  const driftMs =
    Date.UTC(get("year"), get("month") - 1, get("day"), hourPart, get("minute")) -
    Date.UTC(year, month - 1, day, hour, minute);

  return new Date(asUtc.getTime() - driftMs);
}

function crParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BOOKING_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  let hour = Number(get("hour"));
  if (hour === 24) hour = 0;

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: get("weekday"),
    hour,
    minute: Number(get("minute")),
  };
}

function isWeekend(weekday: string) {
  return weekday === "Sat" || weekday === "Sun";
}

export function formatSlotLabel(startIso: string, locale: "es" | "en") {
  const start = new Date(startIso);
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    timeZone: BOOKING_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(start);
}

export function formatDayLabel(dateKey: string, locale: "es" | "en") {
  const [year, month, day] = dateKey.split("-").map(Number);
  const noon = crLocalToUtc(year, month, day, 12, 0);
  return {
    weekday: new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      timeZone: BOOKING_TZ,
      weekday: "short",
    }).format(noon),
    label: new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      timeZone: BOOKING_TZ,
      day: "numeric",
      month: "short",
    }).format(noon),
    long: new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      timeZone: BOOKING_TZ,
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(noon),
  };
}

export function formatMonthTitle(year: number, month: number, locale: "es" | "en") {
  const noon = crLocalToUtc(year, month, 1, 12, 0);
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    timeZone: BOOKING_TZ,
    month: "long",
    year: "numeric",
  }).format(noon);
}

export function getSlotsForDate(
  dateKey: string,
  locale: "es" | "en",
  booked: ReadonlySet<string> = new Set(),
) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const noon = crLocalToUtc(year, month, day, 12, 0);
  const parts = crParts(noon);
  if (isWeekend(parts.weekday)) return [];

  const now = new Date();
  const earliest = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const slots: { startIso: string; label: string }[] = [];

  for (const hour of HOURS) {
    for (const minute of [0, 30]) {
      if (hour === 11 && minute === 30) continue;
      if (hour === 15 && minute === 30) continue;
      const start = crLocalToUtc(year, month, day, hour, minute);
      if (start < earliest) continue;
      const startIso = start.toISOString();
      if (booked.has(startIso)) continue;
      slots.push({
        startIso,
        label: formatSlotLabel(startIso, locale),
      });
    }
  }

  return slots;
}

export function buildTimetable(locale: "es" | "en", daysAhead = 14): DaySlots[] {
  const today = crParts(new Date());
  const days: DaySlots[] = [];

  for (let offset = 0; offset < daysAhead + 10 && days.length < daysAhead; offset += 1) {
    const probe = crLocalToUtc(today.year, today.month, today.day, 12, 0);
    probe.setUTCDate(probe.getUTCDate() + offset);
    const parts = crParts(probe);
    if (isWeekend(parts.weekday)) continue;

    const dateKey = `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`;
    const slots = getSlotsForDate(dateKey, locale);
    if (slots.length === 0) continue;
    const dayMeta = formatDayLabel(dateKey, locale);
    days.push({
      dateKey,
      label: dayMeta.label,
      weekday: dayMeta.weekday,
      slots,
    });
  }

  return days;
}

export function buildMonthGrid(
  year: number,
  month: number,
  locale: "es" | "en",
  booked: ReadonlySet<string> = new Set(),
): CalendarCell[] {
  const first = crLocalToUtc(year, month, 1, 12, 0);
  const firstParts = crParts(first);
  const weekdayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    firstParts.weekday,
  );
  let dim = 28;
  for (let d = 28; d <= 31; d += 1) {
    const p = crParts(crLocalToUtc(year, month, d, 12, 0));
    if (p.month !== month) break;
    dim = d;
  }

  const today = crParts(new Date());
  const todayKey = `${today.year}-${pad(today.month)}-${pad(today.day)}`;
  const cells: CalendarCell[] = [];

  for (let i = 0; i < Math.max(weekdayIndex, 0); i += 1) {
    cells.push({ dateKey: null, day: null, available: false, isToday: false });
  }

  for (let day = 1; day <= dim; day += 1) {
    const dateKey = `${year}-${pad(month)}-${pad(day)}`;
    const slots = getSlotsForDate(dateKey, locale, booked);
    cells.push({
      dateKey,
      day,
      available: slots.length > 0,
      isToday: dateKey === todayKey,
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ dateKey: null, day: null, available: false, isToday: false });
  }

  return cells;
}

export function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

export function isValidBookingSlot(startIso: string) {
  const start = new Date(startIso);
  if (Number.isNaN(start.getTime())) return false;
  const parts = crParts(start);
  if (isWeekend(parts.weekday)) return false;
  if (!HOURS.includes(parts.hour)) return false;
  if (parts.minute !== 0 && parts.minute !== 30) return false;
  if (parts.hour === 11 && parts.minute === 30) return false;
  if (parts.hour === 15 && parts.minute === 30) return false;
  const lead = new Date(Date.now() + 2 * 60 * 60 * 1000);
  if (start < lead) return false;
  const rebuilt = crLocalToUtc(
    parts.year,
    parts.month,
    parts.day,
    parts.hour,
    parts.minute,
  );
  return Math.abs(rebuilt.getTime() - start.getTime()) < 60_000;
}

export function googleCalendarUrl(input: {
  title: string;
  startIso: string;
  details: string;
  location: string;
}) {
  const start = new Date(input.startIso);
  const end = new Date(start.getTime() + BOOKING_DURATION_MIN * 60_000);
  const stamp = (date: Date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: input.details,
    location: input.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function formatBookingWhen(startIso: string, locale: "es" | "en") {
  const start = new Date(startIso);
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    timeZone: BOOKING_TZ,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(start);
}

export function bookingMailtoUrl(input: {
  to: string;
  subject: string;
  body: string;
}) {
  return `mailto:${input.to}?subject=${encodeURIComponent(input.subject)}&body=${encodeURIComponent(input.body)}`;
}
