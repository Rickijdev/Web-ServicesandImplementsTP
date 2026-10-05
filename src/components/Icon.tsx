import type { CSSProperties } from "react";
type Name =
  | "arrow"
  | "diagonal"
  | "down"
  | "lock"
  | "unlock"
  | "wifi"
  | "check"
  | "plus"
  | "close"
  | "phone"
  | "spark"
  | "play";
const paths: Record<Name, React.ReactNode> = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  down: <path d="M12 4v16m-6-6 6 6 6-6" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2" />
    </>
  ),
  unlock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 7.5-2m-3.5 11v2" />
    </>
  ),
  wifi: (
    <>
      <path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0m-9 4a5 5 0 0 1 6 0" />
      <circle cx="12" cy="20" r=".5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 4v16M4 12h16" />,
  close: <path d="m5 5 14 14M5 19 19 5" />,
  phone: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <path d="M10 5h4m-3 14h2" />
    </>
  ),
  spark: <path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" />,
  play: <path d="m8 4 12 8-12 8Z" />,
};
export default function Icon({
  name,
  className = "",
  style,
}: {
  name: Name;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      className={`icon ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
