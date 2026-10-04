(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const whatsappNumber = '51938681643';
  const money = value => `S/${new Intl.NumberFormat('es-PE', { maximumFractionDigits: 2 }).format(value)}`;
  let toastTimer;

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 4200);
  }

  const menuToggle = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  function closeMenu() {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    mobileNav.hidden = isOpen;
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileNav.hidden) {
      closeMenu();
      menuToggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !event.target.closest('.site-header')) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });

  // Scroll effects and section navigation are managed in motion.js.

  // A visual simulation only. No network request is made to a door or device.
  const hero = $('#hero-visual');
  const heroButton = $('#hero-open');
  let heroReset;
  heroButton.addEventListener('click', () => {
    if (heroButton.disabled) return;
    clearTimeout(heroReset);
    heroButton.disabled = true;
    hero.classList.remove('is-unlocked');
    hero.classList.add('is-working');
    $('#hero-lock-icon').setAttribute('href', '#i-lock');
    $('#hero-state').textContent = 'Enviando la orden…';
    $('#hero-description').textContent = 'Simulación: celular → ESP32';
    setTimeout(() => {
      $('#hero-state').textContent = 'Accionando el mecanismo…';
      $('#hero-description').textContent = 'Simulación: servomotor en movimiento';
    }, reducedMotion ? 60 : 850);
    setTimeout(() => {
      hero.classList.remove('is-working');
      hero.classList.add('is-unlocked');
      $('#hero-lock-icon').setAttribute('href', '#i-unlock');
      $('#hero-state').textContent = 'Acceso liberado';
      $('#hero-description').textContent = 'Tu huésped puede abrir la puerta.';
      heroButton.disabled = false;
      heroButton.setAttribute('aria-label', 'Repetir la simulación de apertura');
      heroReset = setTimeout(() => {
        hero.classList.remove('is-unlocked');
        $('#hero-lock-icon').setAttribute('href', '#i-lock');
        $('#hero-state').textContent = 'Toca para repetir';
        $('#hero-description').textContent = 'Un clic. Una bienvenida.';
      }, 6000);
    }, reducedMotion ? 120 : 1700);
  });

  const stage = $('#mechanism-stage');
  const simulationButton = $('#simulate-button');
  const modeButtons = $$('[data-mechanism]');
  let simulationBusy = false;
  let simulationReset;
  function mechanismStatus(message) {
    const status = $('#mechanism-status');
    status.replaceChildren();
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    status.append(dot, document.createTextNode(message));
  }
  modeButtons.forEach(button => button.addEventListener('click', () => {
    if (simulationBusy) return;
    clearTimeout(simulationReset);
    stage.classList.remove('is-running', 'is-actuating', 'is-open');
    stage.dataset.mode = button.dataset.mechanism;
    modeButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    $('#svg-mechanism-label').textContent = stage.dataset.mode === 'knob' ? '03. PERILLA' : '03. INTERRUPTOR';
    $('#svg-door-label').textContent = 'ACCESO';
    mechanismStatus('Listo para simular una apertura');
    $('#simulate-button span').textContent = 'Probar apertura';
  }));
  simulationButton.addEventListener('click', () => {
    if (simulationBusy) return;
    clearTimeout(simulationReset);
    simulationBusy = true;
    simulationButton.disabled = true;
    modeButtons.forEach(button => { button.disabled = true; });
    stage.classList.remove('is-actuating', 'is-open');
    stage.classList.add('is-running');
    mechanismStatus('1. La orden llega al ESP32 por internet');
    $('#simulate-button span').textContent = 'Simulando…';
    setTimeout(() => {
      stage.classList.add('is-actuating');
      mechanismStatus(stage.dataset.mode === 'knob' ? '2. El servomotor mueve el brazo y la perilla' : '2. El servomotor gira y el brazo presiona el interruptor');
    }, reducedMotion ? 80 : 1100);
    setTimeout(() => {
      stage.classList.add('is-open');
      stage.classList.remove('is-running');
      $('#svg-door-label').textContent = 'LIBERADO';
      mechanismStatus('3. Acceso liberado: el huésped ya puede abrir la puerta');
    }, reducedMotion ? 160 : 2400);
    setTimeout(() => {
      stage.classList.remove('is-actuating');
      simulationBusy = false;
      simulationButton.disabled = false;
      modeButtons.forEach(button => { button.disabled = false; });
      $('#simulate-button span').textContent = 'Repetir demostración';
      simulationReset = setTimeout(() => {
        stage.classList.remove('is-open');
        $('#svg-door-label').textContent = 'ACCESO';
        mechanismStatus('Listo para simular otra apertura');
      }, 6500);
    }, reducedMotion ? 250 : 3600);
  });

  const partContent = {
    esp32: {
      name: 'ESP32', role: 'ESP32 · EL CEREBRO', number: '01',
      title: ['Recibe tu clic.', 'Da la orden.'],
      description: 'Es la pequeña placa que conecta tu puerta con el Wi-Fi. Cuando tocas el botón en tu celular, recibe la orden y le indica al motor que se mueva.',
      analogy: 'Es como un coordinador: recibe tu pedido y le dice al motor qué hacer.',
      caption: 'La orden llega por Wi-Fi.', steps: ['Recibe', 'Interpreta', 'Da la orden']
    },
    servo: {
      name: 'servomotor', role: 'SERVOMOTOR · EL MOVIMIENTO', number: '02',
      title: ['La orden se convierte', 'en un giro.'],
      description: 'Es un pequeño motor que gira hasta una posición determinada. Al recibir la señal del ESP32, mueve su eje lo necesario para accionar el mecanismo de tu puerta.',
      analogy: 'Piensa en una muñeca que gira justo lo necesario para mover una palanca.',
      caption: 'Gira, acciona y vuelve.', steps: ['Recibe la señal', 'Gira', 'Regresa']
    },
    arm: {
      name: 'brazo', role: 'BRAZO · EL CONTACTO', number: '03',
      title: ['El pequeño gesto', 'que abre el acceso.'],
      description: 'Es la pieza unida al motor que hace el trabajo físico: presiona tu interruptor o mueve una perilla compatible. Su forma y recorrido se adaptan a tu instalación.',
      analogy: 'Es como el dedo que presiona un botón. El motor lo mueve por ti.',
      caption: 'Se acerca y presiona el botón.', steps: ['Se mueve', 'Hace contacto', 'Acciona']
    },
    case: {
      name: 'carcasa 3D', role: 'CARCASA 3D · EL DISEÑO', number: '04',
      title: ['Todo en su lugar.', 'Con un buen acabado.'],
      description: 'Es la caja diseñada en 3D que sostiene y organiza el mecanismo. Ayuda a integrar las piezas de forma discreta, con una forma adaptada al espacio disponible en tu puerta.',
      analogy: 'Como un traje a medida para el sistema: reúne las piezas y las mantiene en su sitio.',
      caption: 'Separa las piezas y mira el interior.', steps: ['Aloja', 'Sostiene', 'Integra']
    }
  };
  const partTabs = $$('[role="tab"][data-part]');
  const componentVisual = $('#component-visual');
  const componentPlay = $('#component-play');
  let componentTimer;
  let componentRemaining = 4800;
  let componentStarted = 0;
  let componentRunning = false;
  let componentPaused = false;
  let componentHasPlayed = false;

  function componentControl(label, action) {
    $('#component-play-label').textContent = label;
    $('.component-play-icon', componentPlay).textContent = action === 'pause' ? 'Ⅱ' : action === 'resume' ? '▷' : '↻';
    const name = partContent[componentVisual.dataset.active].name;
    componentPlay.setAttribute('aria-label', `${action === 'pause' ? 'Pausar' : action === 'resume' ? 'Continuar' : 'Reproducir'} animación de ${name}`);
  }
  function finishComponentAnimation() {
    clearTimeout(componentTimer);
    componentRunning = false;
    componentPaused = false;
    componentVisual.classList.remove('is-playing', 'is-paused');
    componentControl('Ver de nuevo', 'play');
  }
  function playComponentAnimation() {
    clearTimeout(componentTimer);
    componentHasPlayed = true;
    if (reducedMotion) {
      toast('Vista sin movimiento: la ilustración muestra cómo actúa esta pieza.');
      return;
    }
    componentVisual.classList.remove('is-playing', 'is-paused');
    void componentVisual.offsetWidth;
    componentVisual.classList.add('is-playing');
    componentRunning = true;
    componentPaused = false;
    componentRemaining = 4800;
    componentStarted = Date.now();
    componentControl('Pausar', 'pause');
    componentTimer = setTimeout(finishComponentAnimation, componentRemaining);
  }
  function pauseComponentAnimation() {
    if (!componentRunning || componentPaused) return;
    clearTimeout(componentTimer);
    componentRemaining = Math.max(0, componentRemaining - (Date.now() - componentStarted));
    componentPaused = true;
    componentVisual.classList.add('is-paused');
    componentControl('Continuar', 'resume');
  }
  componentPlay.addEventListener('click', () => {
    if (componentRunning && !componentPaused) { pauseComponentAnimation(); return; }
    if (componentPaused) {
      componentPaused = false;
      componentStarted = Date.now();
      componentVisual.classList.remove('is-paused');
      componentControl('Pausar', 'pause');
      componentTimer = setTimeout(finishComponentAnimation, componentRemaining);
      return;
    }
    playComponentAnimation();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseComponentAnimation();
  });
  function selectPart(tab, animate = true) {
    finishComponentAnimation();
    partTabs.forEach(button => {
      const active = button === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    const key = tab.dataset.part;
    const content = partContent[key];
    stage.dataset.part = key;
    componentVisual.dataset.active = key;
    $$('.component-illustration').forEach(visual => {
      const inactive = visual.dataset.component !== key;
      visual.toggleAttribute('hidden', inactive);
      visual.setAttribute('aria-hidden', String(inactive));
    });
    const detail = $('#part-detail');
    detail.setAttribute('aria-labelledby', tab.id);
    $('#component-role').textContent = content.role;
    $('#component-number').textContent = `COMPONENTE ${content.number} / 04`;
    const heading = $('.component-copy h3');
    heading.replaceChildren(document.createTextNode(content.title[0]), document.createElement('br'), document.createTextNode(content.title[1]));
    $('.component-description').textContent = content.description;
    $('#component-analogy-text').textContent = content.analogy;
    $('#component-visual-caption').textContent = content.caption;
    $('#component-steps').replaceChildren(...content.steps.map(text => {
      const li = document.createElement('li'); li.textContent = text; return li;
    }));
    componentControl('Ver en acción', 'play');
    componentVisual.classList.remove('is-entering');
    if (animate && !reducedMotion) {
      void componentVisual.offsetWidth;
      componentVisual.classList.add('is-entering');
      playComponentAnimation();
    }
  }
  partTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectPart(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') target = (index + 1) % partTabs.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') target = (index - 1 + partTabs.length) % partTabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = partTabs.length - 1;
      if (target !== undefined) { event.preventDefault(); selectPart(partTabs[target]); partTabs[target].focus(); }
    });
  });
  selectPart(partTabs[0], false);
  if ('IntersectionObserver' in window && !reducedMotion) {
    const componentObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        if (!componentHasPlayed) playComponentAnimation();
        componentObserver.disconnect();
      }
    }, { threshold: 0.25 });
    componentObserver.observe(componentVisual);
  }

  const savingPlan = $('#saving-plan');
  const otherPrice = $('#competitor-price');
  function updateSavings() {
    const own = Number(savingPlan.value);
    const other = Number(otherPrice.value);
    const valid = otherPrice.value.trim() !== '' && Number.isFinite(other) && other >= 0 && other <= 10000;
    $('#price-error').hidden = valid;
    otherPrice.setAttribute('aria-invalid', String(!valid));
    if (!valid) {
      $('#saving-amount').textContent = '—';
      $('#saving-percent').textContent = 'Ingresa un precio válido para comparar.';
      $('#saving-label').textContent = 'COMPARACIÓN EN PAUSA';
      return;
    }
    const difference = other - own;
    const scale = Math.max(own, other, 1);
    $('#saving-amount').textContent = money(Math.abs(difference));
    $('#saving-label').textContent = difference > 0 ? 'TU DIFERENCIA A FAVOR' : difference < 0 ? 'DIFERENCIA SOBRE EL OTRO EQUIPO' : 'MISMA INVERSIÓN DE REFERENCIA';
    $('#saving-percent').textContent = difference > 0
      ? `${((difference / other) * 100).toFixed(1).replace(/\.0$/, '')}% menos de inversión inicial`
      : difference < 0 ? 'En este ejemplo, el otro equipo tiene un menor precio.' : 'Compara también la instalación y las prestaciones.';
    $('#nexo-bar-label').textContent = money(own);
    $('#competitor-bar-label').textContent = money(other);
    $('#nexo-bar').style.width = `${own / scale * 100}%`;
    $('#competitor-bar').style.width = `${other / scale * 100}%`;
  }
  savingPlan.addEventListener('change', updateSavings);
  otherPrice.addEventListener('input', updateSavings);
  updateSavings();

  const quoteType = $('#quote-type');
  $$('[data-choose-plan]').forEach(link => link.addEventListener('click', () => {
    quoteType.value = link.dataset.choosePlan;
    toast(link.dataset.choosePlan === 'switch' ? 'Elegiste interruptor. Cuéntame sobre tu puerta.' : 'Elegiste perilla. Revisemos la compatibilidad.');
  }));
  $$('[data-project-idea]').forEach(button => button.addEventListener('click', () => {
    quoteType.value = 'other';
    const field = $('#quote-message');
    const idea = button.dataset.projectIdea;
    if (!field.value.trim()) field.value = idea;
    else if (!field.value.includes(idea)) field.value = `${idea}\n${field.value}`.slice(0, 800);
    $('#contacto').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    toast('Cuéntame tu idea y la coordinamos por WhatsApp.');
  }));
  const typeLabels = {
    unknown: 'Apertura remota. No estoy seguro del mecanismo; puedo enviar una foto.',
    switch: 'Interruptor / pulsador (precio de referencia desde S/150).',
    knob: 'Perilla / mecanismo con carcasa 3D (precio de referencia desde S/210).',
    other: 'Un proyecto de automatización a medida, para evaluar y cotizar.'
  };
  $('#quote-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = $('#quote-name').value.trim();
    const city = $('#quote-city').value.trim();
    if (!name || !city) {
      toast('Completa tu nombre y ciudad para preparar la consulta.');
      (name ? $('#quote-city') : $('#quote-name')).focus();
      return;
    }
    if (!form.reportValidity()) return;
    const note = $('#quote-message').value.trim();
    const message = [
      `Hola Ricky, soy ${name}. Vi la web de Nexo Automatización.`,
      `Mi ubicación: ${city}.`,
      `Me interesa: ${typeLabels[quoteType.value] || typeLabels.unknown}`,
      ...(note ? [`Detalles: ${note}`] : []),
      quoteType.value === 'other' ? '¿Podemos coordinar para evaluar mi idea y una cotización?' : '¿Podemos revisar la compatibilidad de mi puerta y la cotización? Puedo enviar fotos del mecanismo.'
    ].join('\n\n');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const fallback = $('#whatsapp-fallback');
    fallback.href = url;
    fallback.hidden = false;
    window.open(url, '_blank', 'noopener,noreferrer');
    toast('Consulta preparada. Revísala y envíala en WhatsApp.');
  });

  const credits = $('#credits-dialog');
  const creditsButton = $('#credits-button');
  creditsButton.addEventListener('click', () => {
    credits.showModal();
    document.body.classList.add('dialog-open');
  });
  $('#close-credits').addEventListener('click', () => credits.close());
  credits.addEventListener('click', event => {
    if (event.target === credits) {
      const rect = credits.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) credits.close();
    }
  });
  credits.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    creditsButton.focus();
  });
  $('#copyright-year').textContent = String(new Date().getFullYear());
})();
