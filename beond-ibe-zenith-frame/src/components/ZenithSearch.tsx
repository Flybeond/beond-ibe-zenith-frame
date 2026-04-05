/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo } from "react";

type ZenithSearchConfig = {
  baseUrl: string;
  idCompany: number;
  idPos: number;
  locale: string;
  external: boolean;
};

const DEFAULT_CONFIG: ZenithSearchConfig = {
  baseUrl: "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/beond",
  idCompany: 4112,
  idPos: 1,
  locale: "en-GB",
  external: true,
};

function ensureLinkTag(href: string) {
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`) as
      | HTMLScriptElement
      | null;
    if (existing) {
      if ((existing as any).__loaded) return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => {
      (script as any).__loaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

function runModule(code: string) {
  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "module";
    script.innerHTML = code;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to run module script"));
    document.body.appendChild(script);
    // module scripts don't reliably fire onload in all cases; resolve on next tick
    queueMicrotask(() => resolve());
  });
}

export default function ZenithSearch(props: { config?: Partial<ZenithSearchConfig> }) {
  const config = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...(props.config ?? {}) }),
    [props.config]
  );

  useEffect(() => {
    const w = window as any;
    const mountedKey = "__zenith_searchcriteria_mounted__";
    const loadingKey = "__zenith_searchcriteria_loading__";

    ensureLinkTag("https://fonts.googleapis.com/icon?family=Material+Icons");
    ensureLinkTag(
      "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&display=swap"
    );
    ensureLinkTag(
      "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/Content/beond/SearchCriteria"
    );

    if (w[mountedKey]) return;

    if (!w[loadingKey]) {
      w[loadingKey] = (async () => {
        await loadScript(
          "https://fo-emea.ttinteractive.com/Zenith/FrontOffice/bundles/beond/SearchCriteriaTools"
        );

        await runModule(`
          import app from 'https://fo-emea.ttinteractive.com/Zenith/FrontOffice/bundles/beond/SearchCriteria';
          app.mount('#SearchCriterias');
          window.${mountedKey} = true;
        `);
      })().catch((err: unknown) => {
        // allow retry if load fails
        w[loadingKey] = undefined;
        // surface error in console for debugging
        console.error("ZenithSearch init failed", err);
      });
    }
  }, []);

  return (
    <section className="px-4 py-10 flex justify-center">
      <style>{`
        body, input { font-family: 'Montserrat', sans-serif; }
        input:focus-visible { outline: none; }
      `}</style>

      <div className="">
        <div className="">


          <div id="SearchCriterias" data-config={JSON.stringify(config)} />
        </div>
      </div>
    </section>
  );
}

