import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import PaperNotePage from "./PaperNotePage";
import "./paper-notes.css";

interface Props {
  id: string;
  title?: string;
  triggerLabel?: string;
  itemLabel?: string;
  pages: { id: string; label: string; html: string }[];
}

type Phase = "closed" | "opening" | "open" | "closing";
type FocusTarget = "close" | "previous" | "next";

export default function PaperNoteCustomDialog({
  id,
  title = "A little note",
  triggerLabel,
  itemLabel = "Note",
  pages,
}: Props) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [pageIndex, setPageIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const activePageRef = useRef<HTMLElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const focusTargetRef = useRef<FocusTarget | null>(null);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);
  const pageCount = pages.length;
  const isOpen = phase !== "closed";

  const open = useCallback(
    (requestedPage = 0) => {
      if (pageCount === 0 || dialogRef.current?.open) return;
      setPageIndex(
        Number.isInteger(requestedPage) &&
          requestedPage >= 0 &&
          requestedPage < pageCount
          ? requestedPage
          : 0,
      );
      lastFocusedRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      focusTargetRef.current = "close";
      setPhase("opening");
    },
    [pageCount],
  );

  function close() {
    setPhase((current) => (current === "closed" ? current : "closing"));
  }

  function changePage(direction: -1 | 1) {
    if (pageCount < 2 || phase === "closing") return;
    focusTargetRef.current = direction === -1 ? "previous" : "next";
    setPageIndex((current) => (current + direction + pageCount) % pageCount);
  }

  // A small bridge keeps the existing Astro trigger buttons outside this island.
  useEffect(() => {
    function handleTrigger(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const trigger = event.target.closest<HTMLButtonElement>(
        "button[data-dialog-trigger], button[data-custom-note-open]",
      );
      if (!trigger || trigger.disabled) return;
      if (
        trigger.dataset.dialogTrigger !== id &&
        trigger.dataset.customNoteOpen !== id
      )
        return;
      open(Number(trigger.dataset.dialogPage ?? 0));
    }
    document.addEventListener("click", handleTrigger);
    return () => document.removeEventListener("click", handleTrigger);
  }, [id, open]);

  // The browser owns the modal top layer and focus trap; React owns its lifecycle.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const wasLocked = document.body.classList.contains(
      "custom-note-scroll-locked",
    );
    dialog.showModal();
    document.body.classList.add("custom-note-scroll-locked");

    function release() {
      if (dialog?.open) dialog.close();
      if (!wasLocked)
        document.body.classList.remove("custom-note-scroll-locked");
    }
    // Release the old body before ClientRouter swaps it out.
    document.addEventListener("astro:before-swap", release);
    return () => {
      document.removeEventListener("astro:before-swap", release);
      release();
      swipeRef.current = null;
      if (lastFocusedRef.current?.isConnected) lastFocusedRef.current.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (phase === "opening") {
      let secondFrame = 0;
      const firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setPhase("open"));
      });
      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
      };
    }
    if (phase === "closing") {
      // Match the existing CSS exit, including its staggered background pages.
      const duration = matchMedia("(prefers-reduced-motion: reduce)").matches
        ? 200
        : 760;
      const timer = window.setTimeout(() => setPhase("closed"), duration);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    const target = focusTargetRef.current;
    if (!isOpen || !target) return;
    activePageRef.current
      ?.querySelector<HTMLButtonElement>(
        `.custom-note-${target === "close" ? "close" : `nav-${target}`}`,
      )
      ?.focus();
    focusTargetRef.current = null;
  }, [isOpen, pageIndex]);

  const handleTouchEnd = useEffectEvent((event: TouchEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (deltaX <= -50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      event.preventDefault();
      changePage(1);
    }
  });

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const events = new AbortController();
    const { signal } = events;
    stack.addEventListener(
      "touchstart",
      (event) => {
        const touch = event.touches[0];
        swipeRef.current =
          dialogRef.current?.open && event.touches.length === 1 && touch
            ? { x: touch.clientX, y: touch.clientY }
            : null;
      },
      { passive: true, signal },
    );
    // React's delegated touch listeners are passive. A native non-passive end
    // listener lets a completed swipe suppress accidental link/button clicks.
    stack.addEventListener("touchend", handleTouchEnd, {
      passive: false,
      signal,
    });
    stack.addEventListener(
      "touchcancel",
      () => {
        swipeRef.current = null;
      },
      { passive: true, signal },
    );
    return () => events.abort();
  }, []);

  return (
    <>
      {triggerLabel ? (
        <button
          className="custom-note-trigger"
          type="button"
          aria-haspopup="dialog"
          aria-controls={id}
          disabled={pageCount === 0}
          onClick={() => open()}
        >
          {triggerLabel}
        </button>
      ) : null}
      <dialog
        ref={dialogRef}
        className="custom-note-dialog"
        id={id}
        aria-label={pages[pageIndex]?.label ?? title}
        data-state={phase === "closed" ? undefined : phase}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClose={() => setPhase("closed")}
        onClick={(event) => {
          if (
            event.target === event.currentTarget ||
            (event.target instanceof Element &&
              event.target.classList.contains("custom-note-backdrop"))
          )
            close();
        }}
      >
        <div className="custom-note-backdrop" />
        <div ref={stackRef} className="custom-note-stack" role="document">
          {pages.map((page, index) => (
            <PaperNotePage
              key={page.id}
              id={`${id}-${page.id}`}
              ref={index === pageIndex ? activePageRef : undefined}
              label={page.label}
              index={index}
              pageIndex={pageIndex}
              pageCount={pageCount}
              itemLabel={itemLabel}
              html={page.html}
              onClose={close}
              onChangePage={changePage}
            />
          ))}
        </div>
      </dialog>
    </>
  );
}
