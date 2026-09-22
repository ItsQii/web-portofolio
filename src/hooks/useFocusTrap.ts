import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Confines Tab cycling to `containerRef` while `active`, and restores focus to
 * whatever was focused beforehand on teardown.
 *
 * Required for the pause menu: it is a modal surface, and the previous dropdown
 * had no trap, no Escape handling and no focus restoration.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!active || !container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Defer so the element exists after the enter animation's first frame.
    const focusFirst = requestAnimationFrame(() => {
      const focusable = getFocusable(container);
      (focusable[0] ?? container).focus({ preventScroll: true });
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return;

      const focusable = getFocusable(container!);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && (activeEl === first || !container!.contains(activeEl))) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFirst);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [active, containerRef]);
}
