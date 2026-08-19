import { Resend } from "resend";
import {
  BOOKING_CHANNELS,
  BOOKING_DURATION_MIN,
  BOOKING_TO_EMAIL_DEFAULT,
  BOOKING_TZ,
  formatBookingWhen,
  googleCalendarUrl,
  isValidBookingSlot,
  type BookingChannel,
} from "@/lib/booking";
import { reserveBookedSlot, releaseBookedSlot } from "@/lib/booked-slots";

export const runtime = "nodejs";

type BookingBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  note?: string;
  channel?: string;
  startIso?: string;
  locale?: string;
};

const TO_EMAIL =
  process.env.BOOKING_TO_EMAIL?.trim() || BOOKING_TO_EMAIL_DEFAULT;
const FROM_EMAIL =
  process.env.BOOKING_FROM_EMAIL?.trim() ||
  "SSC Outsourcing <onboarding@resend.dev>";

function isChannel(value: string): value is BookingChannel {
  return (BOOKING_CHANNELS as readonly string[]).includes(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendWithResend(input: {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
}) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
    html: input.html,
  });

  if (error) {
    throw new Error(error.message || "Resend failed");
  }

  return true;
}

async function sendWithWeb3Forms(input: Record<string, string>) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) return false;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      ...input,
    }),
  });

  if (!response.ok) {
    throw new Error("Web3Forms failed");
  }

  const payload = (await response.json()) as { success?: boolean; message?: string };
  if (!payload.success) {
    throw new Error(payload.message || "Web3Forms failed");
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingBody;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const note = String(body.note ?? "").trim();
    const channelRaw = String(body.channel ?? "").trim().toLowerCase();
    const startIso = String(body.startIso ?? "").trim();
    const locale = body.locale === "en" ? "en" : "es";

    if (!name || !email || !channelRaw || !startIso) {
      return Response.json(
        { error: "Missing required booking fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Invalid email." }, { status: 400 });
    }

    if (!isChannel(channelRaw)) {
      return Response.json({ error: "Invalid channel." }, { status: 400 });
    }

    if (!isValidBookingSlot(startIso)) {
      return Response.json(
        { error: "Selected time is not available." },
        { status: 400 },
      );
    }

    if (channelRaw === "whatsapp" && !phone) {
      return Response.json(
        { error: "Phone is required for WhatsApp bookings." },
        { status: 400 },
      );
    }

    const reserved = await reserveBookedSlot(startIso, {
      name,
      email,
      channel: channelRaw,
    });
    if (!reserved) {
      return Response.json(
        {
          error:
            locale === "es"
              ? "Ese horario ya fue reservado. Elige otro."
              : "That time was just booked. Please choose another.",
        },
        { status: 409 },
      );
    }

    try {
      return await completeBooking({
        name,
        email,
        phone,
        company,
        note,
        channelRaw,
        startIso,
        locale,
      });
    } catch (error) {
      await releaseBookedSlot(startIso);
      throw error;
    }
  } catch (error) {
    const raw =
      error instanceof Error ? error.message : "Could not send booking.";
    const message = /<html|cloudflare|just a moment/i.test(raw)
      ? "Could not send booking. Please try again."
      : raw;
    return Response.json({ error: message }, { status: 500 });
  }
}

async function completeBooking(input: {
  name: string;
  email: string;
  phone: string;
  company: string;
  note: string;
  channelRaw: BookingChannel;
  startIso: string;
  locale: "es" | "en";
}) {
  const {
    name,
    email,
    phone,
    company,
    note,
    channelRaw,
    startIso,
    locale,
  } = input;

  const when = formatBookingWhen(startIso, locale);
  const channelLabel = channelRaw === "zoom" ? "Zoom" : "WhatsApp";
  const subject = `SSC booking — ${channelLabel} — ${when}`;
  const guestLocation = channelRaw === "zoom" ? "Zoom" : "WhatsApp";
  const hostLocation =
    channelRaw === "zoom"
      ? "Zoom (link to confirm with guest)"
      : `WhatsApp · ${phone || "number TBD"}`;

  const guestDetails =
    locale === "es"
      ? `Llamada de 30 minutos con SSC Outsourcing (${channelLabel}).\nTe confirmaremos el enlace o WhatsApp.`
      : `30-minute call with SSC Outsourcing (${channelLabel}).\nWe'll confirm the link or WhatsApp.`;

  const hostDetails = [
    `30-minute ${channelLabel} call booked from the SSC website.`,
    "",
    `Guest: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Company: ${company || "—"}`,
    `Channel: ${channelLabel}`,
    `When: ${when} (${BOOKING_TZ})`,
    `Duration: ${BOOKING_DURATION_MIN} minutes`,
    "",
    "Advance note:",
    note || "—",
  ].join("\n");

  const guestCalendarUrl = googleCalendarUrl({
    title:
      locale === "es"
        ? "Reunión SSC Outsourcing (30 min)"
        : "SSC Outsourcing meeting (30 min)",
    startIso,
    details: guestDetails,
    location: guestLocation,
  });

  const hostCalendarUrl = googleCalendarUrl({
    title: `SSC call with ${name} · ${channelLabel}`,
    startIso,
    details: hostDetails,
    location: hostLocation,
  });

  const text = [
    "New 30-minute call booking from the SSC website.",
    "",
    `When: ${when} (${BOOKING_TZ})`,
    `Duration: ${BOOKING_DURATION_MIN} minutes`,
    `Channel: ${channelLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "—"}`,
    `Company: ${company || "—"}`,
    "",
    "Note:",
    note || "—",
    "",
    `Add to Google Calendar (full guest details): ${hostCalendarUrl}`,
  ].join("\n");

  const html = `
      <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.5;color:#0d1826">
        <h2 style="margin:0 0 12px">New SSC call booking</h2>
        <p style="margin:0 0 16px">A visitor requested a 30-minute ${channelLabel} session.</p>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr><td style="padding:6px 0;color:#567"><strong>When</strong></td><td style="padding:6px 0">${escapeHtml(when)} (${BOOKING_TZ})</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Duration</strong></td><td style="padding:6px 0">${BOOKING_DURATION_MIN} minutes</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Channel</strong></td><td style="padding:6px 0">${channelLabel}</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Name</strong></td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Email</strong></td><td style="padding:6px 0">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Phone</strong></td><td style="padding:6px 0">${escapeHtml(phone || "—")}</td></tr>
          <tr><td style="padding:6px 0;color:#567"><strong>Company</strong></td><td style="padding:6px 0">${escapeHtml(company || "—")}</td></tr>
          <tr><td style="padding:6px 0;color:#567;vertical-align:top"><strong>Note</strong></td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(note || "—")}</td></tr>
        </table>
        <p style="margin:20px 0 0">
          <a href="${hostCalendarUrl}" style="display:inline-block;background:#1e6fa8;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px">
            Add to Google Calendar (with guest details)
          </a>
        </p>
      </div>
    `;

  const notifyPayload = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    _replyto: email,
    name,
    email,
    phone: phone || "—",
    company: company || "—",
    channel: channelLabel,
    when: `${when} (${BOOKING_TZ})`,
    duration: `${BOOKING_DURATION_MIN} min`,
    note: note || "—",
    googleCalendar: hostCalendarUrl,
    message: text,
  };

  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      await sendWithResend({
        subject,
        text,
        html,
        replyTo: email,
      });
      return Response.json({
        ok: true,
        provider: "resend",
        calendarUrl: guestCalendarUrl,
        hostCalendarUrl,
        when,
        channel: channelRaw,
        hostEmail: TO_EMAIL,
      });
    } catch {
      // Continue to other providers.
    }
  }

  try {
    const sent = await sendWithWeb3Forms({
      subject,
      from_name: "SSC Outsourcing Booking",
      name,
      email,
      phone: phone || "—",
      company: company || "—",
      channel: channelLabel,
      when: `${when} (${BOOKING_TZ})`,
      duration: `${BOOKING_DURATION_MIN} min`,
      note: note || "—",
      googleCalendar: hostCalendarUrl,
      message: text,
    });
    if (sent) {
      return Response.json({
        ok: true,
        provider: "web3forms",
        calendarUrl: guestCalendarUrl,
        hostCalendarUrl,
        when,
        channel: channelRaw,
        hostEmail: TO_EMAIL,
      });
    }
  } catch {
    // Continue to client notify.
  }

  return Response.json({
    ok: true,
    provider: "client-notify",
    calendarUrl: guestCalendarUrl,
    hostCalendarUrl,
    when,
    channel: channelRaw,
    hostEmail: TO_EMAIL,
    notifyUrl: `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
    notifyPayload,
  });
}
