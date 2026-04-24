const card = document.querySelector('.about-identity');

// Crée et injecte l'élément glare
const glare = document.createElement('div');
glare.classList.add('glare');
card.appendChild(glare);

const MAX_TILT = 6; // degrés max de rotation

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();

  // Position de la souris relative à la carte (entre -1 et 1)
  const x = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 à 0.5
  const y = (e.clientY - rect.top)  / rect.height - 0.5;

  const rotateY =  x * MAX_TILT * 2;  // gauche/droite
  const rotateX = -y * MAX_TILT * 2;  // haut/bas (inversé)

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

  // Déplace le glare selon la souris
  glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(225, 129, 252, 0.3), transparent 65%)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
  glare.style.background = 'none';
});

card.addEventListener('mouseenter', () => {
  card.style.transition = 'none'; // fluidité immédiate pendant le mouvement
});