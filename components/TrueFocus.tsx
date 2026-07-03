import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface TrueFocusProps {
  sentence?: string;
  separator?: string;
  borderColor?: string;
  glowColor?: string;
}

interface FocusRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = 'True Focus',
  separator = ' ',
  borderColor = 'rgba(34,197,94,0.9)',
  glowColor = 'rgba(34,197,94,0.25)'
}) => {
  const words = sentence.split(separator);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: -100, y: -100, width: 16, height: 16 });
  const [hasCursorMoved, setHasCursorMoved] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const [activeTouchTarget, setActiveTouchTarget] = useState<HTMLElement | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIsMobile(false);
      return;
    }

    const supportsTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0 ||
        window.matchMedia('(hover: none), (pointer: coarse)').matches
      );
    };

    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateIsMobile = () => {
      const mobile = supportsTouch();
      setIsMobile(mobile);
    };

    updateIsMobile();
    mediaQuery.addEventListener('change', updateIsMobile);

    const handleTouchStart = () => {
      setIsMobile(true);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', updateIsMobile);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    if (isMobile !== false) {
      return;
    }

    const styleTag = document.createElement('style');
    styleTag.id = 'true-focus-cursor-style';
    styleTag.textContent = `
      body, body * {
        cursor: none !important;
      }

      input, textarea, select, [contenteditable="true"] {
        cursor: text !important;
      }
    `;
    document.head.appendChild(styleTag);

    const updatePointer = (x: number, y: number) => {
      setHasCursorMoved(true);
      if (!activeElementRef.current) {
        setFocusRect({ x: x - 12, y: y - 12, width: 24, height: 24 });
      }
    };

    const updateHoverRect = (element: HTMLElement | null) => {
      if (element) {
        activeElementRef.current = element;
        setIsButtonHover(true);
        const rect = element.getBoundingClientRect();
        setFocusRect({ x: rect.left - 10, y: rect.top - 10, width: rect.width + 20, height: rect.height + 20 });
      } else {
        activeElementRef.current = null;
        setIsButtonHover(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('button, [role="button"], a[href]') as HTMLElement | null;
      if (target) {
        updateHoverRect(target);
      } else {
        const current = activeElementRef.current;
        if (current && !current.contains(event.relatedTarget as Node | null)) {
          updateHoverRect(null);
        }
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      if (!relatedTarget || !relatedTarget.closest('button, [role="button"], a[href]')) {
        updateHoverRect(null);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      styleTag.remove();
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile !== true) {
      return;
    }

    const interactiveSelector = 'button, [role="button"], a[href], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])';
    const getInteractiveTarget = (target: HTMLElement | null) =>
      target?.closest(interactiveSelector) as HTMLElement | null;

    const updateHoverRect = (element: HTMLElement | null) => {
      if (element) {
        setActiveTouchTarget(element);
        setIsButtonHover(true);
        const rect = element.getBoundingClientRect();
        setFocusRect({ x: rect.left - 10, y: rect.top - 10, width: rect.width + 20, height: rect.height + 20 });
      } else {
        setActiveTouchTarget(null);
        setIsButtonHover(false);
      }
    };

    const getTouchTarget = (x: number, y: number) => {
      const element = document.elementFromPoint(x, y) as HTMLElement | null;
      return getInteractiveTarget(element);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') {
        return;
      }

      const target = getTouchTarget(event.clientX, event.clientY);
      updateHoverRect(target);
    };

    // Some mobile browsers don't provide PointerEvents; use touchstart to set
    // the active touch target immediately and touchend/touchcancel to clear when needed.
    const handleTouchStartSet = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const target = touch ? getTouchTarget(touch.clientX, touch.clientY) : null;
      updateHoverRect(target);
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const target = touch ? getTouchTarget(touch.clientX, touch.clientY) : null;
      if (!target) {
        updateHoverRect(null);
      }
    };

    const handleTouchCancel = () => {
      updateHoverRect(null);
    };

    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('touchstart', handleTouchStartSet, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('touchstart', handleTouchStartSet);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!activeTouchTarget) {
      return;
    }

    // Keep the focus rect in sync while the touched element exists.
    let rafId: number | null = null;

    const updateWhileAlive = () => {
      if (!activeTouchTarget || !document.contains(activeTouchTarget) || activeTouchTarget.getClientRects().length === 0) {
        setActiveTouchTarget(null);
        setIsButtonHover(false);
        return;
      }

      const rect = activeTouchTarget.getBoundingClientRect();
      setFocusRect({ x: rect.left - 10, y: rect.top - 10, width: rect.width + 20, height: rect.height + 20 });
      rafId = requestAnimationFrame(updateWhileAlive);
    };

    const observer = new MutationObserver(() => {
      if (!activeTouchTarget || !document.contains(activeTouchTarget) || activeTouchTarget.getClientRects().length === 0) {
        if (rafId) cancelAnimationFrame(rafId);
        setActiveTouchTarget(null);
        setIsButtonHover(false);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // Also update on scroll/resize for better responsiveness during layout changes
    const onScrollOrResize = () => {
      if (activeTouchTarget && document.contains(activeTouchTarget)) {
        const rect = activeTouchTarget.getBoundingClientRect();
        setFocusRect({ x: rect.left - 10, y: rect.top - 10, width: rect.width + 20, height: rect.height + 20 });
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    // start RAF tracking
    updateWhileAlive();

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [activeTouchTarget]);

  useEffect(() => {
    if (isMobile !== true || !activeTouchTarget) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest('button, [role="button"], a[href]') as HTMLElement | null;
      if (!target || target !== activeTouchTarget) {
        setActiveTouchTarget(null);
        setIsButtonHover(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMobile, activeTouchTarget]);

  const overlay = (
    <motion.div
      className="pointer-events-none"
      animate={{
        x: focusRect.x,
        y: focusRect.y,
        width: focusRect.width,
        height: focusRect.height,
        opacity: isMobile === false ? (hasCursorMoved ? 1 : 0) : isButtonHover ? 1 : 0
      }}
      transition={{ duration: 0.02, ease: 'linear' }}
      style={
        {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2147483647,
          background: 'transparent'
        } as React.CSSProperties
      }
    >
      <div className="relative w-full h-full pointer-events-none">
        <span
          className="absolute block"
          style={{
            width: 12,
            height: 2,
            background: borderColor,
            top: 0,
            left: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 2,
            height: 12,
            background: borderColor,
            top: 0,
            left: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 12,
            height: 2,
            background: borderColor,
            top: 0,
            right: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 2,
            height: 12,
            background: borderColor,
            top: 0,
            right: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 12,
            height: 2,
            background: borderColor,
            bottom: 0,
            left: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 2,
            height: 12,
            background: borderColor,
            bottom: 0,
            left: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 12,
            height: 2,
            background: borderColor,
            bottom: 0,
            right: 0
          }}
        />
        <span
          className="absolute block"
          style={{
            width: 2,
            height: 12,
            background: borderColor,
            bottom: 0,
            right: 0
          }}
        />
      </div>
    </motion.div>
  );

  return (
    <>
      <div className="relative flex gap-4 justify-center items-center flex-wrap" style={{ userSelect: 'none' }}>
        {words.map((word, index) => (
          <span key={index} className="text-[3rem] font-black select-none">
            {word}
          </span>
        ))}
      </div>
      {mounted && isMobile === false ? createPortal(overlay, document.body) : null}
    </>
  );
};

export default TrueFocus;
