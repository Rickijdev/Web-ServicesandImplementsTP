import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
export default function PhoneDemo({ reduced }: { reduced: boolean }) {
  const [state, setState] = useState<"ready" | "working" | "open">("ready");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function open() {
    clearTimeout(timer.current);
    setState("working");
    timer.current = setTimeout(() => setState("open"), reduced ? 50 : 1050);
  }
  return (
    <div className={`phone-shell phone-${state}`}>
      <div className="phone-camera" />
      <div className="phone-top">
        <span>9:41</span>
        <Icon name="wifi" />
      </div>
      <span className="phone-brand">nexo</span>
      <div className="phone-location">
        <span>MI ESPACIO</span>
        <strong>Puerta principal</strong>
      </div>
      <div className="phone-control">
        <button
          className={`open-button ${state}`}
          type="button"
          onClick={open}
          disabled={state === "working"}
          aria-label={
            state === "open"
              ? "Repetir demostración de apertura"
              : "Probar apertura de puerta"
          }
        >
          <Icon name={state === "open" ? "unlock" : "lock"} />
        </button>
        <span className="phone-action">
          {state === "working"
            ? "Conectando…"
            : state === "open"
              ? "Acceso liberado"
              : "Toca para abrir"}
        </span>
      </div>
      <p className="phone-status" role="status">
        {state === "working"
          ? "Enviando la orden al motor"
          : state === "open"
            ? "La persona ya puede pasar"
            : "Tu espacio. Tu decisión."}
      </p>
      <span className="phone-demo-label">DEMOSTRACIÓN INTERACTIVA</span>
    </div>
  );
}
