import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SscExperience } from "@/components/experience/SscExperience";
import { LocaleLang } from "@/components/LocaleLang";
import { getDictionary } from "@/content/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const dict = getDictionary(raw);
  const url = `https://www.sscoutsourcing.com/${raw}`;
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: url,
      languages: {
        es: "https://www.sscoutsourcing.com/es",
        en: "https://www.sscoutsourcing.com/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "SSC Outsourcing",
      title: dict.meta.title,
      description: dict.meta.description,
      url,
      locale: raw === "es" ? "es_CR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <LocaleLang locale={locale} />
      <SscExperience locale={locale} dict={dict} />
    </>
  );
}
