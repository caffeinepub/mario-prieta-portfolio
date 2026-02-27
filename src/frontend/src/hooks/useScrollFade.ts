import { useEffect, useRef } from "react";

/**
 * Attaches fade-in-up IntersectionObserver to a container element.
 * All children with class "fade-in-up" will animate when they enter the viewport.
 */
export function useScrollFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(".fade-in-up");
    for (const target of targets) {
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

/**
 * Observe a single element ref for fade-in-up.
 */
export function useSingleScrollFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const el = ref.current;
    if (!el) return;

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}
