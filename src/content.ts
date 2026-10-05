export const CONTACT = {
  name: "Ricky",
  phone: "51938681643",
  display: "+51 938 681 643",
};
export const whatsapp = (text: string) =>
  `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(text)}`;
export const generalContact = whatsapp(
  "Hola Ricky. Vi Nexo y quiero evaluar cómo abrir mi puerta desde el celular.",
);

export const spaces = [
  {
    id: "hogar",
    name: "En tu hogar.",
    label: "CASAS & DEPARTAMENTOS",
    short: "Hogar",
    copy: "Llega una visita. Estás cocinando, trabajando o descansando. Autoriza el acceso desde tu celular y sigue con lo tuyo.",
    color: "rose",
    image: "home",
    alt: "Hogar de tonos cálidos con una puerta de madera y luz natural",
    note: "Tu casa, a tu ritmo.",
  },
  {
    id: "consultorio",
    name: "En tu consultorio.",
    label: "ODONTOLOGÍA & CONSULTAS",
    short: "Consultorio",
    copy: "Recibe a quien llega al consultorio sin desplazarte hasta el pulsador. Una pequeña ayuda para organizar mejor tu jornada.",
    color: "rose",
    image: "clinic",
    alt: "Recepción de un consultorio odontológico de madera y tonos rosa",
    note: "Menos interrupciones.",
  },
  {
    id: "oficina",
    name: "En tu oficina.",
    label: "ABOGADOS & PROFESIONALES",
    short: "Oficina o estudio jurídico",
    copy: "Tu cliente te avisa que llegó. Desde tu escritorio, autorizas el acceso al estudio jurídico, la oficina o tu espacio de trabajo.",
    color: "rose",
    image: "office",
    alt: "Estudio jurídico con biblioteca de madera y sillones color vino",
    note: "Recibe desde tu escritorio.",
  },
  {
    id: "negocio",
    name: "En tu espacio.",
    label: "NEGOCIOS & MUCHO MÁS",
    short: "Negocio u otro espacio",
    copy: "Un estudio, una tienda, un alojamiento o esa puerta que abres todos los días. Si quieres controlarla desde el celular, conversemos.",
    color: "rose",
    image: "studio",
    alt: "Acceso a un estudio profesional con una puerta color vino",
    note: "Tu necesidad es el comienzo.",
  },
] as const;

export const components = [
  {
    id: "chip",
    name: "ESP32",
    title: "Una señal. Todo conectado.",
    text: "La placa recibe la orden por internet, a través de la red Wi-Fi de tu espacio, y le indica al motor cuándo actuar.",
    tag: "01 / LA CONEXIÓN",
    details: "Wi-Fi de 2.4 GHz + internet + alimentación",
  },
  {
    id: "servo",
    name: "Servomotor",
    title: "El movimiento justo.",
    text: "Un pequeño motor gira hasta la posición acordada para accionar el mecanismo. Su recorrido se ajusta durante la instalación.",
    tag: "02 / EL MOVIMIENTO",
    details: "Fuerza y recorrido según tu mecanismo",
  },
  {
    id: "arm",
    name: "Brazo",
    title: "El gesto que abre.",
    text: "La pieza unida al motor presiona el pulsador o mueve una perilla compatible. Su forma se adapta al punto de contacto.",
    tag: "03 / EL CONTACTO",
    details: "Presión, giro o tirón, previa evaluación",
  },
  {
    id: "case",
    name: "Carcasa 3D",
    title: "Todo encuentra su lugar.",
    text: "Una estructura diseñada a medida mantiene las piezas en su sitio e integra el mecanismo en el espacio disponible.",
    tag: "04 / EL DISEÑO",
    details: "Incluida en la propuesta de perilla desde S/210",
  },
] as const;

export const plans = [
  {
    id: "switch",
    number: "01",
    name: "Un toque.",
    mechanism: "INTERRUPTOR / PULSADOR",
    price: 150,
    text: "Para un acceso que se libera al presionar un botón existente.",
    included: [
      "ESP32 y servomotor",
      "Brazo para accionar el pulsador",
      "Montaje y configuración",
      "Prueba de funcionamiento",
    ],
  },
  {
    id: "knob",
    number: "02",
    name: "Un giro.",
    mechanism: "PERILLA / MECANISMO COMPATIBLE",
    price: 210,
    text: "Para un mecanismo que necesita un giro o un tirón preciso.",
    included: [
      "ESP32 y servomotor",
      "Brazo adaptado al mecanismo",
      "Carcasa diseñada en 3D",
      "Montaje, configuración y pruebas",
    ],
  },
] as const;

export const faqs = [
  [
    "¿Es solo para propietarios o personas que alquilan?",
    "No. Nexo es para cualquier persona que quiera accionar su puerta desde el celular: en su hogar, consultorio odontológico, estudio jurídico, oficina, negocio o alojamiento. Lo que evaluamos es el mecanismo y el espacio de instalación. Si el lugar es alquilado, coordina la autorización para el montaje.",
  ],
  [
    "¿Puedo abrir si estoy en otro lugar?",
    "Sí, con el control remoto configurado, internet en tu celular e internet en el lugar de instalación. El ESP32 necesita Wi-Fi de 2.4 GHz y alimentación eléctrica. No necesitas estar junto a la puerta.",
  ],
  [
    "¿Funciona con cualquier puerta?",
    "Primero hay que revisarla. Evaluamos la fuerza, el recorrido, el espacio de montaje y la alternativa manual. Envía una foto o un video del pulsador, la perilla y el lado interior de la puerta para una revisión inicial.",
  ],
  [
    "¿La puerta se mueve sola?",
    "El sistema acciona el pulsador o el mecanismo compatible para liberar el acceso. La persona empuja o jala la puerta para pasar. No es un motor que mueve toda la hoja ni un sistema de cierre automático.",
  ],
  [
    "¿Qué pasa si se va la luz o el internet?",
    "La apertura remota deja de estar disponible. Antes de instalar revisamos cómo mantener una alternativa de acceso manual. El sistema descrito no incluye respaldo eléctrico; si lo necesitas, se evalúa aparte.",
  ],
  [
    "¿Mi visita o mi cliente necesita instalar una app?",
    "En la solución descrita, tú das la orden desde tu celular. La persona que llega solo te avisa y tú autorizas la entrada. No se incluyen códigos de acceso, huella digital ni gestión automática de reservas.",
  ],
  [
    "¿Cuánto cuesta y cómo empezamos?",
    "Las instalaciones de referencia parten de S/150 para pulsador y S/210 para perilla con carcasa 3D. La cotización final depende de la compatibilidad, el montaje, el desplazamiento y los adicionales que acuerdes con Ricky. Envíanos tu ubicación y fotos del mecanismo.",
  ],
] as const;
