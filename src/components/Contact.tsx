import { useEffect, useState } from "react";
import { CONTACT, generalContact, whatsapp } from "../content";
import Icon from "./Icon";
export type Choice = { space: string; mechanism: string };
export default function Contact({
  choice,
  onChoice,
}: {
  choice: Choice;
  onChoice: (value: Choice) => void;
}) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    setUrl("");
    setMessage("");
  }, [choice.space, choice.mechanism]);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const city = String(data.get("city") || "").trim();
    if (!name || !city) {
      setMessage("Completa tu nombre y tu ciudad o distrito.");
      return;
    }
    const text = [
      `Hola Ricky, soy ${name}. Vi la web de Nexo.`,
      `Quiero abrir mi puerta desde el celular.`,
      `Mi espacio: ${choice.space}.`,
      `Ubicación: ${city}.`,
      `Mecanismo: ${choice.mechanism}.`,
      String(data.get("details") || "").trim(),
      `¿Podemos revisar la compatibilidad y la cotización? Puedo enviarte fotos del mecanismo.`,
    ]
      .filter(Boolean)
      .join("\n\n");
    setUrl(whatsapp(text));
    setMessage(
      "Tu consulta está lista. Ábrela en WhatsApp, revísala y envíala cuando quieras.",
    );
  }
  function edit() {
    if (url) {
      setUrl("");
      setMessage("Cambiaste tus datos. Vuelve a preparar la consulta.");
    }
  }
  return (
    <section
      className="contact section-pad"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="section-top micro">
        <span>06 / TU PRÓXIMO PASO</span>
        <span>CONVERSEMOS, DE PERSONA A PERSONA.</span>
      </div>
      <div className="contact-grid">
        <div className="contact-copy" data-reveal>
          <span className="contact-spark">
            <Icon name="spark" />
          </span>
          <h2 id="contact-title">
            ¿Abrimos
            <br />
            <em>posibilidades?</em>
          </h2>
          <p>
            Cuéntame dónde quieres instalarlo.
            <br />
            Una foto de tu mecanismo es un buen comienzo.
          </p>
          <a
            href={generalContact}
            target="_blank"
            rel="noopener noreferrer"
            className="direct-contact"
          >
            <span className="micro">WHATSAPP DIRECTO</span>
            <strong>
              {CONTACT.display}
              <Icon name="diagonal" />
            </strong>
          </a>
        </div>
        <form className="quote-form" onSubmit={submit} onChange={edit}>
          <h3>Todo empieza con tu puerta.</h3>
          <div className="form-row">
            <label>
              Tu nombre
              <input
                name="name"
                autoComplete="name"
                placeholder="¿Cómo te llamas?"
                maxLength={100}
                required
              />
            </label>
            <label>
              Ciudad o distrito
              <input
                name="city"
                autoComplete="address-level2"
                placeholder="¿Dónde está tu espacio?"
                maxLength={120}
                required
              />
            </label>
          </div>
          <label>
            ¿En qué espacio lo necesitas?
            <select
              value={choice.space}
              onChange={(e) => onChoice({ ...choice, space: e.target.value })}
              name="space"
            >
              <option>Hogar</option>
              <option>Consultorio</option>
              <option>Oficina o estudio jurídico</option>
              <option>Negocio u otro espacio</option>
              <option>Alojamiento</option>
              <option>Otro proyecto de automatización</option>
            </select>
          </label>
          <label>
            ¿Cómo se abre hoy?
            <select
              value={choice.mechanism}
              onChange={(e) =>
                onChoice({ ...choice, mechanism: e.target.value })
              }
              name="mechanism"
            >
              <option>No estoy seguro; enviaré una foto</option>
              <option>Interruptor / pulsador · desde S/150</option>
              <option>Perilla / mecanismo · desde S/210</option>
              <option>Otro mecanismo o proyecto</option>
            </select>
          </label>
          <label>
            Cuéntame un poco más <span className="optional">(opcional)</span>
            <textarea
              name="details"
              rows={3}
              maxLength={800}
              placeholder="Qué puerta quieres controlar, qué necesitas…"
            />
          </label>
          <button className="button button-dark" type="submit">
            Preparar mi consulta{" "}
            <span>
              <Icon name="diagonal" />
            </span>
          </button>
          <p className="form-privacy">
            Tus datos no se guardan en esta página. Prepararemos el mensaje para
            que tú lo revises y envíes en WhatsApp.
          </p>
          <p className="form-status" role="status">
            {message}
          </p>
          {url && (
            <a
              className="button whatsapp-ready"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir mi consulta en WhatsApp <Icon name="diagonal" />
            </a>
          )}
        </form>
      </div>
    </section>
  );
}
