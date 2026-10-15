// Single source of truth for the Keishmer Studio design system.
// The /brand/ page renders from this file so the documentation cannot drift
// from the values the site actually ships (see specs/009). Values mirror
// src/styles/global.css (:root + @theme) and the Tailwind v4 defaults in use.

export interface ColorToken {
  /** Token / CSS-variable name shown on the swatch. */
  name: string;
  /** Hex value the token resolves to. */
  hex: string;
  /** i18n key suffix for an optional usage note (brand.color.notes.<noteKey>). */
  noteKey?: string;
}

export interface ColorGroup {
  /** Group id, used for i18n keys (brand.color.groups.<id>.*). */
  id: string;
  colors: ColorToken[];
}

/** Page background the site paints everywhere (Layout body). */
export const PAGE_BACKGROUND = "#121314";

export const colorGroups: ColorGroup[] = [
  {
    id: "brand",
    colors: [
      { name: "primary", hex: "#FF6B6B", noteKey: "primary" },
      { name: "primary-inverse", hex: "#EA1313", noteKey: "primaryInverse" },
      { name: "accent-blue", hex: "#67A6D8", noteKey: "accentBlue" },
      { name: "accent-pink", hex: "#E99B9B", noteKey: "accentPink" },
    ],
  },
  {
    id: "surface",
    colors: [
      { name: "black", hex: "#121314", noteKey: "black" },
      { name: "black-1", hex: "#0A0A0A" },
      { name: "bg-2", hex: "#161617" },
      { name: "secondary", hex: "#171717", noteKey: "secondary" },
    ],
  },
  {
    id: "text",
    colors: [
      { name: "text-white", hex: "#D0E2E4", noteKey: "textWhite" },
      { name: "white", hex: "#C6D2D4", noteKey: "white" },
      { name: "white-2", hex: "#F8F5F0" },
      { name: "off-white", hex: "#F2F4FF", noteKey: "offWhite" },
      { name: "text-black", hex: "#121314", noteKey: "textBlack" },
    ],
  },
  {
    id: "neutral",
    colors: [
      { name: "gray-50", hex: "#E3E3E3" },
      { name: "gray-100", hex: "#C2BFBF" },
      { name: "gray-200", hex: "#949494" },
      { name: "gray-300", hex: "#6E6E6E" },
      { name: "gray-400", hex: "#4A4A4A" },
      { name: "gray-500", hex: "#3A3A3A" },
      { name: "gray-600", hex: "#2A2A2A" },
      { name: "gray-800", hex: "#222222" },
    ],
  },
  {
    id: "state",
    colors: [
      { name: "success", hex: "#4ADE80", noteKey: "success" },
      { name: "danger", hex: "#F87171", noteKey: "danger" },
      { name: "info", hex: "#67A6D8", noteKey: "info" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

export interface TypeFamily {
  id: string;
  /** Stack as defined in global.css. */
  stack: string;
}

export const typeFamilies: TypeFamily[] = [
  { id: "unbounded", stack: "Unbounded, sans-serif" },
  { id: "albert", stack: "Albert, sans-serif" },
  { id: "albertItalic", stack: "Albert-Italic, sans-serif" },
  { id: "mono", stack: "VT323 Mono, monospace" },
];

export interface TypeScaleStep {
  /** Tailwind class, e.g. "text-xl". */
  cls: string;
  /** Computed size in rem. */
  rem: number;
  px: number;
}

export const typeScale: TypeScaleStep[] = [
  { cls: "text-xs", rem: 0.75, px: 12 },
  { cls: "text-sm", rem: 0.875, px: 14 },
  { cls: "text-base", rem: 1, px: 16 },
  { cls: "text-lg", rem: 1.125, px: 18 },
  { cls: "text-xl", rem: 1.25, px: 20 },
  { cls: "text-2xl", rem: 1.5, px: 24 },
  { cls: "text-3xl", rem: 1.875, px: 30 },
  { cls: "text-4xl", rem: 2.25, px: 36 },
  { cls: "text-5xl", rem: 3, px: 48 },
  { cls: "text-6xl", rem: 3.75, px: 60 },
];

export interface TypeWeight {
  id: string;
  value: number;
}

export const typeWeights: TypeWeight[] = [
  { id: "light", value: 300 },
  { id: "regular", value: 400 },
  { id: "medium", value: 500 },
  { id: "semibold", value: 600 },
  { id: "bold", value: 700 },
  { id: "black", value: 900 },
];

/* ------------------------------------------------------------------ */
/* Spacing                                                             */
/* ------------------------------------------------------------------ */

export interface SpacingStep {
  /** Tailwind numeric token. */
  token: string;
  px: number;
}

export const spacingScale: SpacingStep[] = [
  { token: "0", px: 0 },
  { token: "1", px: 4 },
  { token: "2", px: 8 },
  { token: "4", px: 16 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
  { token: "12", px: 48 },
  { token: "16", px: 64 },
  { token: "20", px: 80 },
  { token: "24", px: 96 },
];

/* ------------------------------------------------------------------ */
/* Radius & stroke                                                     */
/* ------------------------------------------------------------------ */

export interface RadiusStep {
  cls: string;
  value: string;
}

export const radiusScale: RadiusStep[] = [
  { cls: "rounded", value: "0.25rem" },
  { cls: "rounded-lg", value: "0.5rem" },
  { cls: "rounded-full", value: "9999px" },
];

export interface StrokeStep {
  id: string;
  px: number;
}

export const strokeScale: StrokeStep[] = [
  { id: "hairline", px: 1 },
  { id: "thin", px: 2 },
];

/* ------------------------------------------------------------------ */
/* Motion                                                              */
/* ------------------------------------------------------------------ */

export interface MotionDuration {
  cls: string;
  ms: number;
}

export const motionDurations: MotionDuration[] = [
  { cls: "duration-300", ms: 300 },
  { cls: "duration-500", ms: 500 },
  { cls: "duration-700", ms: 700 },
];

export interface MotionEasing {
  id: string;
  css: string;
}

export const motionEasings: MotionEasing[] = [
  { id: "power2Out", css: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" },
  { id: "power3Out", css: "cubic-bezier(0.215, 0.61, 0.355, 1)" },
  { id: "power3InOut", css: "cubic-bezier(0.645, 0.045, 0.355, 1)" },
  { id: "power4Out", css: "cubic-bezier(0.19, 1, 0.22, 1)" },
];

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export interface Breakpoint {
  cls: string;
  minWidth: number;
}

export const breakpoints: Breakpoint[] = [
  { cls: "sm", minWidth: 640 },
  { cls: "md", minWidth: 768 },
  { cls: "lg", minWidth: 1024 },
  { cls: "xl", minWidth: 1280 },
  { cls: "2xl", minWidth: 1536 },
];

/* ------------------------------------------------------------------ */
/* Contrast (WCAG 2.x)                                                 */
/* ------------------------------------------------------------------ */

function channelLuminance(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a #RRGGBB color. */
export function relativeLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

/** Contrast ratio between two hex colors (1–21). */
export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG rating for a ratio: "aaa" | "aa" | "aa-large" | "fail". */
export function contrastRating(ratio: number): "aaa" | "aa" | "aa-large" | "fail" {
  if (ratio >= 7) return "aaa";
  if (ratio >= 4.5) return "aa";
  if (ratio >= 3) return "aa-large";
  return "fail";
}
