import { useEffect, useRef, useState } from "react";
import { roughLine, roughRoundedRect } from "drawably";
import "../../styles/project-image-zoom.css";

const closeButtonOutline = roughRoundedRect(3, 3, 38, 38, 8, {
  seed: 42,
  roughness: 0.85,
  boil: 0.2,
});
const closeIcon = [
  roughLine(6, 6, 18, 18, { seed: 42, roughness: 0.85, boil: 0.2 }),
  roughLine(18, 6, 6, 18, { seed: 43, roughness: 0.85, boil: 0.2 }),
].join(" ");

export interface ZoomedProjectImage {
  src: string;
  alt: string;
  trigger: HTMLButtonElement;
  animate: boolean;
}

interface Props {
  image: ZoomedProjectImage;
  onDismiss: () => void;
}

export default function ProjectImageZoom({ image, onDismiss }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [closing, setClosing] = useState(false);
  const [instant, setInstant] = useState(!image.animate);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // A second native modal sits above the project dialog and owns focus.
    dialog.showModal();
    closeButtonRef.current?.focus({ preventScroll: true });

    function release() {
      dialog?.close();
    }

    document.addEventListener("astro:before-swap", release);
    return () => {
      document.removeEventListener("astro:before-swap", release);
      release();
      if (image.trigger.isConnected) {
        image.trigger.focus({ preventScroll: true });
      }
    };
  }, [image]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!closing || !dialog) return;

    // Keep the native modal open until its CSS exit finishes. The same token
    // supplies normal, reduced-motion, and instant keyboard timing.
    const duration = Number.parseFloat(
      getComputedStyle(dialog).getPropertyValue("--image-zoom-duration"),
    );
    const timeout = window.setTimeout(
      onDismiss,
      Number.isFinite(duration) ? duration : 0,
    );
    return () => window.clearTimeout(timeout);
  }, [closing, instant, onDismiss]);

  function close(immediately = false) {
    if (immediately) setInstant(true);
    setClosing(true);
  }

  return (
    <dialog
      ref={dialogRef}
      className="project-image-zoom"
      aria-label={`Enlarged image: ${image.alt}`}
      data-closing={closing || undefined}
      data-instant={instant || undefined}
      onCancel={(event) => {
        event.preventDefault();
        close(true);
      }}
      onClose={onDismiss}
      onClick={(event) => {
        if (event.target === event.currentTarget) close(event.detail === 0);
      }}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="project-image-zoom-close"
        aria-label="Close enlarged image"
        onClick={(event) => close(event.detail === 0)}
      >
        <svg
          className="project-image-zoom-close-frame"
          viewBox="0 0 44 44"
          fill="var(--color-bg-paper)"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d={closeButtonOutline} />
        </svg>
        <svg
          className="project-image-zoom-close-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d={closeIcon} />
        </svg>
      </button>
      <button
        type="button"
        className="project-image-zoom-content"
        tabIndex={-1}
        aria-label="Close enlarged image"
        onClick={(event) => close(event.detail === 0)}
      >
        <img src={image.src} alt={image.alt} decoding="async" />
      </button>
    </dialog>
  );
}
