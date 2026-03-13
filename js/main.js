// ================= FUNÇÕES GERAIS =================
function fadeIn(element) {
    let opacidade = 0;
    element.style.opacity = opacidade;
    element.style.display = "flex";
    const timerFade = setInterval(() => {
        if (opacidade >= 1) {
            clearInterval(timerFade);
        }
        element.style.opacity = opacidade;
        opacidade += 0.05;
    }, 20);
}

// ================= HERO BANNER - SLIDER =================
document.addEventListener("DOMContentLoaded", () => {
    const heroSlides = document.querySelectorAll('.hero .slide-item');
    
    if (heroSlides.length > 1) {
        let currentHero = 0;
        
        function mostrarHero(index) {
            heroSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                // Garantimos que a opacidade segue a classe active do CSS
                slide.style.opacity = (i === index) ? "1" : "0";
            });
        }

        // Inicializa o primeiro
        mostrarHero(0);

        // Troca a cada 5 segundos
        setInterval(() => {
            currentHero = (currentHero + 1) % heroSlides.length;
            mostrarHero(currentHero);
        }, 15000);
    }
});

// ================= QUEM SOMOS - SLIDES =================
const slides = document.querySelectorAll('.slide');
const labels = document.querySelectorAll('.slide-labels .label');

if (slides.length && labels.length) {
    let slideAtual = 0;
    let timer;

    function mostrarSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('ativo');
                slide.style.display = 'flex';
                slide.style.opacity = 0;
                fadeIn(slide);
            } else {
                slide.classList.remove('ativo');
                slide.style.display = 'none';
            }
        });
        labels.forEach((label, i) => label.classList.toggle('ativo', i === index));
        slideAtual = index;
    }

    labels.forEach((label, index) => {
        label.addEventListener('click', () => {
            mostrarSlide(index);
            resetAutoplay();
        });
    });

    function autoplay() {
        slideAtual = (slideAtual + 1) % slides.length;
        mostrarSlide(slideAtual);
    }

    function resetAutoplay() {
        clearInterval(timer);
        timer = setInterval(autoplay, 5000);
    }

    document.addEventListener("DOMContentLoaded", () => {
        mostrarSlide(slideAtual);
        timer = setInterval(autoplay, 5000);
    });
}



// ================= SOBRE.PÁGINA - VALORES =================
const valoresItems = document.querySelectorAll('.valor-item');
if (valoresItems.length) sliderAutoplay(valoresItems, 5000);

// ================= EQUIPA - CARROSSEL =================
const equipaSlides = document.querySelectorAll('.equipa-slide');
if (equipaSlides.length) sliderAutoplay(equipaSlides, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.antes-depois-card'));
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');

    let currentIndex = 0;
    const total = cards.length;
    const autoInterval = 30000; // 30s

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('prev', 'next');
        });

        const prevIndex = (currentIndex - 1 + total) % total;
        const nextIndex = (currentIndex + 1) % total;

        cards[prevIndex].classList.add('prev');
        cards[nextIndex].classList.add('next');

        // Centraliza o card ativo
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % total;
        updateCarousel();
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + total) % total;
        updateCarousel();
    }

    leftArrow.addEventListener('click', prevCard);
    rightArrow.addEventListener('click', nextCard);

    // Autoplay
    setInterval(nextCard, autoInterval);

    // Inicializa
    updateCarousel();
});
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.antes-depois-card');
    const wrapper = document.querySelector('.carousel-track-wrapper');
    
    if (!track || cards.length === 0 || !wrapper) return;

    let currentIndex = 0;

    function moveCarousel() {
        const isMobile = window.innerWidth <= 900;
        const cardsPerView = isMobile ? 1 : 3;
        const gap = isMobile ? 30 : 30;
        
        // 1. Incrementa o índice
        currentIndex++;

        // 2. LÓGICA DE TRAVÃO: Se o próximo passo mostrar um espaço vazio, volta ao início
        // Exemplo: 6 cards, mostras 3. No índice 3, já estás a ver os cards 4,5,6. 
        // Se fores para o índice 4, verias um buraco.
        if (currentIndex > (cards.length - cardsPerView)) {
            currentIndex = 0;
        }

        // 3. CÁLCULO DE OFFSET (Deslocamento exato)
        // Medimos o primeiro card para garantir precisão total
        const cardWidth = cards[0].offsetWidth;
        const moveDistance = currentIndex * (cardWidth + gap);

        track.style.transition = "transform 0.8s cubic-bezier(0.45, 0, 0.55, 1)";
        track.style.transform = `translateX(-${moveDistance}px)`;
    }

    // Limpeza e Reinício do Intervalo
    if (window.carouselInterval) clearInterval(window.carouselInterval);
    window.carouselInterval = setInterval(moveCarousel, 5000); // 5s para ser mais dinâmico

    // Reset ao redimensionar (evita bugs visuais)
    window.addEventListener('resize', () => {
        currentIndex = 0;
        track.style.transition = "none";
        track.style.transform = `translateX(0px)`;
    });
});