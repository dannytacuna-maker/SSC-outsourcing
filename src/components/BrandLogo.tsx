import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
  /** Visual height in CSS pixels; width follows intrinsic 506:230 ratio */
  height?: number;
  /** onDark lifts the mark on navy UIs; onLight keeps it crisp on white */
  tone?: "onDark" | "onLight";
};

/**
 * Official SSC Outsourcing logo — structure unchanged.
 * Slight brightness lift so the mark’s navy reads clearer on dark UI.
 */
export function BrandLogo({
  className = "",
  priority = false,
  height = 48,
  tone = "onDark",
}: Props) {
  return (
    <Image
      src="/logo-ssc.png"
      alt="SSC Outsourcing"
      width={506}
      height={230}
      priority={priority}
      quality={100}
      sizes={`${Math.round(height * (506 / 230) * 2)}px`}
      className={`h-auto w-auto object-contain ${className}`}
      style={{
        height,
        width: "auto",
        filter:
          tone === "onLight"
            ? "brightness(1.02) saturate(1.08) contrast(1.04)"
            : "brightness(1.24) saturate(1.14) contrast(1.05)",
      }}
    />
  );
}
