import { useEffect, useRef, useState } from "react";

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
];

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Uses rootMargin "-50% 0px -50% 0px" so a section only becomes active
 * when it crosses the vertical center of the viewport.
 * If multiple sections overlap the center zone, the one whose center is
 * closest to the viewport center wins.
 * Returns the id of the active section (without the "#" prefix).
 */
export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("hero");
  // Track all currently-intersecting section ids
  const intersectingIds = useRef<Set<string>>(new Set(["hero"]));

  useEffect(() => {
    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    /**
     * Among all currently-intersecting sections, pick the one whose
     * vertical center is closest to the viewport vertical center.
     */
    const pickClosest = () => {
      const viewportCenter = window.innerHeight / 2;
      let bestId = "";
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const id of intersectingIds.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestId = id;
        }
      }

      if (bestId) {
        setActiveSection(bestId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingIds.current.add(entry.target.id);
          } else {
            intersectingIds.current.delete(entry.target.id);
          }
        }
        pickClosest();
      },
      {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
