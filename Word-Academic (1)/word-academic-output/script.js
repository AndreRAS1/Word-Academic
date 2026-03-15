// ============================================================
//  WORDACADEMIC — script.js
// ============================================================


// ── 1. CARROSSEL DO HERO (fundo que muda automaticamente) ────

let heroIndex = 0;
const heroSlides = document.querySelectorAll('.carousel-container .slide');

function changeSlide(direction) {
    if (heroSlides.length === 0) return;
    heroSlides[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + direction + heroSlides.length) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
}

setInterval(() => changeSlide(1), 5000);


// ── 2. CARROSSEL DE DESTINOS (cards com autoplay) ────────────

(function () {
    const track    = document.getElementById('destinosTrack');
    const prevBtn  = document.getElementById('destinosPrev');
    const nextBtn  = document.getElementById('destinosNext');
    const dotsWrap = document.getElementById('destinosDots');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.card'));
    const total = cards.length;
    let current = 0;
    let timer   = null;

    // Quantos cards aparecem ao mesmo tempo
    function visible() {
        if (window.innerWidth < 600) return 1;
        if (window.innerWidth < 900) return 2;
        return 3;
    }

    function pages() {
        return Math.ceil(total / visible());
    }

    // Move a esteira para a página 'idx'
    function goTo(idx) {
        const vis = visible();
        const pg  = pages();

        // loop: se passar do fim, volta ao 0
        if (idx >= pg) idx = 0;
        if (idx < 0)   idx = pg - 1;
        current = idx;

        // Largura de um card (lida do DOM, sempre precisa)
        const cardW = cards[0].offsetWidth;
        const gap   = 25;
        const move  = current * vis * (cardW + gap);

        track.style.transform = 'translateX(-' + move + 'px)';

        // Atualiza dots
        Array.from(dotsWrap.querySelectorAll('.carousel-dot')).forEach(function(d, i) {
            d.classList.toggle('active', i === current);
        });

        // Setas: desabilita nos extremos (sem loop nas setas)
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === pg - 1;
    }

    // Cria as bolinhas
    function buildDots() {
        dotsWrap.innerHTML = '';
        for (var i = 0; i < pages(); i++) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Ir para página ' + (i + 1));
            (function(idx) {
                dot.addEventListener('click', function() { goTo(idx); resetTimer(); });
            })(i);
            dotsWrap.appendChild(dot);
        }
    }

    // Autoplay: avança uma página a cada 3s
    function startTimer() {
        timer = setInterval(function() { goTo(current + 1); }, 3000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    // Clique nas setas
    prevBtn.addEventListener('click', function() { goTo(current - 1); resetTimer(); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); resetTimer(); });

    // Pausa ao passar o mouse
    track.parentElement.addEventListener('mouseenter', function() { clearInterval(timer); });
    track.parentElement.addEventListener('mouseleave', startTimer);

    // Reconstrói ao redimensionar
    window.addEventListener('resize', function() { buildDots(); goTo(0); });

    // Inicia
    buildDots();
    goTo(0);
    startTimer();
})();


// ── 3. ANIMAÇÕES AO ROLAR ───────────────────────────────────

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
});


// ── 4. FAQ ──────────────────────────────────────────────────

document.querySelectorAll('.faq-item').forEach(function(item) {
    var q = item.querySelector('.faq-question');
    if (q) q.addEventListener('click', function() { item.classList.toggle('open'); });
});


// ── 5. MENU MOBILE ──────────────────────────────────────────

var toggle = document.querySelector('.menu-toggle');
var nav    = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', function() { nav.classList.toggle('open'); });




