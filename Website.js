// === Landing-section parallax (unchanged behavior) ===
let stars = document.getElementById('stars');
let sun = document.getElementById('sun');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let mountains_front = document.getElementById('mountains_front');
let header = document.querySelector('header');

window.addEventListener('scroll', function () {
    let value = window.scrollY;
    if (stars) stars.style.left = value * 0.25 + 'px';
    if (sun) sun.style.top = value * 1.5 + 'px';
    if (mountains_behind) mountains_behind.style.top = value * 0.5 + 'px';
    if (mountains_front) mountains_front.style.top = value * 0 + 'px';
    if (text) text.style.marginTop = value * 3.0 + 'px';
    if (btn) btn.style.marginTop = value * 1.5 + 'px';
});

// === Scroll-reveal for content sections ===
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
}

// === Active-nav highlighting based on the section in view ===
const navLinks = Array.from(document.querySelectorAll('header ul:last-of-type li a'));
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if (sections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) =>
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id)
                    );
                }
            });
        },
        { threshold: 0.5 }
    );
    sections.forEach((sec) => navObserver.observe(sec));
}

// === Footer year ===
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
