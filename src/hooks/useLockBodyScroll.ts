import { useEffect } from "react";

/**
 * Prevents background scrolling while an overlay is open.
 *
 * Scrollbars are now visible (globals.css themes them rather than hiding
 * them), so removing overflow would collapse the gutter and shift the layout.
 * The gutter width is measured and reapplied as padding to keep it stable.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const { body } = document;
    const previousPaddingRight = body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    body.dataset.scrollLocked = "true";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;

    return () => {
      delete body.dataset.scrollLocked;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
