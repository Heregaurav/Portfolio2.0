import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    };

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    };

    const onEnterButton = () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.background = 'var(--neon-purple)';
      cursor.style.boxShadow = '0 0 15px var(--neon-purple), 0 0 30px var(--neon-purple)';
      trail.style.width = '50px';
      trail.style.height = '50px';
      trail.style.borderColor = 'var(--neon-purple)';
    };

    const onLeaveButton = () => {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.background = 'var(--neon-blue)';
      cursor.style.boxShadow = '0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue)';
      trail.style.width = '30px';
      trail.style.height = '30px';
      trail.style.borderColor = 'var(--neon-blue)';
    };

    window.addEventListener('mousemove', moveCursor);
    animateTrail();

    document.querySelectorAll('button, a, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnterButton);
      el.addEventListener('mouseleave', onLeaveButton);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll('button, a, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnterButton);
        el.removeEventListener('mouseleave', onLeaveButton);
        el.addEventListener('mouseenter', onEnterButton);
        el.addEventListener('mouseleave', onLeaveButton);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}
