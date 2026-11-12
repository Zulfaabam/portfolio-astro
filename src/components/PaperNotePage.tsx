import { useMemo, type Ref } from "react";
import { roughRoundedRect, scribbleFill } from "drawably";
import { DrawablyButton } from "drawably/react";
import SketchArrow from "./ui/SketchArrow";

interface Props {
  id: string;
  label: string;
  index: number;
  pageIndex: number;
  pageCount: number;
  itemLabel: string;
  /** Trusted HTML rendered and escaped by PaperNoteCustomDialog.astro. */
  html: string;
  ref?: Ref<HTMLElement>;
  onClose: () => void;
  onChangePage: (direction: -1 | 1) => void;
}

function pageSeed(id: string) {
  // Stable across server rendering, hydration, and page changes.
  let seed = 0;
  for (const character of id) seed = (seed * 31 + character.charCodeAt(0)) | 0;
  return seed >>> 0;
}

export default function PaperNotePage({
  id,
  label,
  index,
  pageIndex,
  pageCount,
  itemLabel,
  html,
  ref,
  onClose,
  onChangePage,
}: Props) {
  const depth = (index - pageIndex + pageCount) % pageCount;
  const seed = pageSeed(id);
  const paths = useMemo(() => {
    const options = { seed, roughness: 0.85, boil: 0.2 };
    return {
      outline: roughRoundedRect(5, 20, 430, 520, 18, options),
      texture: scribbleFill(17, 32, 406, 496, options),
    };
  }, [seed]);

  return (
    <article
      ref={ref}
      className="custom-note-page"
      data-custom-note-page=""
      data-page-label={label}
      data-page-index={index}
      data-depth={depth}
      aria-hidden={depth !== 0}
      tabIndex={depth === 0 ? 0 : -1}
      inert={depth !== 0}
    >
      <svg
        className="custom-note-shape"
        viewBox="0 0 440 560"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={paths.outline}
          fill="#f6efdc"
          stroke="#2724d1"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d={paths.texture}
          fill="none"
          stroke="#2724d1"
          strokeWidth="0.7"
          strokeOpacity="0.06"
        />
      </svg>
      <div className="custom-note-content">
        <button
          className="custom-note-close"
          type="button"
          aria-label="Close note"
          data-custom-note-close=""
          onClick={onClose}
        >
          ×
        </button>
        <div
          className="custom-note-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="custom-note-footer">
          <p
            className="custom-note-status"
            role={depth === 0 ? "status" : undefined}
          >
            {itemLabel} {pageIndex + 1} of {pageCount}
          </p>
          <div>
            {([-1, 1] as const).map((direction) => {
              const name = direction === -1 ? "previous" : "next";
              const accessibleLabel = `${direction === -1 ? "Previous" : "Next"} ${itemLabel.toLowerCase()}`;
              return (
                <DrawablyButton
                  key={direction}
                  className={`custom-note-nav custom-note-nav-${name}`}
                  aria-label={accessibleLabel}
                  title={accessibleLabel}
                  hidden={pageCount < 2}
                  disabled={pageCount < 2}
                  seed={seed + direction}
                  variant="solid"
                  roughness={0.85}
                  boil={0.2}
                  onClick={() => onChangePage(direction)}
                >
                  <SketchArrow
                    className="custom-note-nav-icon"
                    direction={direction === -1 ? "left" : "right"}
                    size="1.5rem"
                    seed={seed}
                  />
                </DrawablyButton>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
