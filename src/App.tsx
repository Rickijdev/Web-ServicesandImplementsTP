import { useCallback, useEffect, useRef, useState } from "react";
import { spaces, plans, faqs, generalContact } from "./content";
import { useMotionPreference, useScrollExperience } from "./hooks/useMotion";
import Hero from "./components/Hero";
import Icon from "./components/Icon";
import { Process, Technology } from "./components/Experience";
import Contact, { type Choice } from "./components/Contact";

function Comparison() {
  const [own, setOwn] = useState("150");
  const [other, setOther] = useState("400");
  const valid =
    other.trim() !== "" && Number(other) >= 0 && Number(other) <= 10000;
  const difference = Number(other) - Number(own);
  const money = (n: number) =>
    new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      maximumFractionDigits: 2,
    }).format(n);
  return (
    <details className="comparison">
      <summary>
        ¿Quieres comparar la inversión?
        <Icon name="plus" />
      </summary>
      <div className="comparison-body">
        <label>
          Montaje Nexo
          <select value={own} onChange={(e) => setOwn(e.target.value)}>
            <option value="150">Pulsador · desde S/150</option>
            <option value="210">Perilla · desde S/210</option>
          </select>
        </label>
        <label>
          Precio del otro equipo (S/)
          <input
            type="number"
            min="0"
            max="10000"
            step="0.01"
            value={other}
            onChange={(e) => setOther(e.target.value)}
            aria-invalid={!valid}
            aria-describedby="comparison-note"
          />
        </label>
        <div className="comparison-result" aria-live="polite">
          <span className="micro">
            {valid && difference < 0
              ? "EL EQUIPO DE REFERENCIA CUESTA MENOS"
              : "DIFERENCIA DE INVERSIÓN"}
          </span>
          <strong>{valid ? money(Math.abs(difference)) : "—"}</strong>
          <p>
            {valid
              ? difference === 0
                ? "La misma inversión de referencia."
                : difference > 0
                  ? "Menos con el precio base de Nexo."
                  : "Menos con el equipo que indicaste."
              : "Ingresa un importe de S/0 a S/10,000."}
          </p>
        </div>
        <p id="comparison-note">
          Comparación orientativa de precios base. El valor inicial de S/400 es
          un ejemplo editable. Compara funciones, instalación y cotizaciones
          completas: las prestaciones no son necesariamente equivalentes.
        </p>
      </div>
    </details>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState(0);
  const onStep = useCallback((index: number) => setStep(index), []);
  const motion = useMotionPreference();
  useScrollExperience(motion.reduced, onStep);
  const [choice, setChoice] = useState<Choice>({
    space: "Hogar",
    mechanism: "No estoy seguro; enviaré una foto",
  });
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu) {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 900) setMenu(false);
    };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [menu]);
  function selectPlan(id: string) {
    setChoice((v) => ({
      ...v,
      mechanism:
        id === "switch"
          ? "Interruptor / pulsador · desde S/150"
          : "Perilla / mecanismo · desde S/210",
    }));
  }
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Nexo, inicio">
          nexo
          <small>AUTOMATIZACIÓN</small>
        </a>
        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#espacios">Para tu espacio</a>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#inversion">La inversión</a>
          <a href="#sobre-mi">Quién lo hace</a>
        </nav>
        <a className="header-contact" href="#contacto">
          Hablemos{" "}
          <span>
            <Icon name="diagonal" />
          </span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menu}
          aria-controls="mobile-nav"
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenu((v) => !v)}
        >
          {menu ? (
            <Icon name="close" />
          ) : (
            <span className="menu-lines">
              <i />
              <i />
              <i />
            </span>
          )}
        </button>
        {menu && (
          <nav
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Navegación móvil"
            onClick={() => setMenu(false)}
          >
            <a href="#espacios">
              Para tu espacio <span>01</span>
            </a>
            <a href="#como-funciona">
              Cómo funciona <span>02</span>
            </a>
            <a href="#tecnologia">
              Por dentro <span>03</span>
            </a>
            <a href="#inversion">
              La inversión <span>04</span>
            </a>
            <a href="#sobre-mi">
              Quién lo hace <span>05</span>
            </a>
            <a href="#contacto">
              Hablemos <Icon name="diagonal" />
            </a>
          </nav>
        )}
      </header>
      <main id="contenido">
        <Hero />
        <div
          className="marquee"
          aria-label="Tu casa, tu consultorio, tu oficina, tu espacio"
        >
          <div className="marquee-track" aria-hidden="true">
            TU CASA <Icon name="spark" /> TU CONSULTORIO <Icon name="spark" />{" "}
            TU OFICINA <Icon name="spark" /> TU ESPACIO <Icon name="spark" /> TU
            CASA <Icon name="spark" />
          </div>
        </div>
        <section
          className="spaces section-pad"
          id="espacios"
          aria-labelledby="spaces-title"
        >
          <div className="section-top micro">
            <span>01 / HECHO PARA TI</span>
            <span>CADA ESPACIO TIENE UNA PUERTA.</span>
          </div>
          <div className="spaces-heading" data-reveal>
            <h2 id="spaces-title">
              La comodidad
              <br />
              no tiene <em>un solo lugar.</em>
            </h2>
            <p>
              No importa a qué te dediques.
              <br />
              Si quieres abrir tu puerta desde el celular,
              <br className="desktop-break" /> hay una posibilidad por explorar.
            </p>
          </div>
          <div className="spaces-grid">
            {spaces.map((space, i) => (
              <article
                className={`space-card space-${space.color}`}
                key={space.id}
              >
                <a
                  className="space-image"
                  href="#contacto"
                  aria-label={`Consultar para ${space.short.toLowerCase()}`}
                  onClick={() =>
                    setChoice((v) => ({ ...v, space: space.short }))
                  }
                >
                  <span className="space-number micro">NEXO / 0{i + 1}</span>
                  <div
                    className="space-art-layer"
                    data-parallax={i % 2 === 0 ? "30" : "-35"}
                  >
                    <img
                      src={`./assets/space-${space.image}.webp`}
                      alt={space.alt}
                      loading="lazy"
                      width={space.id === "hogar" ? 1400 : 1024}
                      height={space.id === "hogar" ? 933 : 1536}
                    />
                  </div>
                  <span className="space-note">{space.note}</span>
                  <span className="space-arrow">
                    <Icon name="diagonal" />
                  </span>
                </a>
                <div className="space-info">
                  <span className="micro">{space.label}</span>
                  <h3>{space.name}</h3>
                  <p>{space.copy}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="spaces-foot">
            Una necesidad cotidiana. Una solución adaptada a tu mecanismo.
            <a className="underlink" href="#contacto">
              Veamos tu puerta <Icon name="diagonal" />
            </a>
          </p>
        </section>
        <Process step={step} onStep={onStep} reduced={motion.reduced} />
        <Technology reduced={motion.reduced} />
        <section
          className="investment section-pad"
          id="inversion"
          aria-labelledby="investment-title"
        >
          <div className="section-top micro">
            <span>04 / LA INVERSIÓN</span>
            <span>PRIMERO TU PUERTA. DESPUÉS LA PROPUESTA.</span>
          </div>
          <div className="investment-heading" data-reveal>
            <h2 id="investment-title">
              Pequeño cambio.
              <br />
              <em>Gran comodidad.</em>
            </h2>
            <p>
              Dos puntos de partida.
              <br />
              Evaluamos tu mecanismo y confirmamos
              <br />
              el montaje y el precio contigo.
            </p>
          </div>
          <div className="plans">
            {plans.map((plan) => (
              <article className={`plan plan-${plan.id}`} key={plan.id}>
                <div className="plan-top micro">
                  <span>{plan.mechanism}</span>
                  <span>/{plan.number}</span>
                </div>
                <div className="plan-name">
                  <h3>{plan.name}</h3>
                  <div
                    className={`mechanism-object ${plan.id}`}
                    aria-hidden="true"
                  >
                    <span />
                    <i />
                  </div>
                </div>
                <p className="plan-copy">{plan.text}</p>
                <p className="plan-price">
                  <span>desde</span>
                  <strong>S/{plan.price}</strong>
                  <span>por instalación</span>
                </p>
                <ul>
                  {plan.included.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="plan-link"
                  onClick={() => selectPlan(plan.id)}
                >
                  Me interesa esta opción <Icon name="diagonal" />
                </a>
              </article>
            ))}
          </div>
          <p className="price-note">
            Precios referenciales. Compatibilidad, alcance, desplazamiento y
            adicionales se acuerdan antes de instalar. No incluye huella
            digital, códigos de acceso ni cierre automático.
          </p>
          <Comparison />
        </section>
        <section
          className="founder section-pad"
          id="sobre-mi"
          aria-labelledby="founder-title"
        >
          <div className="section-top micro">
            <span>05 / QUIÉN LO HACE</span>
            <span>UNA IDEA LOCAL. UN TRATO CERCANO.</span>
          </div>
          <div className="founder-grid">
            <div className="founder-portrait" data-parallax="25">
              <svg
                className="founder-photo"
                viewBox="95 360 410 555"
                preserveAspectRatio="xMidYMid slice"
                role="img"
                aria-labelledby="ricky-title"
              >
                <title id="ricky-title">
                  Ricky, creador de Nexo Automatización
                </title>
                <image href="./assets/ricky.webp" width="738" height="1600" />
              </svg>
              <span className="founder-sticker">
                Hecho con
                <br />
                <em>ingenio.</em>
                <Icon name="spark" />
              </span>
              <span className="portrait-credit micro">
                RICKY / CREADOR DE NEXO
              </span>
            </div>
            <div className="founder-copy" data-reveal>
              <span className="eyebrow">HABLAS CON QUIEN LO HACE.</span>
              <h2 id="founder-title">
                Hola, soy
                <br />
                <em>Ricky.</em>
              </h2>
              <p>
                Estudio Ingeniería Informática en la Universidad Nacional de
                Trujillo. Con Nexo, uno programación, electrónica y diseño 3D
                para resolver necesidades del día a día.
              </p>
              <p>
                Me cuentas tu idea, reviso tu mecanismo y te explico una
                propuesta que tenga sentido para tu espacio. De persona a
                persona, desde el primer mensaje.
              </p>
              <a
                className="underlink"
                href={generalContact}
                target="_blank"
                rel="noopener noreferrer"
              >
                Conversemos sobre tu puerta <Icon name="diagonal" />
              </a>
              <p className="founder-note">
                Formación universitaria en curso. Nexo es un emprendimiento
                independiente, sin afiliación comercial con la UNT.
              </p>
            </div>
          </div>
        </section>
        <section className="other-projects">
          <span className="micro">
            ¿Y SI ESO TAMBIÉN SE PUDIERA AUTOMATIZAR?
          </span>
          <a
            href="#contacto"
            onClick={() =>
              setChoice({
                space: "Otro proyecto de automatización",
                mechanism: "Otro mecanismo o proyecto",
              })
            }
          >
            Tu idea también
            <br />
            tiene <em>la puerta abierta.</em>
            <span>
              <Icon name="diagonal" />
            </span>
          </a>
          <p>
            Botones, mecanismos y otras tareas repetitivas. Evaluamos
            viabilidad, alcance y presupuesto contigo.
          </p>
        </section>
        <section
          className="faq section-pad"
          id="preguntas"
          aria-labelledby="faq-title"
        >
          <div className="faq-grid">
            <div data-reveal>
              <span className="micro">ANTES DEL PRIMER TOQUE</span>
              <h2 id="faq-title">
                Puertas abiertas.
                <br />
                <em>Dudas resueltas.</em>
              </h2>
              <a
                className="underlink"
                href={generalContact}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tengo otra pregunta <Icon name="diagonal" />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <details key={q}>
                  <summary>
                    <span className="faq-number">0{i + 1}</span>
                    <span>{q}</span>
                    <Icon name="plus" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <Contact choice={choice} onChoice={setChoice} />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <span>
            Pequeña tecnología.
            <br />
            <em>Más libertad.</em>
          </span>
          <a href="#inicio">
            Volver arriba <Icon name="diagonal" />
          </a>
        </div>
        <div className="footer-word-wrap" aria-hidden="true">
          <span className="footer-word">nexo</span>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Nexo Automatización</span>
          <div>
            <button type="button" onClick={() => dialog.current?.showModal()}>
              Créditos y privacidad
            </button>
            <a href="./admin.html">Acceso administrador</a>
            <button
              type="button"
              aria-pressed={motion.reduced}
              onClick={() => motion.setPaused(!motion.paused)}
              disabled={motion.systemReduced}
            >
              {motion.systemReduced
                ? "Movimiento reducido (sistema)"
                : motion.paused
                  ? "Activar movimiento"
                  : "Pausar movimiento"}
            </button>
          </div>
          <span>HECHO EN PERÚ ↗</span>
        </div>
      </footer>
      <dialog
        className="credits-dialog"
        ref={dialog}
        onClick={(e) => {
          if (e.target === dialog.current) {
            const r = dialog.current!.getBoundingClientRect();
            if (
              e.clientX < r.left ||
              e.clientX > r.right ||
              e.clientY < r.top ||
              e.clientY > r.bottom
            )
              dialog.current?.close();
          }
        }}
      >
        <div className="credits-head">
          <span className="micro">HECHO CON CUIDADO</span>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar créditos"
          >
            <Icon name="close" />
          </button>
        </div>
        <h2>
          Créditos y<br />
          <em>privacidad.</em>
        </h2>
        <p>
          Los interiores de la portada y la galería son imágenes generadas con
          IA para ambientar los usos de Nexo. No muestran clientes ni
          instalaciones reales. La fotografía de Ricky fue proporcionada para el
          proyecto.
        </p>
        <p>
          Los modelos 3D y la demostración explican el principio del sistema.
          Esta web no controla una puerta real. El diseño y el montaje final se
          evalúan para cada caso.
        </p>
        <p>
          El formulario no almacena tus datos ni utiliza analítica publicitaria.
          Genera un enlace para que revises tu consulta y decidas enviarla en
          WhatsApp, sujeto a sus condiciones de privacidad.
        </p>
        <p>
          Tipografías DM Sans y Cormorant Garamond, con licencias incluidas.
          Dirección visual inspirada en Stock Dutch Design. Contenido, imágenes
          y modelos creados para Nexo.
        </p>
      </dialog>
    </>
  );
}
