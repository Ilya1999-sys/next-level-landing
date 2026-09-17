"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function GridDebug() {
  const params = useSearchParams();
  const enabled = params.get("grid") === "1";

  useEffect(() => {
    document.documentElement.classList.toggle("debug-grid", enabled);
    return () => {
      document.documentElement.classList.remove("debug-grid");
    };
  }, [enabled]);

  return null;
}
