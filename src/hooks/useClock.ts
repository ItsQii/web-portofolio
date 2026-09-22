import { useEffect, useState } from "react";

type Clock = {
  day: string;
  date: string;
  time: string;
};

function read(): Clock {
  const now = new Date();
  return {
    day: now.toLocaleDateString("en-US", { weekday: "long" }),
    date: now.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  };
}

/**
 * Live wall clock for the pause-menu panel — Persona always surfaces the date.
 *
 * Initialised lazily rather than in an effect, so there is no cascading render
 * on mount. Safe here because the component only ever mounts client-side inside
 * the overlay portal, so there is no server render to mismatch against.
 */
export function useClock(): Clock {
  const [clock, setClock] = useState<Clock>(read);

  useEffect(() => {
    // 30s is plenty for an HH:MM readout and avoids a pointless 1s wakeup.
    const id = setInterval(() => setClock(read()), 30_000);
    return () => clearInterval(id);
  }, []);

  return clock;
}
