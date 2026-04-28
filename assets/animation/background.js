const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 130; // distance max pour tracer un trait
const particles = [];

function randomParticle(forceRandom = true) {
    return {
        x: Math.random() * canvas.width,
        y: forceRandom ? Math.random() * canvas.height : canvas.height + 20,
        char: Math.random() > 0.5 ? '0' : '1',
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.3 + 0.1),
        opacity: Math.random() * 0.5 + 0.2,
        size: Math.random() * 10 + 20,
        oscillation: Math.random() * Math.PI * 2,
        oscillationSpeed: Math.random() * 0.005 + 0.002,
        oscillationAmp: Math.random() * 0.3 + 0.1,
    };
}

function init() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(randomParticle(true));
    }
}

init();

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
                // Plus les particules sont proches, plus le trait est visible
                const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.25;

                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(100, 150, 220, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function draw() {
    ctx.fillStyle = 'rgba(10, 14, 42, 0.55)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Tracer les connexions en premier (sous les caractères)
    drawConnections();

    // 2. Tracer les particules par-dessus
    for (let p of particles) {
        p.oscillation += p.oscillationSpeed;
        p.x += p.vx + Math.sin(p.oscillation) * p.oscillationAmp * 0.05;
        p.y += p.vy;

        const roll = Math.random();
        let color;
        if (roll > 0.97) {
            color = `rgba(255, 255, 255, ${p.opacity + 0.3})`;
        } else if (roll > 0.75) {
            color = `rgba(201, 168, 76, ${p.opacity})`;
        } else {
            color = `rgba(100, 150, 220, ${p.opacity * 0.7})`;
        }

        ctx.fillStyle = color;
        ctx.font = `${p.size}px monospace`;
        ctx.fillText(p.char, p.x, p.y);

        if (p.y < -20 || p.x < -20 || p.x > canvas.width + 20) {
            Object.assign(p, randomParticle(false));
            p.x = Math.random() * canvas.width;
        }
    }
}

setInterval(draw, 33);