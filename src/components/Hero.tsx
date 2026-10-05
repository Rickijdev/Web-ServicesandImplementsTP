import Icon from "./Icon";

const images = [
  {
    name: "home",
    className: "collage-a",
    parallax: "-72",
    alt: "Entrada de un hogar con tonos cálidos y puerta de madera",
  },
  {
    name: "clinic",
    className: "collage-b",
    parallax: "90",
    alt: "Consultorio odontológico con recepción cálida",
  },
  {
    name: "studio",
    className: "collage-c",
    parallax: "-110",
    alt: "Puerta de un estudio",
  },
  {
    name: "office",
    className: "collage-d",
    parallax: "-95",
    alt: "Estudio profesional con una biblioteca de madera",
  },
  { name: "home", className: "collage-e", parallax: "100", alt: "" },
  { name: "studio", className: "collage-f", parallax: "-45", alt: "" },
];
export default function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-collage">
        <div className="hero-orbit" aria-hidden="true" />
        {images.map((item, i) => (
          <div
            key={item.className}
            className={`collage-photo ${item.className}`}
            data-parallax={item.parallax}
          >
            <img
              src={`./assets/space-${item.name}.webp`}
              alt={item.alt}
              fetchPriority={i === 0 ? "high" : "auto"}
              decoding="async"
              width={item.name === "home" ? 1400 : 1024}
              height={item.name === "home" ? 933 : 1536}
            />
          </div>
        ))}
        <div className="hero-copy">
          <p className="hero-eyebrow">PEQUEÑA TECNOLOGÍA. MÁS LIBERTAD.</p>
          <h1 id="hero-title">
            <span>Tu puerta.</span>
            <span>Tu espacio.</span>
            <span>Tu libertad.</span>
          </h1>
          <p className="hero-subtitle">ABRE DESDE TU CELULAR</p>
          <a className="hero-cta" href="#contacto">
            Descubre lo que podemos hacer{" "}
            <span>
              <Icon name="diagonal" />
            </span>
          </a>
        </div>
        <span className="hero-side-note micro">HECHO A TU MEDIDA / NEXO</span>
      </div>
      <div className="hero-bottom">
        <span>HOGARES · CONSULTORIOS · OFICINAS · TU ESPACIO</span>
        <a href="#espacios">
          EXPLORA NEXO <Icon name="down" />
        </a>
        <span>TRUJILLO, PERÚ</span>
      </div>
    </section>
  );
}
