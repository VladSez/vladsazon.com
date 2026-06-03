"use client";

import { useEffect } from "react";

/**
 * Disables the browser's scroll restoration to prevent automatic scroll position restoration (especially on iOS chrome browser)
 */
export function DisableScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
