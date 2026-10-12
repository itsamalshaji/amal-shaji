"use client";

import { useEffect, useState } from "react";

// The very first page is revealed by the preloader, so only later navigations get the entrance.
let firstPage = true;

/** Remounts on every navigation, giving each new page the same short rise-and-fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [enter] = useState(() => !firstPage);
  useEffect(() => {
    firstPage = false;
  }, []);
  return <div className={enter ? "page-enter" : undefined}>{children}</div>;
}
