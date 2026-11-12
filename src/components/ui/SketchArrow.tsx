import { roughArrow } from "drawably";

const rotations = {
  right: 0,
  "down-right": 45,
  down: 90,
  "down-left": 135,
  left: 180,
  "up-left": 225,
  up: 270,
  "up-right": 315,
} as const;

interface Props {
  direction?: keyof typeof rotations;
  size?: number | string;
  className?: string;
  seed?: number;
}

/** Decorative inline arrow; keep accessible labels on the link or button. */
export default function SketchArrow({
  direction = "right",
  size = "1em",
  className,
  seed = 42,
}: Props) {
  // A fixed seed keeps server rendering and client hydration identical.
  const path = roughArrow(4, 12, 20, 12, {
    seed,
    roughness: 0.85,
    boil: 0.2,
  });

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
        transform: `rotate(${rotations[direction]}deg)`,
      }}
    >
      <path d={path} />
    </svg>
  );
}
