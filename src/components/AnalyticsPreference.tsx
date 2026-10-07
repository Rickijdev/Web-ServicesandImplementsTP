import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  analyticsAvailable,
  analyticsChoice,
  setAnalyticsChoice,
} from "../analytics";

export default function AnalyticsPreference() {
  const available = analyticsAvailable();
  const [visible, setVisible] = useState(
    () => available && analyticsChoice() === "unset",
  );
  const trigger = useRef<HTMLButtonElement>(null);
  const openedManually = useRef(false);
  function choose(choice: "accepted" | "rejected") {
    setAnalyticsChoice(choice);
    setVisible(false);
    if (openedManually.current) trigger.current?.focus({ preventScroll: true });
    openedManually.current = false;
  }
  if (!available) return null;
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="analytics-preferences"
        aria-expanded={visible}
        aria-controls={visible ? "analytics-notice" : undefined}
        onClick={() => {
          openedManually.current = true;
          setVisible(true);
        }}
      >
        Preferencias de estadísticas
      </button>
      {visible &&
        createPortal(
          <aside
            id="analytics-notice"
            className="analytics-notice"
            aria-labelledby="analytics-notice-title"
          >
            <div>
              <strong id="analytics-notice-title">
                Tú eliges cómo navegar.
              </strong>
              <p>
                Con tu permiso, usamos cookies de Google Analytics para conocer
                las visitas y mejorar Nexo. Puedes cambiar tu elección desde el
                pie de página.
              </p>
              <a
                href="https://policies.google.com/technologies/partner-sites?hl=es"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo trata Google estos datos ↗
              </a>
            </div>
            <div className="analytics-actions">
              <button type="button" onClick={() => choose("rejected")}>
                Continuar sin estadísticas
              </button>
              <button type="button" onClick={() => choose("accepted")}>
                Aceptar estadísticas
              </button>
            </div>
          </aside>,
          document.body,
        )}
    </>
  );
}
