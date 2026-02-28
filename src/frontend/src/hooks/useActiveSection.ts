import { useEffect, useState } from "react";

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
 * Returns the id of the active section (without the "#" prefix).
 */
export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const sectionElements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-60px 0px -40% 0px",
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
