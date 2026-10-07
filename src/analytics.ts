// Google Analytics de Nexo. No se carga en vistas locales ni antes de aceptar.
export const MEASUREMENT_ID = "G-X1DMTV5P6N";
const STORAGE_KEY = "nexo-analytics-consent-v1";
const DISABLE_KEY = `ga-disable-${MEASUREMENT_ID}`;
export type AnalyticsChoice = "accepted" | "rejected" | "unset";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}
let initialized = false;
let configured = false;
let pageViewSent = false;
let memoryChoice: AnalyticsChoice = "unset";

export function analyticsAvailable() {
  return (
    location.protocol === "https:" &&
    location.hostname === "rickijdev.github.io" &&
    (location.pathname === "/Web-ServicesandImplementsTP" ||
      location.pathname.startsWith("/Web-ServicesandImplementsTP/"))
  );
}
export function analyticsChoice(): AnalyticsChoice {
  if (memoryChoice !== "unset") return memoryChoice;
  try {
    const choice = localStorage.getItem(STORAGE_KEY);
    return choice === "accepted" || choice === "rejected" ? choice : "unset";
  } catch {
    return memoryChoice;
  }
}
function safeReferrer() {
  try {
    return document.referrer ? new URL(document.referrer).origin + "/" : "";
  } catch {
    return "";
  }
}
function start() {
  if (!analyticsAvailable() || analyticsChoice() !== "accepted") return;
  window[DISABLE_KEY] = false;
  window.dataLayer ??= [];
  window.gtag ??= function () {
    window.dataLayer!.push(arguments);
  };
  const gtag = window.gtag;
  if (!configured) {
    configured = true;
    gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_prefix: "nexo",
      cookie_domain: location.hostname,
      cookie_expires: 60 * 60 * 24 * 180,
      cookie_flags: "SameSite=Lax;Secure",
      page_location: location.origin + location.pathname,
      page_referrer: safeReferrer(),
    });
    const script = document.createElement("script");
    script.id = "nexo-google-analytics";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  } else {
    gtag("consent", "update", { analytics_storage: "granted" });
  }
  if (!pageViewSent) {
    pageViewSent = true;
    gtag("event", "page_view", {
      send_to: MEASUREMENT_ID,
      page_title: document.title,
      page_location: location.origin + location.pathname,
      page_referrer: safeReferrer(),
    });
  }
}
function stop() {
  window[DISABLE_KEY] = true;
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  for (const entry of document.cookie.split(";")) {
    const name = entry.split("=")[0].trim();
    if (!/^nexo_+ga(?:_|$)/.test(name)) continue;
    for (const domain of [
      "",
      `; domain=${location.hostname}`,
      `; domain=.${location.hostname}`,
    ]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`;
    }
  }
}
export function setAnalyticsChoice(choice: "accepted" | "rejected") {
  memoryChoice = choice;
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* Elección de esta sesión. */
  }
  if (choice === "accepted") start();
  else stop();
}
export function initializeAnalytics() {
  if (initialized || !analyticsAvailable()) return;
  initialized = true;
  window[DISABLE_KEY] = true;
  if (analyticsChoice() === "accepted") start();
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      memoryChoice =
        event.newValue === "accepted" || event.newValue === "rejected"
          ? event.newValue
          : "unset";
      if (analyticsChoice() === "accepted") start();
      else stop();
    }
  });
}
