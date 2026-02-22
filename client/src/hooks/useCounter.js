import { useEffect } from 'react';

const useCounter = (deps = []) => {
  useEffect(() => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = el.getAttribute('data-counter');
            const suffix = el.getAttribute('data-suffix') || '';
            const prefix = el.getAttribute('data-prefix') || '';
            const isFloat = target.includes('.');
            const targetNum = parseFloat(target);
            const duration = 1500;
            const start = performance.now();

            function tick(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = eased * targetNum;
              el.textContent =
                prefix +
                (isFloat ? current.toFixed(1) : Math.floor(current)) +
                suffix;
              if (progress < 1) requestAnimationFrame(tick);
            }

            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, deps);
};

export default useCounter;
