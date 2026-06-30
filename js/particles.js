/* ========================================
   Cherry Blossom Particle System
   Canvas-based falling petal animation
   ======================================== */

class SakuraParticle {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = -20;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 1 - 0.5;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 3 - 1.5;
    this.opacity = Math.random() * 0.6 + 0.3;
    this.sway = Math.random() * 2;
    this.swaySpeed = Math.random() * 0.02 + 0.01;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.color = this.getRandomColor();
  }

  getRandomColor() {
    const colors = [
      { r: 255, g: 183, b: 197 }, // soft pink
      { r: 255, g: 155, b: 184 }, // sakura pink
      { r: 255, g: 200, b: 212 }, // light pink
      { r: 230, g: 190, b: 255 }, // lavender
      { r: 255, g: 220, b: 230 }, // very light pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(time) {
    this.y += this.speedY;
    this.x += this.speedX + Math.sin(time * this.swaySpeed + this.swayOffset) * this.sway;
    this.rotation += this.rotationSpeed;

    if (this.y > this.canvas.height + 20) {
      this.reset();
    }
    if (this.x > this.canvas.width + 20) {
      this.x = -20;
    }
    if (this.x < -20) {
      this.x = this.canvas.width + 20;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;

    // Draw petal shape
    ctx.beginPath();
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    
    // Create petal shape using bezier curves
    const s = this.size;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(s * 0.5, -s * 0.3, s, -s * 0.2, s * 0.8, s * 0.3);
    ctx.bezierCurveTo(s * 0.6, s * 0.8, s * 0.2, s, 0, s * 0.7);
    ctx.bezierCurveTo(-s * 0.2, s, -s * 0.6, s * 0.8, -s * 0.8, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.5, -s * 0.3, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

class SakuraParticleSystem {
  constructor(canvasId, particleCount = 40) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = particleCount;
    this.animationId = null;
    this.time = 0;

    this.resize();
    this.init();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.canvas.width = parent ? parent.offsetWidth : window.innerWidth;
    this.canvas.height = parent ? parent.offsetHeight : window.innerHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      const particle = new SakuraParticle(this.canvas);
      // Spread initial positions
      particle.y = Math.random() * this.canvas.height;
      this.particles.push(particle);
    }
  }

  animate() {
    this.time++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update(this.time);
      particle.draw(this.ctx);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Export for use
window.SakuraParticleSystem = SakuraParticleSystem;
