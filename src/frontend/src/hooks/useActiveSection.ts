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
 *
 * Special case: when the user is in the bottom 30% of the page
 * (window.scrollY + window.innerHeight > document.body.scrollHeight * 0.7),
 * the most-visible section in the viewport becomes active regardless of
 * the center-line rule. This ensures short sections like Education and
 * Contact always highlight at the bottom of the page.
 *
 * Returns the id of the active section (without the "#" prefix).
 */
export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("about");
  // Track all currently-intersecting section ids (center-zone observer)
  const intersectingIds = useRef<Set<string>>(new Set(["about"]));

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

    /**
     * Find the section with the most pixels currently visible in the
     * viewport. Used when near the bottom of the page.
     */
    const pickMostVisible = () => {
      let bestId = "";
      let bestVisible = 0;

      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(window.innerHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          bestId = el.id;
        }
      }

      if (bestId) {
        setActiveSection(bestId);
      }
    };

    /**
     * Check if we are in the bottom 30% of the page.
     * If so, override the center-zone detection with most-visible logic.
     */
    const handleScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight > document.body.scrollHeight * 0.7;
      if (nearBottom) {
        pickMostVisible();
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
        // Only apply center-zone pick when NOT near the bottom
        const nearBottom =
          window.scrollY + window.innerHeight >
          document.body.scrollHeight * 0.7;
        if (!nearBottom) {
          pickClosest();
        }
      },
      {
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
      },
    );

    for (const el of sectionElements) {
      observer.observe(el);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return activeSection;
}
