// timeline.js — Animation des project-card au scroll

const cards = document.querySelectorAll('.project-card');

cards.forEach((card, index) => {
    const isEven = index % 2 === 0;

    card.style.opacity = '0';
    card.style.transform = isEven ? 'translateX(-60px)' : 'translateX(60px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
                card.classList.add('visible');
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(card);
});

// Ligne verticale à gauche des cartes
const portfolio = document.querySelector('.portfolio');

const timelineLine = document.createElement('div');
timelineLine.classList.add('timeline-line');
portfolio.appendChild(timelineLine);

// Hauteur dynamique de la ligne selon le scroll
function updateLine() {
    const portfolioRect = portfolio.getBoundingClientRect();
    const portfolioTop = portfolioRect.top;
    const portfolioHeight = portfolioRect.height;
    const viewH = window.innerHeight;

    if (portfolioTop > viewH || portfolioTop + portfolioHeight < 0) return;

    // Progression : combien du portfolio a été scrollé
    const scrolled = Math.max(0, viewH - portfolioTop);
    const progress = Math.min(scrolled / portfolioHeight, 1);

    timelineLine.style.height = (progress * (portfolioHeight - 160)) + 'px';
}

window.addEventListener('scroll', updateLine, { passive: true });
updateLine();