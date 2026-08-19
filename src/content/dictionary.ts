import type { Locale } from "@/lib/i18n";

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    services: string;
    why: string;
    leadership: string;
    process: string;
    contact: string;
    talk: string;
    book: string;
  };
  hero: {
    brand: string;
    headline: string;
    support: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scrollHint: string;
    clearance: [string, string, string];
  };
  wedge: {
    eyebrow: string;
    headline: string;
    support: string;
    points: { title: string; body: string }[];
    profile: {
      pillarsLabel: string;
      pillars: { label: string; body: string }[];
      valuesLabel: string;
      values: string[];
      aaa: {
        eyebrow: string;
        headline: string;
        items: { letter: string; title: string; body: string }[];
      };
    };
  };
  services: {
    eyebrow: string;
    headline: string;
    support: string;
    learnMore: string;
    items: {
      id: string;
      title: string;
      body: string;
      detail: string;
      bullets: string[];
    }[];
  };
  trust: {
    eyebrow: string;
    headline: string;
    support: string;
    stats: { value: string; label: string }[];
    teamLabel: string;
    leadershipTitle: string;
    sectorsLabel: string;
    sectors: string[];
    lead: {
      name: string;
      role: string;
      bio: string;
      email: string;
    };
  };
  process: {
    eyebrow: string;
    headline: string;
    support: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    support: string;
    form: {
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      success: string;
    };
    booking: {
      eyebrow: string;
      headline: string;
      support: string;
      pageHeadline: string;
      pageSupport: string;
      features: { title: string; body: string }[];
      channelLabel: string;
      zoom: string;
      whatsapp: string;
      dayLabel: string;
      timeLabel: string;
      pickDay: string;
      detailsLabel: string;
      name: string;
      email: string;
      phone: string;
      phoneHint: string;
      company: string;
      note: string;
      notePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      doneTitle: string;
      doneBody: string;
      error: string;
      calendarCta: string;
      emptySlots: string;
      duration: string;
      cta: string;
      backHome: string;
      notifyFailed: string;
    };
    info: {
      addressLabel: string;
      address: string;
      phoneLabel: string;
      phone: string;
      whatsappLabel: string;
      whatsapp: string;
      whatsappMessage: string;
      emailLabel: string;
      email: string;
      callLabel: string;
      mapsLabel: string;
      mapsCta: string;
      wazeCta: string;
    };
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

const es: Dictionary = {
  meta: {
    title: "SSC Outsourcing | Finanzas claras para operar en Costa Rica",
    description:
      "Desde 2007: contabilidad, planillas, impuestos CR/US, auditoría, facturación electrónica y zona franca. La capa de control financiero para empresas en Costa Rica.",
  },
  nav: {
    services: "Servicios",
    why: "SSC",
    leadership: "Nuestro equipo",
    process: "Por qué SSC",
    contact: "Contacto",
    talk: "Hablar con SSC",
    book: "Agendar llamada",
  },
  hero: {
    brand: "SSC Outsourcing",
    headline: "Finanzas claras.\nOperación libre.",
    support:
      "Contabilidad, planillas, impuestos CR/US y auditoría — para que tu equipo se enfoque en el negocio, no en la burocracia.",
    ctaPrimary: "Hablar con SSC",
    ctaSecondary: "Ver servicios",
    scrollHint: "Desplaza para ver SSC Outsourcing",
    clearance: ["Abierto", "Cumplido", "Reportado"],
  },
  wedge: {
    eyebrow: "Perfil de la compañía",
    headline: "Fundada en 2007 para operar el control financiero con criterio.",
    support:
      "SSC Outsourcing está compuesta por profesionales altamente experimentados que brindan outsourcing en contabilidad, cumplimiento tributario, nómina y servicios administrativos. Mantenemos relaciones de larga duración con nuestros clientes — empresas locales, industriales, profesionales y grandes corporaciones internacionales.",
    points: [
      {
        title: "Costa Rica + Estados Unidos",
        body: "Estructuras transfronterizas y cumplimiento tributario en ambas jurisdicciones, con alianza de expertos fiscales en EE. UU.",
      },
      {
        title: "Régimen de zona franca",
        body: "Obligaciones mensuales, auxiliares de activos fijos, informes anuales y acompañamiento en auditorías de PROCOMER.",
      },
      {
        title: "Operación sin fricción",
        body: "Diseñamos el back-office para reducir estructura administrativa y liberar foco en el negocio principal.",
      },
    ],
    profile: {
      pillarsLabel: "Misión, visión y metas",
      pillars: [
        {
          label: "Misión",
          body: "Brindar a nuestros clientes soluciones contables integrales y personalizadas que les permitan mantener un control financiero preciso y eficiente.",
        },
        {
          label: "Visión",
          body: "Ser reconocidos como líderes en servicios contables y asesoría financiera, proporcionando soluciones innovadoras y confiables.",
        },
        {
          label: "Metas",
          body: "Proporcionar a nuestros clientes informes contables en tiempo y forma.",
        },
      ],
      valuesLabel: "Valores",
      values: [
        "Ética e integridad",
        "Confidencialidad",
        "Sostenibilidad",
        "Profesionalismo",
        "Responsabilidad",
        "Trabajo en equipo",
        "Comunicación",
      ],
      aaa: {
        eyebrow: "Calidad AAA",
        headline: "Tres amores que definen cómo trabajamos.",
        items: [
          {
            letter: "A",
            title: "Amor por el servicio",
            body: "Amor por dar un buen servicio.",
          },
          {
            letter: "A",
            title: "Amor por la empresa",
            body: "Amor y credibilidad por la empresa.",
          },
          {
            letter: "A",
            title: "Amor por la eficiencia",
            body: "Amor por ser eficientes.",
          },
        ],
      },
    },
  },
  services: {
    eyebrow: "Servicios",
    headline: "Lo que SSC Outsourcing asegura para su operación.",
    support:
      "Siete líneas. Un expediente. Cada una es una función de control financiero — no un catálogo.",
    learnMore: "Saber más",
    items: [
      {
        id: "accounting",
        title: "Contabilidad",
        body: "La base del control: libros, costos y reportes que se pueden leer.",
        detail:
          "Servicios contables integrales pensados para optimizar la estructura administrativa. SSC lleva la contabilidad general, produce reportes financieros accionables y mantiene contabilidad de costos — incluyendo costos de proyectos — para que la operación se vea con números claros, no con carpetas atrasadas.",
        bullets: [
          "Contabilidad general y cierre mensual",
          "Estados y reportes financieros",
          "Contabilidad de costos y de proyectos",
          "Apoyo en la presentación de impuestos",
        ],
      },
      {
        id: "tax-cr",
        title: "Impuestos en Costa Rica",
        body: "Cumplimiento tributario con horizonte de corto y largo plazo.",
        detail:
          "Asesoría fiscal dinámica y cumplimiento ante Hacienda. Diseñamos la posición tributaria de la empresa considerando objetivos inmediatos y de mediano plazo, para que las obligaciones se presenten a tiempo y las decisiones de estructura no se tomen a ciegas.",
        bullets: [
          "Cumplimiento tributario mensual y anual",
          "Asesoría fiscal con visión de estructura",
          "Acompañamiento ante requerimientos",
        ],
      },
      {
        id: "tax-us",
        title: "Impuestos en Estados Unidos",
        body: "Reporting corporativo y personal cuando la operación cruza la frontera.",
        detail:
          "Apoyo a clientes internacionales con estructuras transfronterizas y cumplimiento dual Costa Rica / Estados Unidos. Trabajamos con una alianza de expertos fiscales en EE. UU. para que el reporting corporativo y personal no se rompa entre jurisdicciones.",
        bullets: [
          "Estructuras transfronterizas CR ↔ US",
          "Cumplimiento dual corporativo y personal",
          "Alianza con expertos fiscales en Estados Unidos",
        ],
      },
      {
        id: "audit",
        title: "Auditoría",
        body: "Riesgo financiero y operativo, con foco donde importa.",
        detail:
          "Auditorías financieras y operativas enfocadas en las áreas clave de riesgo. No es un checklist genérico: revisamos la información que mueve decisiones — estados, controles y operación — para que dirección sepa qué está sólido y qué hay que corregir.",
        bullets: [
          "Auditorías financieras",
          "Auditorías operativas",
          "Revisión de áreas de riesgo y controles",
        ],
      },
      {
        id: "payroll",
        title: "Planillas",
        body: "Cálculo, banca, CCSS, INS y aguinaldo — de punta a punta.",
        detail:
          "Operamos la planilla completa: cálculo con deducciones y retenciones, archivos de banca electrónica, reportes a la CCSS y al INS, aguinaldo y liquidaciones. El equipo recibe a tiempo; la empresa queda en regla sin montar un departamento de planillas.",
        bullets: [
          "Cálculo con deducciones y retenciones",
          "Archivos de banca electrónica",
          "Reportes CCSS e INS",
          "Aguinaldo y liquidaciones",
        ],
      },
      {
        id: "einvoice",
        title: "Facturación electrónica",
        body: "Activación, procedimiento según el giro y conciliación con cartera.",
        detail:
          "Ponemos en marcha la facturación electrónica con el proveedor, definimos el procedimiento según el giro del negocio y la conciliamos con cuentas por cobrar. Los reportes periódicos dejan el ciclo de facturación cerrado — no como un trámite suelto de Hacienda.",
        bullets: [
          "Activación con el proveedor autorizado",
          "Procedimiento según el giro de negocio",
          "Conciliación con cuentas por cobrar",
          "Reportes periódicos de facturación",
        ],
      },
      {
        id: "freezone",
        title: "Régimen zona franca",
        body: "Obligaciones formales, activos fijos e informes ante PROCOMER.",
        detail:
          "Cumplimiento del régimen de zona franca: obligaciones formales mensuales, auxiliares de activos fijos, informes anuales y acompañamiento en auditorías de PROCOMER. La operación en régimen se sostiene con expediente listo, no con carreras de último día.",
        bullets: [
          "Obligaciones formales mensuales",
          "Auxiliares de activos fijos",
          "Informes anuales del régimen",
          "Acompañamiento de auditorías PROCOMER",
        ],
      },
    ],
  },
  trust: {
    eyebrow: "Confianza",
    headline: "Desde 2007 afinando el control financiero.",
    support:
      "Amplio respaldo en comercial, industrial, servicios, inmobiliario, fideicomisos y títulos valores — incluyendo contabilidad de costos de proyectos.",
    stats: [
      { value: "2007", label: "Año de fundación" },
      { value: "20+", label: "Años con clientes" },
      { value: "CR ↔ US", label: "Alcance tributario" },
    ],
    teamLabel: "El equipo",
    leadershipTitle: "El equipo de SSC Outsourcing",
    sectorsLabel: "Sectores que acompañamos",
    sectors: [
      "Comercial",
      "Industrial",
      "Servicios",
      "Inmobiliario",
      "Fideicomisos",
      "Títulos valores",
    ],
    lead: {
      name: "Shirley Solís",
      role: "Fundadora y Directora",
      bio: "Shirley Solís fundó y dirige SSC Outsourcing. Bajo su dirección la empresa opera el back-office financiero de compañías en Costa Rica — contabilidad, planillas, impuestos CR/US, auditoría y régimen de zona franca — con un estándar de expediente listo, no de trámite de último día.",
      email: "ssolis@sscoutsourcing.com",
    },
  },
  process: {
    eyebrow: "Por qué SSC",
    headline: "Desde 2007 asegurando el control financiero de quien opera en Costa Rica.",
    support:
      "El cliente elige SSC porque la dirección responde por el expediente — no un trámite suelto, una operación que se puede defender ante Hacienda, la CCSS y PROCOMER.",
    steps: [
      {
        title: "Dirección presente",
        body: "Shirley Solís fundó y dirige la empresa. Las decisiones de alcance, plazo y criterio no se diluyen en una mesa anónima: hay un responsable con nombre.",
      },
      {
        title: "Dos jurisdicciones, un criterio",
        body: "Costa Rica y Estados Unidos en la misma operación, con alianza de expertos fiscales en EE. UU. La estructura transfronteriza no se parte entre dos proveedores.",
      },
      {
        title: "Expediente listo",
        body: "Contabilidad, planillas, impuestos y zona franca se sostienen con archivo en orden. El cliente no improvisa el último día: opera con claridad todo el mes.",
      },
    ],
  },
  contact: {
    eyebrow: "Contacto",
    headline: "Hablemos sin compromiso.",
    support:
      "Cuéntanos qué necesitas operar con claridad. Respondemos desde Santa Ana, San José.",
    form: {
      name: "Nombre",
      email: "Correo",
      company: "Empresa",
      message: "¿En qué podemos ayudar?",
      submit: "Enviar mensaje",
      success: "Listo. Se abrirá tu correo para enviar el mensaje a SSC.",
    },
    booking: {
      eyebrow: "Consulta gratuita",
      headline: "Reserve 30 minutos por Zoom o WhatsApp.",
      support:
        "Abra la agenda, elija día y hora, deje una nota previa y confirme la sesión.",
      pageHeadline: "Agende una llamada con SSC",
      pageSupport:
        "30 minutos de conversación clara sobre contabilidad, planillas, impuestos o cumplimiento en Costa Rica.",
      features: [
        {
          title: "Llamada de 30 minutos",
          body: "Sesión enfocada por Zoom o WhatsApp.",
        },
        {
          title: "Sin compromiso",
          body: "Conversación directa, sin presión de venta.",
        },
        {
          title: "Experiencia local",
          body: "Desde 2007 operando el control financiero en Costa Rica.",
        },
      ],
      channelLabel: "Canal",
      zoom: "Zoom",
      whatsapp: "WhatsApp",
      dayLabel: "Día",
      timeLabel: "Hora (Costa Rica)",
      pickDay: "Seleccione un día disponible en el calendario.",
      detailsLabel: "Sus datos",
      name: "Nombre",
      email: "Correo",
      phone: "Teléfono / WhatsApp",
      phoneHint: "+506 …",
      company: "Empresa",
      note: "Nota previa",
      notePlaceholder: "Cuéntenos brevemente qué quiere revisar en la llamada.",
      submit: "Confirmar reserva",
      submitting: "Enviando…",
      success: "Solicitud enviada.",
      doneTitle: "Listo — solicitud enviada",
      doneBody:
        "Recibimos su solicitud de llamada. Agregue la cita a Google Calendar y le confirmamos el enlace o WhatsApp.",
      error: "No se pudo enviar la reserva. Intente de nuevo.",
      calendarCta: "Agregar a Google Calendar",
      emptySlots: "No hay horarios disponibles este día.",
      duration: "Sesiones de 30 minutos · Lun–Vie",
      cta: "Agendar llamada de 30 min",
      backHome: "Volver al sitio",
      notifyFailed:
        "No se pudo notificar al anfitrión por correo. Intente de nuevo en un momento.",
    },
    info: {
      addressLabel: "Dirección",
      address:
        "Centro Comercial Paseo de Angel, local 12, Santa Ana, San José, Costa Rica",
      phoneLabel: "Teléfono",
      phone: "(506) 2582-1879",
      whatsappLabel: "WhatsApp",
      whatsapp: "+506 8869 6489",
      whatsappMessage:
        "Hola, me gustaría saber más sobre los servicios de SSC Outsourcing.",
      emailLabel: "Email",
      email: "info@sscoutsourcing.com",
      callLabel: "Llamar",
      mapsLabel: "Ubicación",
      mapsCta: "Abrir en Google Maps",
      wazeCta: "Ir con Waze",
    },
  },
  footer: {
    tagline: "La capa de control financiero para operar en Costa Rica.",
    rights: "SSC Outsourcing. Todos los derechos reservados.",
  },
};

const en: Dictionary = {
  meta: {
    title: "SSC Outsourcing | Clear finance to operate in Costa Rica",
    description:
      "Since 2007: accounting, payroll, CR/US tax, auditing, electronic invoicing, and free-zone compliance. The finance control layer for companies in Costa Rica.",
  },
  nav: {
    services: "Services",
    why: "SSC",
    leadership: "Our team",
    process: "Why SSC",
    contact: "Contact",
    talk: "Talk to SSC",
    book: "Book a call",
  },
  hero: {
    brand: "SSC Outsourcing",
    headline: "Clear finance.\nFree to operate.",
    support:
      "Accounting, payroll, CR/US tax, and auditing — so your team focuses on the business, not the bureaucracy.",
    ctaPrimary: "Talk to SSC",
    ctaSecondary: "View services",
    scrollHint: "Scroll to see SSC Outsourcing",
    clearance: ["Open", "Compliant", "Reported"],
  },
  wedge: {
    eyebrow: "Company profile",
    headline: "Founded in 2007 to run financial control with judgment.",
    support:
      "SSC Outsourcing is built by highly experienced professionals who provide outsourcing in accounting, tax compliance, payroll, and administrative services. We keep long-standing client relationships — local companies, industrial and professional firms, and large international corporations.",
    points: [
      {
        title: "Costa Rica + United States",
        body: "Cross-border structures and tax compliance in both jurisdictions, backed by alliances with U.S. tax experts.",
      },
      {
        title: "Free Zone regime",
        body: "Monthly formal obligations, fixed-asset auxiliaries, annual reports, and accompaniment through PROCOMER audits.",
      },
      {
        title: "Frictionless operations",
        body: "We design the back office to downsize administrative structure and free focus for your core business.",
      },
    ],
    profile: {
      pillarsLabel: "Mission, vision, and goals",
      pillars: [
        {
          label: "Mission",
          body: "Deliver integral, personalized accounting solutions that help our clients keep precise and efficient financial control.",
        },
        {
          label: "Vision",
          body: "Be recognized as leaders in accounting services and financial advisory, providing innovative and reliable solutions.",
        },
        {
          label: "Goals",
          body: "Provide our clients with accounting reports that arrive on time and in full.",
        },
      ],
      valuesLabel: "Values",
      values: [
        "Ethics and integrity",
        "Confidentiality",
        "Sustainability",
        "Professionalism",
        "Responsibility",
        "Teamwork",
        "Communication",
      ],
      aaa: {
        eyebrow: "AAA quality",
        headline: "Three loves that define how we work.",
        items: [
          {
            letter: "A",
            title: "Love of service",
            body: "Love for delivering great service.",
          },
          {
            letter: "A",
            title: "Love of the firm",
            body: "Love and credibility for the company.",
          },
          {
            letter: "A",
            title: "Love of efficiency",
            body: "Love for being efficient.",
          },
        ],
      },
    },
  },
  services: {
    eyebrow: "Services",
    headline: "What SSC Outsourcing secures for your operation.",
    support:
      "Seven lines. One file. Each is a function of financial control — not a catalog.",
    learnMore: "Learn more",
    items: [
      {
        id: "accounting",
        title: "Accounting",
        body: "The control layer: books, costs, and reports you can actually read.",
        detail:
          "Integral accounting services designed to optimize your administrative structure. SSC runs general accounting, produces actionable financial reports, and keeps cost accounting — including project costs — so the operation is visible in numbers, not in overdue folders.",
        bullets: [
          "General accounting and monthly close",
          "Financial statements and reporting",
          "Cost and project accounting",
          "Tax filing support",
        ],
      },
      {
        id: "tax-cr",
        title: "Tax compliance in Costa Rica",
        body: "Tax compliance with short- and long-term objectives in view.",
        detail:
          "Dynamic fiscal advisory and compliance before Hacienda. We shape the company’s tax position with both immediate and medium-term objectives, so filings land on time and structure decisions are not made in the dark.",
        bullets: [
          "Monthly and annual tax compliance",
          "Advisory with a structural view",
          "Support on authority requests",
        ],
      },
      {
        id: "tax-us",
        title: "Tax compliance in the USA",
        body: "Corporate and personal reporting when the operation crosses the border.",
        detail:
          "Support for international clients with cross-border structures and dual Costa Rica / United States compliance. We work with a U.S. tax-expert alliance so corporate and personal reporting does not break between jurisdictions.",
        bullets: [
          "Cross-border CR ↔ US structures",
          "Dual corporate and personal compliance",
          "Alliance with U.S. tax experts",
        ],
      },
      {
        id: "audit",
        title: "Auditing",
        body: "Financial and operational risk, focused where it matters.",
        detail:
          "Financial and operational audits focused on key risk areas. Not a generic checklist: we review the information that moves decisions — statements, controls, and operations — so leadership knows what is solid and what needs to be corrected.",
        bullets: [
          "Financial audits",
          "Operational audits",
          "Risk-area and control reviews",
        ],
      },
      {
        id: "payroll",
        title: "Payroll services",
        body: "Calculation, banking, CCSS, INS, and aguinaldo — end to end.",
        detail:
          "We run payroll in full: calculation with deductions and withholdings, electronic bank files, CCSS and INS reports, aguinaldo and settlements. The team is paid on time; the company stays in order without standing up a payroll department.",
        bullets: [
          "Deductions and withholdings",
          "Electronic bank payroll files",
          "CCSS and INS reports",
          "Aguinaldo and settlements",
        ],
      },
      {
        id: "einvoice",
        title: "Electronic invoicing",
        body: "Activation, procedures by business nature, and AR reconciliation.",
        detail:
          "We stand up electronic invoicing with the authorized supplier, define the procedure by the nature of the business, and reconcile it with accounts receivable. Periodic reports close the billing cycle — not as a loose Hacienda errand.",
        bullets: [
          "Activation with the authorized supplier",
          "Procedures by business nature",
          "Reconciliation with accounts receivable",
          "Periodic invoicing reports",
        ],
      },
      {
        id: "freezone",
        title: "Free Zone regime",
        body: "Formal obligations, fixed assets, and reports before PROCOMER.",
        detail:
          "Free Zone regime compliance: monthly formal obligations, fixed-asset auxiliaries, annual reports, and accompaniment through PROCOMER audits. Regime operations hold with a ready file — not a last-day scramble.",
        bullets: [
          "Monthly formal obligations",
          "Fixed-asset auxiliaries",
          "Annual regime reports",
          "PROCOMER audit support",
        ],
      },
    ],
  },
  trust: {
    eyebrow: "Trust",
    headline: "Since 2007 refining financial control.",
    support:
      "Deep support across commercial, industrial, services, real estate, trusts, and securities — including project cost accounting.",
    stats: [
      { value: "2007", label: "Year founded" },
      { value: "20+", label: "Years with clients" },
      { value: "CR ↔ US", label: "Tax reach" },
    ],
    teamLabel: "The team",
    leadershipTitle: "The SSC Outsourcing team",
    sectorsLabel: "Sectors we support",
    sectors: [
      "Commercial",
      "Industrial",
      "Services",
      "Real estate",
      "Trusts",
      "Securities",
    ],
    lead: {
      name: "Shirley Solís",
      role: "Founder & Director",
      bio: "Shirley Solís founded and directs SSC Outsourcing. Under her leadership the company runs the financial back office for businesses in Costa Rica — accounting, payroll, CR/US tax, audit, and Free Zone regime — to a ready-file standard, not a last-day errand.",
      email: "ssolis@sscoutsourcing.com",
    },
  },
  process: {
    eyebrow: "Why SSC",
    headline: "Since 2007 securing financial control for companies that operate in Costa Rica.",
    support:
      "Clients choose SSC because leadership stands behind the file — not a loose errand, an operation that can be defended before Hacienda, CCSS, and PROCOMER.",
    steps: [
      {
        title: "Leadership in the room",
        body: "Shirley Solís founded and directs the company. Scope, timing, and judgment are not diluted across an anonymous desk: there is a named person responsible.",
      },
      {
        title: "Two jurisdictions, one standard",
        body: "Costa Rica and the United States in the same operation, with a U.S. tax-expert alliance. Cross-border structure is not split between two vendors.",
      },
      {
        title: "A file that is ready",
        body: "Accounting, payroll, tax, and Free Zone hold with an orderly archive. The client does not improvise on the last day: they operate with clarity all month.",
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    headline: "Let's talk — no obligation.",
    support:
      "Tell us what you need to operate with clarity. We respond from Santa Ana, San José.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      message: "How can we help?",
      submit: "Send message",
      success: "Ready. Your email client will open to send the message to SSC.",
    },
    booking: {
      eyebrow: "Free consultation",
      headline: "Reserve 30 minutes on Zoom or WhatsApp.",
      support:
        "Open the booking page, pick a day and time, leave a note, and confirm the session.",
      pageHeadline: "Book a call with SSC",
      pageSupport:
        "30 minutes of clear conversation about accounting, payroll, tax, or compliance in Costa Rica.",
      features: [
        {
          title: "30-minute call",
          body: "Focused session via Zoom or WhatsApp.",
        },
        {
          title: "No obligations",
          body: "Direct advice, zero sales pressure.",
        },
        {
          title: "Local expertise",
          body: "Running financial control in Costa Rica since 2007.",
        },
      ],
      channelLabel: "Channel",
      zoom: "Zoom",
      whatsapp: "WhatsApp",
      dayLabel: "Day",
      timeLabel: "Time (Costa Rica)",
      pickDay: "Select an available day on the calendar.",
      detailsLabel: "Your details",
      name: "Name",
      email: "Email",
      phone: "Phone / WhatsApp",
      phoneHint: "+506 …",
      company: "Company",
      note: "Advance note",
      notePlaceholder: "Briefly tell us what you’d like to cover on the call.",
      submit: "Confirm booking",
      submitting: "Sending…",
      success: "Request sent.",
      doneTitle: "You're all set",
      doneBody:
        "We received your call request. Add it to Google Calendar — we’ll confirm the Zoom link or WhatsApp next.",
      error: "Could not send the booking. Please try again.",
      calendarCta: "Add to Google Calendar",
      emptySlots: "No times left on this day.",
      duration: "30-minute sessions · Mon–Fri",
      cta: "Book a 30-min call",
      backHome: "Back to site",
      notifyFailed:
        "Could not email the host. Please try again in a moment.",
    },
    info: {
      addressLabel: "Address",
      address:
        "#12 Centro Comercial Paseo de Angel, Santa Ana, San José, Costa Rica",
      phoneLabel: "Phone",
      phone: "(506) 2582-1879",
      whatsappLabel: "WhatsApp",
      whatsapp: "+506 8869 6489",
      whatsappMessage:
        "Hi, I'd like to know more about SSC Outsourcing's services.",
      emailLabel: "Email",
      email: "info@sscoutsourcing.com",
      callLabel: "Call",
      mapsLabel: "Location",
      mapsCta: "Open in Google Maps",
      wazeCta: "Go with Waze",
    },
  },
  footer: {
    tagline: "The finance control layer for operating in Costa Rica.",
    rights: "SSC Outsourcing. All rights reserved.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
