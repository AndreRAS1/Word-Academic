let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    // Remove a classe active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Ajusta o índice para ser infinito (volta ao início ou fim)
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Adiciona a classe active no slide atual
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Troca automática a cada 5 segundos
setInterval(() => {
    changeSlide(1);
}, 5000);