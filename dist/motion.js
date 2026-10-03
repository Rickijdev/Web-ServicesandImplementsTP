/* Nexo — animaciones de scroll sin librerías ni bloqueo del desplazamiento. */
(() => {
  'use strict';

  const select = selector => document.querySelector(selector);
  const selectAll = selector => [...document.querySelectorAll(selector)];
  const clamp = (value, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionPreference.matches;
  const story = select('#experiencia');
  const sticky = select('.story-sticky');
  const progressBar = select('#reading-progress-bar');
  const storyProgress = select('#story-progress');
  const header = select('.site-header');
  const sceneTabs = selectAll('[data-story-step]');
  const scenePanels = selectAll('[data-story-scene]');
  const parallaxItems = selectAll('[data-parallax]');
  const pinnedStory = () => !reduceMotion && window.innerHeight >= 620;
  let activeScene = 0;
  let scheduled = false;

  const scenes = [
    {
      title: 'Todo empieza',
      emphasis: 'con tu clic.',
      description: 'Tu huésped llegó. Tomas tu celular y das la orden de apertura, desde donde tengas internet.'
    },
    {
      title: 'La tecnología',
      emphasis: 'hace su parte.',
      description: 'El ESP32 recibe tu orden por internet. El servomotor gira y su brazo acciona el interruptor o la perilla compatible.'
    },
    {
      title: 'Una puerta lista.',
      emphasis: 'Una bienvenida.',
      description: 'El acceso queda liberado para que tu huésped abra la puerta. Tú continúas con tu día, sin trasladarte al alojamiento.'
    }
  ];

  function showScene(index, animate = true) {
    if (index === activeScene && animate) return;
    activeScene = index;
    const content = scenes[index];
    story.dataset.scene = String(index);
    select('#story-number').textContent = String(index + 1).padStart(2, '0');
    const heading = select('#story-title');
    const emphasis = document.createElement('em');
    emphasis.textContent = content.emphasis;
    heading.replaceChildren(document.createTextNode(content.title), document.createElement('br'), emphasis);
    select('#story-description').textContent = content.description;
    select('#story-visual').setAttribute('aria-labelledby', `story-tab-${index}`);
    sceneTabs.forEach((tab, position) => {
      const selected = index === position;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    scenePanels.forEach((panel, position) => {
      panel.hidden = position !== index;
      panel.setAttribute('aria-hidden', String(position !== index));
      panel.classList.remove('is-entering');
    });
    const copy = select('.story-copy');
    copy.classList.remove('is-switching');
    if (animate && !reduceMotion) {
      void copy.offsetWidth;
      copy.classList.add('is-switching');
      scenePanels[index].classList.add('is-entering');
    }
  }

  function goToScene(index, focus = false) {
    if (!pinnedStory()) {
      showScene(index, !reduceMotion);
      storyProgress.style.transform = `scaleX(${(index + 1) / scenes.length})`;
    } else {
      const rectangle = story.getBoundingClientRect();
      const pagePosition = window.scrollY + rectangle.top;
      const available = Math.max(1, story.offsetHeight - sticky.offsetHeight);
      const target = pagePosition + available * ((index + 0.42) / scenes.length);
      // Keep native browser scrolling; touch, wheel and keyboard remain available.
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    if (focus) sceneTabs[index].focus();
  }

  sceneTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => goToScene(index));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % scenes.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + scenes.length) % scenes.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = scenes.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        goToScene(next, true);
      }
    });
  });

  // Sequential entrances make sections readable while giving the page depth.
  selectAll('[data-stagger]').forEach(group => {
    [...group.children].forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 2) * 120}ms`);
    });
  });
  selectAll('.price-card,.savings-panel,.component-visual').forEach(element => {
    if (element.classList.contains('reveal')) element.dataset.reveal = 'scale';
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    document.documentElement.classList.add('scroll-motion');
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          reveals.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    selectAll('.reveal').forEach(element => reveals.observe(element));
  } else {
    selectAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  if ('IntersectionObserver' in window) {
    const navigation = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        selectAll('.desktop-nav a').forEach(link => {
          const current = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-current', current);
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-18% 0px -60% 0px' });
    selectAll('section[id]').forEach(element => navigation.observe(element));
  }

  function updateScroll() {
    scheduled = false;
    const viewport = window.innerHeight;
    const pageHeight = Math.max(1, document.documentElement.scrollHeight - viewport);
    const scrollPosition = window.scrollY || 0;
    progressBar.style.transform = `scaleX(${clamp(scrollPosition / pageHeight)})`;
    header.classList.toggle('is-scrolled', scrollPosition > 25);

    if (!reduceMotion) {
      if (pinnedStory()) {
        const bounds = story.getBoundingClientRect();
        const length = Math.max(1, story.offsetHeight - sticky.offsetHeight);
        const progress = clamp(-bounds.top / length);
        storyProgress.style.transform = `scaleX(${progress})`;
        if (bounds.top < viewport && bounds.bottom > 0) {
          showScene(Math.min(scenes.length - 1, Math.floor(progress * scenes.length)));
        }
      }
      parallaxItems.forEach(element => {
        const rectangle = element.getBoundingClientRect();
        if (rectangle.bottom < -100 || rectangle.top > viewport + 100) return;
        const strength = Number(element.dataset.parallax) || 0;
        const middle = rectangle.top + rectangle.height / 2;
        const offset = clamp((viewport / 2 - middle) * strength, -40, 40);
        element.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
      });
    }
  }

  function requestUpdate() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
  }

  // Browsers without requestAnimationFrame still show every section.
  if (typeof window.requestAnimationFrame === 'function') {
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('load', requestUpdate, { once: true });
    showScene(0, false);
    requestUpdate();
  }
})();
