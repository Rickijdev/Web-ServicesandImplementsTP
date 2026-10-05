import { useRef, useState } from "react";
import { components } from "../content";
import Icon from "./Icon";
import ModelViewer from "./ModelViewer";
import PhoneDemo from "./PhoneDemo";

const steps = [
  {
    title: "Tú das el toque.",
    text: "Alguien llega. Desde el control en tu celular, decides cuándo abrir. En casa o fuera de ella.",
    label: "TU CELULAR",
  },
  {
    title: "Nexo hace el movimiento.",
    text: "La orden llega por internet al ESP32. El servomotor acciona el pulsador o la perilla compatible.",
    label: "TU MECANISMO",
  },
  {
    title: "La puerta da paso.",
    text: "El acceso queda liberado. La persona empuja o jala la puerta para entrar. Tú sigues con tu día.",
    label: "TU ESPACIO",
  },
];

export function Process({
  step,
  onStep,
  reduced,
}: {
  step: number;
  onStep: (step: number) => void;
  reduced: boolean;
}) {
  const section = useRef<HTMLElement>(null);
  function choose(index: number) {
    onStep(index);
    if (
      !reduced &&
      window.matchMedia("(min-width: 901px) and (min-height: 800px)").matches &&
      section.current
    ) {
      const top = section.current.getBoundingClientRect().top + window.scrollY;
      const distance = section.current.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + distance * ((index + 0.35) / 3),
        behavior: "smooth",
      });
    }
  }
  return (
    <section
      className="process-scroll"
      id="como-funciona"
      ref={section}
      aria-labelledby="process-title"
    >
      <div className="process-sticky">
        <div className="section-top micro">
          <span>02 / ASÍ FUNCIONA</span>
          <span>UN GESTO TUYO. TODO UN PROCESO.</span>
        </div>
        <div className="process-grid">
          <div className="process-copy">
            <h2 id="process-title">
              Un toque tuyo.
              <br />
              <em>Y listo.</em>
            </h2>
            <div
              className="step-selector"
              aria-label="Pasos del funcionamiento"
            >
              {steps.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => choose(i)}
                  aria-pressed={step === i}
                  aria-label={`Paso ${i + 1}: ${steps[i].title}`}
                  className={step === i ? "active" : ""}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
            <div className="step-copy">
              <span className="micro">
                0{step + 1} / {steps[step].label}
              </span>
              <h3>{steps[step].title}</h3>
              <p>{steps[step].text}</p>
            </div>
            <p className="process-scroll-hint micro">
              <Icon name="down" /> SIGUE BAJANDO O ELIGE UN PASO
            </p>
          </div>
          <div
            className={`process-visual process-step-${step}`}
            aria-label={`Ilustración: ${steps[step].title}`}
          >
            <img
              className="process-photo"
              src="./assets/space-studio.webp"
              alt="Puerta en un espacio de trabajo"
              width="1024"
              height="1536"
              loading="lazy"
            />
            <div className="process-phone" data-parallax="35">
              <PhoneDemo reduced={reduced} />
            </div>
            <span className="process-caption micro">
              TU ESPACIO. TU DECISIÓN.
            </span>
          </div>
        </div>
        <p className="process-note">
          Necesita internet, Wi-Fi de 2.4 GHz y alimentación. Se acciona el
          mecanismo; la hoja de la puerta se abre manualmente.
        </p>
      </div>
    </section>
  );
}

export function Technology({ reduced }: { reduced: boolean }) {
  const [part, setPart] = useState(0);
  const selected = components[part];
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function keyboard(event: React.KeyboardEvent, index: number) {
    let next: number | undefined;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % 4;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + 3) % 4;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 3;
    if (next !== undefined) {
      event.preventDefault();
      setPart(next);
      buttons.current[next]?.focus();
    }
  }
  return (
    <section
      className="technology section-pad"
      id="tecnologia"
      aria-labelledby="tech-title"
    >
      <div className="section-top micro">
        <span>03 / POR DENTRO</span>
        <span>PROGRAMACIÓN + ELECTRÓNICA + DISEÑO 3D</span>
      </div>
      <div className="technology-heading" data-reveal>
        <h2 id="tech-title">
          Ingenio dentro.
          <br />
          <em>Simple por fuera.</em>
        </h2>
        <p>
          Cada pieza tiene su papel.
          <br />
          Elige una para conocerla.
        </p>
      </div>
      <div className="technology-body">
        <ModelViewer part={selected.id} reduced={reduced} />
        <div className="technology-info">
          <div
            className="part-tabs"
            role="tablist"
            aria-label="Componentes de Nexo"
          >
            {components.map((item, i) => (
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={part === i}
                tabIndex={part === i ? 0 : -1}
                aria-controls="component-panel"
                onClick={() => setPart(i)}
                onKeyDown={(e) => keyboard(e, i)}
              >
                <span>0{i + 1}</span>
                {item.name}
                <Icon name="diagonal" />
              </button>
            ))}
          </div>
          <div
            className="component-panel"
            role="tabpanel"
            id="component-panel"
            aria-labelledby={`tab-${selected.id}`}
            tabIndex={0}
          >
            <span className="micro">{selected.tag}</span>
            <h3>{selected.title}</h3>
            <p>{selected.text}</p>
            <span className="component-detail">
              <Icon name="plus" />
              {selected.details}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
