// heroanimation.js — Le hero devient le header au scroll

const $header = document.querySelector("#sticky-parallax-header");
const $heroTitle = document.querySelector(".hero-title");
const $scrollIndicator = document.querySelector(".scroll-indicator");
const $h1 = document.querySelector("h1");
const $navContact = document.querySelector(".nav-contact-sticky");

// 1. Fixe le header et pousse le contenu en dessous
$header.style.position = 'fixed';
$header.style.top = '0';
document.body.style.paddingTop = '100vh';

// 2. Forcer le h1 sur une seule ligne
$h1.style.whiteSpace = 'nowrap';

// 3. Cacher le lien contact au départ
$navContact.style.opacity = '0';
$navContact.style.pointerEvents = 'none';

// 4. Animation principale : hero → navbar
$header.animate(
    {
        height: ['100vh', '70px'],
        backgroundColor: ['rgba(10,14,42,0)', '#0A0E2A'],
    },
    {
        fill: "both",
        timeline: new ScrollTimeline({ source: document.documentElement }),
        rangeStart: '0',
        rangeEnd: '90vh',
    }
);

// 5. Le h1 se déplace vers le coin gauche en rétrécissant
$h1.animate(
    {
        fontSize: ['100px', '26px'],
        marginLeft: ['0px', '-38vw'],
        marginTop: ['0px', '0px'],
    },
    {
        fill: "both",
        timeline: new ScrollTimeline({ source: document.documentElement }),
        rangeStart: '0',
        rangeEnd: '90vh',
    }
);

// 6. Disparition du sous-titre
$heroTitle.animate(
    {
        opacity: [1, 0],
        transform: ['translateY(0)', 'translateY(-10px)'],
        height: ['auto', '0px'],
        marginBottom: ['60px', '0px'],
    },
    {
        fill: "both",
        timeline: new ScrollTimeline({ source: document.documentElement }),
        rangeStart: '0',
        rangeEnd: '35vh',
    }
);

// 7. Disparition du scroll indicator
$scrollIndicator.animate(
    { opacity: [1, 0], height: ['auto', '0px'] },
    {
        fill: "both",
        timeline: new ScrollTimeline({ source: document.documentElement }),
        rangeStart: '0',
        rangeEnd: '25vh',
    }
);

// 8. Apparition du lien CONTACT uniquement à la fin de l'animation (>= 90vh)
$navContact.animate(
    { opacity: [0, 0, 1], pointerEvents: ['none', 'none', 'auto'] },
    {
        fill: "both",
        timeline: new ScrollTimeline({ source: document.documentElement }),
        rangeStart: '80vh',
        rangeEnd: '95vh',
    }
);

// Synchroniser pointer-events via scroll event
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const trigger = window.innerHeight * 0.9;
    if (scrolled >= trigger) {
        $navContact.style.pointerEvents = 'auto';
    } else {
        $navContact.style.pointerEvents = 'none';
    }
});