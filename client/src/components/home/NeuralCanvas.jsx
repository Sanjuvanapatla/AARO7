import React, { useEffect, useRef } from 'react';

const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, particles, animationId;
    
    // Increased particle count for the dense antigravity feel
    const PARTICLE_COUNT = 250; 
    const MOUSE_REPEL_RADIUS = 200;
    const MOUSE_REPEL_FORCE = 0.1;

    let mouse = { x: -1000, y: -1000 };

    function resize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial random distribution
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        
        // Randomize speed, floating upwards and drifting sideways
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -(Math.random() * 0.6 + 0.2);
        
        // Size and type (dots vs small dashes)
        this.radius = Math.random() * 1.8 + 0.5;
        this.isDash = Math.random() > 0.6;
        this.angle = Math.random() * Math.PI * 2;
        
        // Use AARO7 Cyan, but randomize opacity for depth
        const opacities = [0.1, 0.3, 0.5, 0.8];
        this.colorAlpha = opacities[Math.floor(Math.random() * opacities.length)];
      }

      update() {
        // Apply mouse repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_REPEL_RADIUS) {
          const force = (MOUSE_REPEL_RADIUS - distance) / MOUSE_REPEL_RADIUS;
          this.vx -= (dx / distance) * force * MOUSE_REPEL_FORCE;
          this.vy -= (dy / distance) * force * MOUSE_REPEL_FORCE;
        }

        // Apply friction to max speed
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Base upward drift
        this.vy -= 0.005;

        // Rotate dashes slowly
        if (this.isDash) {
          this.angle += this.vx * 0.05;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Reset if goes off top or sides
        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
          this.y = height + 10; // start exactly at bottom
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Cyan color to match AARO7 theme
        ctx.fillStyle = `rgba(56, 189, 248, ${this.colorAlpha})`;

        if (this.isDash) {
          // Draw a small dash/pill shape
          ctx.beginPath();
          ctx.roundRect(-this.radius * 2, -this.radius / 2, this.radius * 4, this.radius, this.radius);
          ctx.fill();
        } else {
          // Draw dot
          ctx.beginPath();
          ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    }

    function draw() {
      // Clear with very slight fade for trail effect
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
    }

    function loop() {
      draw();
      animationId = requestAnimationFrame(loop);
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Track mouse globally but scoped to coordinates of the canvas
      if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      resize();
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    resize();
    initParticles();
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="neural-canvas" style={{ pointerEvents: 'none' }} />;
};

export default NeuralCanvas;
