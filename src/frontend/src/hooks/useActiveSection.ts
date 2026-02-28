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
 * Tracks which section is currently active based on scroll position.
 *
 * Strategy: a section becomes active as soon as its title enters the
 * lower 80% of the viewport (i.e. when it crosses 20% from the top).
 * We find the section whose top edge is closest to -- but still within
 * -- the zone between 20% and the viewport bottom.
 *
 * Bottom-of-page fallback: when the user is in the last 30% of total
 * page height, the last visible section always wins so that Education
 * and Contact reliably activate.
 *
 * Returns the id of the active section (without the "#" prefix).
 */
export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("about");
  const rafId = useRef<number>(0);

  useEffect(() => {
    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const update = () => {
      const vh = window.innerHeight;
      // The detection threshold: 20% from the top of the viewport.
      // A section becomes active when its top edge crosses this line.
      const detectionLine = vh * 0.2;

      // Bottom-of-page fallback: if the user has scrolled to the very bottom
      // (within 20px of the page end), always select "contact" since it is the
      // last section and may never reach the normal detection line.
      const scrollBottom = window.scrollY + vh;
      const pageHeight = document.body.scrollHeight;
      const isAtBottom = scrollBottom >= pageHeight - 20;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Secondary fallback: last 15% of the page -- find the last section
      // whose top has scrolled above 20% from the top.
      const isNearBottom = scrollBottom > pageHeight * 0.85;

      if (isNearBottom) {
        let active = sectionElements[0].id;
        for (const el of sectionElements) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= vh * 0.2) {
            active = el.id;
          }
        }
        setActiveSection(active);
        return;
      }

      // Normal mode: find the section whose top edge is inside the lower
      // 20% zone (between detectionLine and the viewport bottom). Among
      // multiple candidates, prefer the one closest to the detection line
      // (i.e. the highest / first-entered). If no section is in the zone,
      // fall back to the last section that has scrolled above the detection
      // line (already in view above that threshold).
      let inZoneCandidate: string | null = null;
      let inZoneDist = Number.POSITIVE_INFINITY;
      let aboveLineCandidate = sectionElements[0].id;

      for (const el of sectionElements) {
        const rect = el.getBoundingClientRect();

        if (rect.top >= detectionLine && rect.top <= vh) {
          // Section title is inside the lower 80% zone
          const dist = rect.top - detectionLine;
          if (dist < inZoneDist) {
            inZoneDist = dist;
            inZoneCandidate = el.id;
          }
        } else if (rect.top < detectionLine) {
          // Section title has already scrolled above the detection line
          aboveLineCandidate = el.id;
        }
      }

      setActiveSection(inZoneCandidate ?? aboveLineCandidate);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    // Run once on mount so initial state is correct
    update();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return activeSection;
}
