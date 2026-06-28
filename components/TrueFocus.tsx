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
  const [focusRect, setFocusRect] = useState<FocusRect>({ x: -100, y: -100, width: 16, height: 16 });
  const [hasCursorMoved, setHasCursorMoved] = useState(false);
  const [isButtonHover, setIsButtonHover] = useState(false);
  const activeElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
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
  }, []);

  const overlay = (
    <motion.div
      className="pointer-events-none"
      animate={{
        x: focusRect.x,
        y: focusRect.y,
        width: focusRect.width,
        height: focusRect.height,
        opacity: hasCursorMoved ? 1 : 0
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
      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
};

export default TrueFocus;
