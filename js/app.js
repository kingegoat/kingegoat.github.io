/**
 * kingegoat — personal portfolio site
 * Vanilla JS · ES2024 · no bundler · no dependencies
 */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const state = {
    lang:  localStorage.getItem('kg.lang') || 'ru',
    theme: localStorage.getItem('kg.theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
    dict:  {},
};

/* =========================================================================
   i18n
   ========================================================================= */
async function loadDict(lang) {
    try {
        const res = await fetch(`i18n/${lang}.json`, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
        return await res.json();
    } catch (err) {
        console.warn('[i18n]', err);
        return {};
    }
}

function applyTranslations() {
    const dict = state.dict;
    if (!dict) return;

    $$('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const value = key.split('.').reduce((o, k) => (o ? o[k] : null), dict);
        if (typeof value === 'string') el.textContent = value;
    });

    $$('[data-i18n-attr]').forEach(el => {
        const attr = el.dataset.i18nAttr;
        const key  = el.dataset.i18n;
        const value = key.split('.').reduce((o, k) => (o ? o[k] : null), dict);
        if (attr && typeof value === 'string') el.setAttribute(attr, value);
    });

    document.documentElement.lang = state.lang;
}

async function setLang(lang) {
    if (!['ru', 'en'].includes(lang)) return;
    state.lang = lang;
    localStorage.setItem('kg.lang', lang);
    state.dict = await loadDict(lang);
    applyTranslations();

    $$('.lang-btn').forEach(b => {
        const isActive = b.dataset.lang === lang;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-pressed', String(isActive));
    });
}

/* =========================================================================
   Theme
   ========================================================================= */
function applyTheme() { document.documentElement.dataset.theme = state.theme; }
function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('kg.theme', state.theme);
    applyTheme();
}

/* =========================================================================
   Burger / mobile nav
   ========================================================================= */
function setupBurger() {
    const burger = $('#burger');
    const nav    = $('#mobile-nav');
    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        const isOpen = burger.classList.toggle('is-open');
        nav.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        nav.setAttribute('aria-hidden', String(!isOpen));
    });

    nav.addEventListener('click', e => {
        if (e.target.matches('a')) {
            burger.classList.remove('is-open');
            nav.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
            nav.setAttribute('aria-hidden', 'true');
        }
    });
}

/* =========================================================================
   Scroll-aware header
   ========================================================================= */
function setupScrollHeader() {
    const header = $('#site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* =========================================================================
   Reveal on scroll
   ========================================================================= */
function setupReveal() {
    const targets = $$('.section-head, .stack-group, .project-card, .card, .contact-card, .prose');
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach((el, i) => {
        el.dataset.reveal = '';
        el.style.transitionDelay = `${Math.min(i * 50, 400)}ms`;
        io.observe(el);
    });
}

/* =========================================================================
   Init
   ========================================================================= */
async function init() {
    applyTheme();
    setupBurger();
    setupScrollHeader();
    setupReveal();

    $('#theme-toggle')?.addEventListener('click', toggleTheme);
    $$('.lang-btn').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

    await setLang(state.lang);

    $('#year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', init);
