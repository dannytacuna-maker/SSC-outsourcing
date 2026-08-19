import type { SocialId } from "@/content/media";

type Props = {
  id: SocialId;
  className?: string;
};

export function SocialIcon({ id, className }: Props) {
  const common = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (id === "instagram") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg {...common} fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="currentColor">
      <path d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5M9.5 8.75V19.5H6.4V8.75zm7.66-.19c2.52 0 4.34 1.64 4.34 5.17V19.5h-3.1v-5.33c0-1.34-.48-2.25-1.68-2.25-.92 0-1.46.62-1.7 1.21-.09.21-.11.5-.11.8V19.5h-3.1s.04-9.13 0-10.08h3.1v1.43c.41-.64 1.15-1.54 2.25-1.54" />
    </svg>
  );
}
