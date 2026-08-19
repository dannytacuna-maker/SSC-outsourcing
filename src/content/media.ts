export const mapsLink = "https://maps.app.goo.gl/XbPuu5RRmexrtN8A7";

export const mapsEmbed =
  "https://www.google.com/maps?q=9.9310625,-84.1795625&z=17&output=embed";

export const wazeLink =
  "https://www.waze.com/ul?ll=9.9310625,-84.1795625&navigate=yes";

export const COMPANY_WHATSAPP_PHONE = "50688696489";

/** Opens WhatsApp chat with an optional prefilled message (wa.me deep link). */
export function companyWhatsAppHref(message?: string) {
  const base = `https://wa.me/${COMPANY_WHATSAPP_PHONE}`;
  const text = message?.trim();
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const companyWhatsApp = companyWhatsAppHref();

export const socialLinks = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/sscoutsourcing/",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/sscoutsourcing/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ssc-outsourcing/?originalSubdomain=cr",
  },
] as const;

export type SocialId = (typeof socialLinks)[number]["id"];

/** Web stills from FOTOS-SSC (SHIRLEY, GRUPOS, REMODELACION). */
export const photos = {
  team: {
    src: "/photos/team.jpg",
    alt: {
      es: "Equipo de SSC Outsourcing en la sala de juntas, Santa Ana",
      en: "SSC Outsourcing team in the boardroom, Santa Ana",
    },
  },
  teamWide: {
    src: "/photos/team-wide.jpg",
    alt: {
      es: "El equipo de SSC Outsourcing en el piso de operaciones",
      en: "The SSC Outsourcing team on the operations floor",
    },
  },
  meeting: {
    src: "/photos/meeting.jpg",
    alt: {
      es: "Reunión de trabajo revisando el alcance de servicios SSC",
      en: "Working session reviewing SSC’s scope of services",
    },
  },
  shirley: {
    src: "/photos/shirley.jpg",
    alt: {
      es: "Shirley Solís, Fundadora y Directora de SSC Outsourcing",
      en: "Shirley Solís, Founder and Director of SSC Outsourcing",
    },
  },
  boardroom: {
    src: "/photos/boardroom.jpg",
    alt: {
      es: "Sala de juntas de SSC Outsourcing en Santa Ana",
      en: "SSC Outsourcing boardroom in Santa Ana",
    },
  },
  floor: {
    src: "/photos/floor.jpg",
    alt: {
      es: "Piso de operaciones de SSC Outsourcing",
      en: "SSC Outsourcing operations floor",
    },
  },
  deskFocus: {
    src: "/photos/desk-focus.png",
    alt: {
      es: "Profesional de SSC en estación de trabajo",
      en: "SSC professional at a workstation",
    },
  },
  whyLeadership: {
    src: "/photos/why-leadership.png",
    alt: {
      es: "Equipo SSC revisando el alcance de servicios en sala de juntas",
      en: "SSC team reviewing service scope in the boardroom",
    },
  },
  whyJurisdictions: {
    src: "/photos/why-jurisdictions.png",
    alt: {
      es: "Sesión de trabajo SSC con clientes y equipo en la oficina",
      en: "SSC working session with clients and team in the office",
    },
  },
  loveService: {
    src: "/photos/love-service.png",
    alt: {
      es: "Presentación de servicio SSC en la sala de juntas",
      en: "SSC service presentation in the boardroom",
    },
  },
  loveFirm: {
    src: "/photos/love-firm.png",
    alt: {
      es: "Equipo SSC presentando el valor de la firma ante el grupo",
      en: "SSC team presenting the firm’s value to the group",
    },
  },
  boardroomScope: {
    src: "/photos/boardroom-scope.png",
    alt: {
      es: "Equipo SSC revisando el alcance de servicios en sala de juntas",
      en: "SSC team reviewing service scope in the boardroom",
    },
  },
  officeFloor: {
    src: "/photos/office-floor.png",
    alt: {
      es: "Piso abierto de operaciones de SSC Outsourcing",
      en: "Open operations floor at SSC Outsourcing",
    },
  },
  teamFloor: {
    src: "/photos/team-floor.png",
    alt: {
      es: "Equipo SSC trabajando en el piso de operaciones",
      en: "SSC team working on the operations floor",
    },
  },
} as const;
