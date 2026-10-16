/* Wai Hong Brothers — GSAP ScrollTrigger effects (homepage only).
   Loaded after gsap.min.js + ScrollTrigger.min.js from cdnjs. Entirely additive:
   if the CDN scripts fail to load, this file no-ops and the existing
   [data-reveal] IntersectionObserver system (js/main.js) still handles every
   section's basic fade-up, so the page never depends on this for usability. */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ---- Hero parallax ----------------------------------------------------
     The background photo drifts slower than the page scrolls, using the
     oversized .has-parallax sizing in css/style.css so no empty edge shows. */
  const heroMedia = document.querySelector('.hero-media');
  if (heroMedia) {
    heroMedia.classList.add('has-parallax');
    gsap.to(heroMedia, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* ---- Process timeline: pin + scroll-scrubbed step reveal --------------
     Desktop only — the 6-column grid wraps to fewer columns on narrow
     screens (see css/responsive.css), where a pinned scrub reads awkwardly.
     On mobile these steps simply render at full opacity with no animation
     (data-reveal was intentionally removed from them in index.html so the
     two systems never fight over the same opacity/transform properties). */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 860px)', () => {
    const steps = gsap.utils.toArray('.process-step');
    if (!steps.length) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: '.process-section',
        start: 'top top+=84',
        end: '+=120%',
        pin: true,
        scrub: 1
      }
    }).from(steps, {
      opacity: 0.2,
      y: 40,
      scale: 0.92,
      stagger: 0.5,
      ease: 'none'
    });
  });
})();
