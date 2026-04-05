"use client";

import { useCallback, useEffect } from "react";
import {
  buildZenithBookingSearchResultUrl,
  type ZenithSearchSubmitDetail,
} from "@/lib/zenithNavHost";
import ZenithSearchFrame from "./ZenithSearchFrame";

export default function HomeHeroZenithSearch() {
  useEffect(() => {
    console.log(
      "[HomeHeroZenithSearch] Mounted on main page. For iframe logs, DevTools → top ▾ → pick the zenith-search-embed frame.",
    );
  }, []);

  const onSearchSubmit = useCallback((detail: ZenithSearchSubmitDetail) => {
    const redirectUrl = buildZenithBookingSearchResultUrl(detail.params);
    console.log("[Zenith search]", {
      action: detail.action,
      method: detail.method,
      params: detail.params,
      redirectUrl,
    });
    window.location.assign(redirectUrl);
  }, []);

  return <ZenithSearchFrame variant="home" onSearchSubmit={onSearchSubmit} />;
}
