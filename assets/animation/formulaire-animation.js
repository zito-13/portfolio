const formCanvas = document.getElementById('reflet-canvas');
const formCtx = formCanvas.getContext('2d');
const formContainer = document.getElementById('formulaire-contact');

function resizeFormCanvas() {
    formCanvas.width = formContainer.offsetWidth;
    formCanvas.height = formContainer.offsetHeight;
}
resizeFormCanvas();
window.addEventListener('resize', resizeFormCanvas);

// Les 4 côtés disponibles
const SIDES = ['top', 'right', 'bottom', 'left'];

class RefletRadial {
    constructor() {
        this.reset();
    }

    reset() {
        const w = formCanvas.width;
        const h = formCanvas.height;

        // Choisit un côté aléatoire différent du précédent
        let newSide;
        do {
            newSide = SIDES[Math.floor(Math.random() * SIDES.length)];
        } while (newSide === this.side);
        this.side = newSide;

        // Position de départ selon le côté choisi
        switch (this.side) {
            case 'top':
                this.x = 0; this.y = 0;
                this.dx = 0.6 + Math.random() * 0.4; this.dy = 0;
                break;
            case 'right':
                this.x = w; this.y = 0;
                this.dx = 0; this.dy = 0.6 + Math.random() * 0.4;
                break;
            case 'bottom':
                this.x = w; this.y = h;
                this.dx = -(0.6 + Math.random() * 0.4); this.dy = 0;
                break;
            case 'left':
                this.x = 0; this.y = h;
                this.dx = 0; this.dy = -(0.6 + Math.random() * 0.4);
                break;
        }

        // Opacité aléatoire à chaque apparition
        this.opacity = 0.15 + Math.random() * 0.15;

        // Phase : 'in' (apparition) | 'move' (déplacement) | 'out' (disparition)
        this.phase = 'in';
        this.fadeValue = 0; // 0 → 1 pour fade in, 1 → 0 pour fade out
    }

    isOutOfBounds() {
        const w = formCanvas.width;
        const h = formCanvas.height;
        return this.x < -200 || this.x > w + 200 || this.y < -200 || this.y > h + 200;
    }

    update() {
        // Gestion du fade
        if (this.phase === 'in') {
            this.fadeValue += 0.015;
            if (this.fadeValue >= 1) { this.fadeValue = 1; this.phase = 'move'; }
        } else if (this.phase === 'move') {
            this.x += this.dx;
            this.y += this.dy;

            // Commence à disparaître quand il approche du bord opposé
            const w = formCanvas.width;
            const h = formCanvas.height;
            const nearEnd =
                (this.side === 'top' && this.x > w * 0.75) ||
                (this.side === 'right' && this.y > h * 0.75) ||
                (this.side === 'bottom' && this.x < w * 0.25) ||
                (this.side === 'left' && this.y < h * 0.25);

            if (nearEnd) this.phase = 'out';

        } else if (this.phase === 'out') {
            this.x += this.dx;
            this.y += this.dy;
            this.fadeValue -= 0.018;
            if (this.fadeValue <= 0) this.reset(); // ← change de côté et recommence
        }
    }

    draw() {
        const radius = 160; // ← taille du halo (augmentée)
        const currentOpacity = this.opacity * this.fadeValue;

        const grad = formCtx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, radius
        );
        grad.addColorStop(0, `rgba(180, 100, 255,${currentOpacity})`);
        grad.addColorStop(0.3, `rgba(180, 100, 255,${currentOpacity * 0.8})`);
        grad.addColorStop(0.7, `rgba(180, 100, 255,${currentOpacity * 0.4})`);
        grad.addColorStop(1, `rgba(180, 100, 255,0)`);

        formCtx.fillStyle = grad;
        formCtx.fillRect(0, 0, formCanvas.width, formCanvas.height);
    }
}

const reflet = new RefletRadial();

function animateReflets() {
    formCtx.clearRect(0, 0, formCanvas.width, formCanvas.height);
    reflet.update();
    reflet.draw();
    requestAnimationFrame(animateReflets);
}

animateReflets();