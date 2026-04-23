"use client";

import React from "react";

const NOTIFICATION_TEXT =
  "Website refresh in progress. Stay tuned for a smoother, more elevated experience coming soon.";

export default function NotificationBar() {
  return (
    <div
      className="w-full bg-[#FBF2CB] text-black"
      role="status"
      aria-live="polite"
    >
      <div className="site-container">
        <div className="h-10 md:h-12 flex items-center font-sans">
          <p className="w-full text-center text-xs md:text-sm font-medium px-2">
            {NOTIFICATION_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
}

