import React, { useRef, useEffect, useState } from 'react';

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 10, // Lowered for better performance
  particleDistances = [80, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3],
  initialActiveIndex = 0
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);
  const isUserInteractingRef = useRef(false);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty('--time', `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove('active');
      setTimeout(() => {
        const particle = document.createElement('span');
        const point = document.createElement('span');
        particle.classList.add('particle');
        particle.style.setProperty('--start-x', `${p.start[0]}px`);
        particle.style.setProperty('--start-y', `${p.start[1]}px`);
        particle.style.setProperty('--end-x', `${p.end[0]}px`);
        particle.style.setProperty('--end-y', `${p.end[1]}px`);
        particle.style.setProperty('--time', `${p.time}ms`);
        particle.style.setProperty('--scale', `${p.scale}`);
        particle.style.setProperty('--color', `var(--color-${p.color}, white)`);
        particle.style.setProperty('--rotate', `${p.rotate}deg`);
        point.classList.add('point');
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add('active');
        });
        setTimeout(() => {
          try { element.removeChild(particle); } catch {}
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    const liEl = e.currentTarget.parentElement;
    if (!liEl || activeIndex === index) return;
    isUserInteractingRef.current = true;
    setActiveIndex(index);
    updateEffectPosition(liEl);
    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll('.particle');
      particles.forEach(p => filterRef.current!.removeChild(p));
      makeParticles(filterRef.current);
    }
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
    setTimeout(() => {
      isUserInteractingRef.current = false;
    }, 1000);
  };

  const handleScroll = () => {
    if (isUserInteractingRef.current) return;

    const sections = items.map(item => {
      const id = item.href.replace('#', '');
      return document.getElementById(id);
    }).filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    let currentIndex = activeIndex;
    const scrollPosition = window.scrollY + 200;
    const pageHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const isNearBottom = scrollPosition >= pageHeight - windowHeight - 100;

    // If near bottom and last item is contact, set to contact
    if (isNearBottom && items[items.length - 1].href === '#contact') {
      currentIndex = items.length - 1;
    } else {
      // Otherwise, find which section we're in
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentIndex = i;
          break;
        }
      }
    }

    if (currentIndex !== activeIndex) {
      setActiveIndex(currentIndex);
      const liEl = navRef.current?.querySelectorAll('li')[currentIndex] as HTMLElement;
      if (liEl) {
        updateEffectPosition(liEl);
        if (filterRef.current) {
          const particles = filterRef.current.querySelectorAll('.particle');
          particles.forEach(p => filterRef.current!.removeChild(p));
          makeParticles(filterRef.current);
        }
        if (textRef.current) {
          textRef.current.classList.remove('active');
          void textRef.current.offsetWidth;
          textRef.current.classList.add('active');
        }
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add('active');
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement;
      if (currentActiveLi) updateEffectPosition(currentActiveLi);
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, items]);

  return (
    <>
      <style>
        {`
          :root {
            --color-1: var(--primary);
            --color-2: #ffffff;
            --color-3: var(--accent);
          }
          .effect {
            position: absolute;
            opacity: 1;
            pointer-events: none;
            display: grid;
            place-items: center;
            z-index: 1;
          }
          .effect.text {
            color: white;
            transition: color 0.3s ease;
          }
          .effect.text.active {
            color: black;
          }
          /* FIX: Removing the black background that caused the box artifact */
          .effect.filter {
            filter: blur(4px) contrast(15);
            mix-blend-mode: screen; 
          }
          .effect.filter::after {
            content: "";
            position: absolute;
            inset: 0;
            background: white;
            transform: scale(0);
            opacity: 0;
            z-index: -1;
            border-radius: 9999px;
          }
          .effect.active::after {
            animation: pill 0.3s ease both;
          }
          @keyframes pill {
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .particle, .point {
            display: block;
            width: 16px;
            height: 16px;
            border-radius: 9999px;
          }
          .particle {
            position: absolute;
            top: 50%;
            left: 50%;
            animation: particle var(--time) ease 1;
          }
          .point {
            background: var(--color);
            animation: point var(--time) ease 1;
          }
          @keyframes particle {
            0% { transform: translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; }
            100% { transform: translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 0; }
          }
          @keyframes point {
            0% { transform: scale(0); }
            50% { transform: scale(var(--scale)); }
            100% { transform: scale(0); }
          }
          li.active { color: black; z-index: 2; }
          li::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: white;
            opacity: 0;
            transform: scale(0);
            transition: all 0.3s ease;
            z-index: -1;
          }
          li.active::after { opacity: 1; transform: scale(1); }
        `}
      </style>
      <div className="relative" ref={containerRef}>
        <nav className="flex relative">
          <ul ref={navRef} className="flex gap-4 list-none p-0 m-0 relative z-3">
            {items.map((item, index) => (
              <li key={index} className={`relative cursor-pointer transition-all duration-300 ${activeIndex === index ? 'active' : ''}`}>
                <a href={item.href} onClick={e => handleClick(e, index)} className="outline-none py-2 px-4 inline-block text-sm font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

export default GooeyNav;
