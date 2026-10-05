import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useMotionPreference() {
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setSystemReduced(media.matches);
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  return { reduced: systemReduced || paused, paused, setPaused, systemReduced };
}

export function useScrollExperience(
  reduced: boolean,
  onStep: (step: number) => void,
) {
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    if (reduced) return;
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 32,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 93%", once: true },
        });
      });
      media.add("(min-width: 901px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || "0");
          gsap.fromTo(
            el,
            { y: -amount / 2 },
            {
              y: amount,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
        gsap.to(".marquee-track", {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: ".marquee",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".footer-word",
          { yPercent: -18 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: ".site-footer",
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.7,
            },
          },
        );
      });
      media.add("(min-width: 901px) and (min-height: 800px)", () => {
        ScrollTrigger.create({
          trigger: ".process-scroll",
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) =>
            onStep(Math.min(2, Math.floor(self.progress * 3))),
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    let disposed = false;
    document.fonts.ready.then(() => {
      if (!disposed) refresh();
    });
    return () => {
      disposed = true;
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, [reduced, onStep]);
}
