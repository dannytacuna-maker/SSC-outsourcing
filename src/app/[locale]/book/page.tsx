import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingExperience } from "@/components/booking/BookingExperience";
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
  return {
    title: `${dict.contact.booking.pageHeadline} | SSC Outsourcing`,
    description: dict.contact.booking.pageSupport,
    alternates: {
      languages: {
        es: "/es/book",
        en: "/en/book",
      },
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <LocaleLang locale={locale} />
      <BookingExperience locale={locale} dict={dict} />
    </>
  );
}
