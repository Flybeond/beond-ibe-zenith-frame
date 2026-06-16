"use client";

import { useEffect } from "react";

const DIV_ID = "zf_div_ynelvTwMN3YiEnbKA4ZbaWolYAGMCwqW6UuRaRfvV9I";
const FORM_PERMA = "ynelvTwMN3YiEnbKA4ZbaWolYAGMCwqW6UuRaRfvV9I";

export default function ZohoCharterForm() {
  useEffect(() => {
    const container = document.getElementById(DIV_ID);
    if (!container || container.querySelector("iframe")) return;

    const f = document.createElement("iframe");
    let ifrmSrc = `https://forms.zohopublic.com/kushalsharmaflyb1/form/CharterInquiryForm/formperma/${FORM_PERMA}?zf_rszfm=1`;

    try {
      if (!/([\?&]referrername=)/.test(ifrmSrc)) {
        let rfr = window.location.href;
        try {
          rfr =
            window.self !== window.top
              ? window.top!.location.href
              : /^https?:\/\/[\w.-]+\.[a-zA-Z]{2,}/i.test(rfr)
              ? rfr
              : "";
        } catch (_) {}
        if (rfr) {
          const qi = rfr.indexOf("?");
          if (qi > -1) rfr = rfr.substring(0, qi);
          if (rfr.length > 1800) rfr = rfr.substring(0, 1800);
          ifrmSrc +=
            (ifrmSrc.indexOf("?") > 0 ? "&" : "?") +
            "referrername=" +
            encodeURIComponent(rfr);
        }
      }
    } catch (_) {}

    f.src = ifrmSrc;
    f.style.border = "none";
    f.style.outline = "none";
    f.style.boxShadow = "none";
    f.style.background = "transparent";
    f.style.height = "1674px";
    f.style.width = "100%";
    f.style.transition = "all 0.5s ease";
    f.setAttribute("aria-label", "Submit Charter Request");
    f.setAttribute("allowtransparency", "true");
    container.style.border = "none";
    container.style.background = "transparent";
    container.appendChild(f);

    const onMessage = (event: MessageEvent) => {
      const evntData = event.data;
      if (typeof evntData !== "string") return;
      const parts = evntData.split("|");
      if (parts.length !== 2 && parts.length !== 3) return;
      const [zf_perma, rawHeight] = parts;
      const newHeight = parseInt(rawHeight, 10) + 15 + "px";
      const iframe = container.querySelector("iframe");
      if (
        !iframe ||
        !iframe.src.includes("formperma") ||
        !iframe.src.includes(zf_perma)
      )
        return;
      const scroll = parts.length === 3;
      if (scroll) iframe.scrollIntoView();
      if (iframe.style.height !== newHeight) {
        if (scroll) {
          setTimeout(() => (iframe.style.height = newHeight), 500);
        } else {
          iframe.style.height = newHeight;
        }
      }
    };

    window.addEventListener("message", onMessage, false);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return <div id={DIV_ID} />;
}
