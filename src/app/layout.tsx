import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const display = Source_Serif_4({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SSC Outsourcing | Finanzas claras para operar en Costa Rica",
    template: "%s | SSC Outsourcing",
  },
  description:
    "Desde 2007: contabilidad, planillas, impuestos CR/US, auditoría, facturación electrónica y zona franca. La capa de control financiero para empresas en Costa Rica.",
  metadataBase: new URL("https://www.sscoutsourcing.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-ssc.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    siteName: "SSC Outsourcing",
    title: "SSC Outsourcing | Finanzas claras para operar en Costa Rica",
    description:
      "Desde 2007: contabilidad, planillas, impuestos CR/US, auditoría, facturación electrónica y zona franca. La capa de control financiero para empresas en Costa Rica.",
    url: "https://www.sscoutsourcing.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
