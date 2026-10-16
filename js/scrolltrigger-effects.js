/* Wai Hong Brothers — GSAP ScrollTrigger effects (homepage only).
   Loaded after gsap.min.js + ScrollTrigger.min.js from cdnjs. Entirely additive:
   if the CDN scripts fail to load, this file no-ops and the existing
   [data-reveal] IntersectionObserver system (js/main.js) still handles every
   section's basic fade-up, so the page never depends on this for usability. */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ---- Hero: pinned intro, effect starts at the very first scroll pixel -
     The headline ("We Know Everything About Roof Repair.") stays fully
     visible at rest on page load — it is NOT hidden-until-scroll, since
     that text needs to stay visible on first paint for crawlers/AEO (this
     is the exact text the SEO/AEO work earlier made sure real crawlers can
     read immediately). Instead the ScrollTrigger effect controls how the
     hero EXITS: pin the section right from scroll position 0, and scrub
     the content fading/scaling away while the background parallaxes,
     before the page releases into the Trust section. */
  const hero = document.querySelector('.hero');
  const heroMedia = document.querySelector('.hero-media');
  const heroContent = document.querySelector('.hero-content');
  const scrollCue = document.querySelector('.scroll-cue');
  if (hero && heroMedia && heroContent) {
    heroMedia.classList.add('has-parallax');

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=80%',
        pin: true,
        scrub: 1
      }
    });
    heroTl.to(heroMedia, { yPercent: 15, ease: 'none' }, 0);
    heroTl.to(heroContent, { opacity: 0, y: -60, scale: 0.94, ease: 'none' }, 0);
    if (scrollCue) heroTl.to(scrollCue, { opacity: 0, ease: 'none' }, 0);
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
