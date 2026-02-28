import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollFade } from "./hooks/useScrollFade";

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const EXPERIENCE = [
  {
    role: "Founding Engineer",
    company: "Supahost AI",
    period: "Sep 2024 – Present",
    location: "San Francisco, CA",
    bullets: [
      "End-to-end ownership of an offline-first React Native app that helped secure $250k in pre-seed funding",
      "Optimized UX and performance, reducing data load times by 96%",
      "Built Node.js/TypeScript API services with PostgreSQL and real-time sync",
      "Integrated monitoring and product analytics with Sentry and PostHog",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "BISITE Research Group",
    period: "Oct 2023 – Sep 2025",
    location: "University of Salamanca",
    bullets: [
      "Built responsive UIs with React and Vue.js for clients including Telefonica and Iberdrola",
      "Delivered REST and GraphQL APIs with Node.js/TypeScript and Python/FastAPI",
      "Implemented end-to-end testing with Playwright, Jest, and Unittest",
    ],
  },
  {
    role: "Trainee Full-Stack Developer",
    company: "Air Institute",
    period: "Feb 2023 – Oct 2023",
    location: "Salamanca, Spain",
    bullets: [
      "Shipped production web apps with Vue.js and Node.js/TypeScript",
      "Worked in Agile sprints with CI/CD pipelines",
    ],
  },
];

const PROJECTS = [
  {
    title: "Supahost AI",
    desc: "AI-powered hospitality operations platform. Offline-first React Native app with real-time sync.",
    tags: ["React Native", "TypeScript", "PostgreSQL", "Python"],
    link: "https://app.supahost.ai/",
  },
  {
    title: "QuakeSense",
    desc: "1st Place, NASA Space Apps Challenge. Seismic event detection with 97% ML precision.",
    tags: ["Vue.js", "Python", "Three.js", "Docker"],
    link: "https://github.com/mariops03/QuakeSense",
  },
  {
    title: "DiverEdu",
    desc: "1st Place, Hack4EDU (Telefonica). Educational platform for neurodivergent students.",
    tags: ["Vue.js", "Pinia", "Python", "Flask"],
    link: "https://github.com/mariops03/Hack4Edu2024-DiverEdu",
  },
  {
    title: "NearBuy",
    desc: "1st Place, Gen AI Hackathon (IBM). Platform supporting local farmers through smart commerce.",
    tags: ["Vue.js", "Node.js", "TypeScript"],
    link: null,
  },
  {
    title: "GlobalTrends",
    desc: "Jury Mention, AI Agents Hackathon (Maisa & EF). Content creator tool with sentiment analysis and AI-powered file processing.",
    tags: ["Vue.js", "Node.js", "TypeScript"],
    link: null,
  },
  {
    title: "HP-Enjoyers",
    desc: "1st Place, Hack your future (HP). Educational phishing simulation with credential capture.",
    tags: ["Vue.js", "Python", "Flask", "Docker"],
    link: null,
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: [
      "React",
      "TypeScript",
      "Next.js",
      "JavaScript",
      "Vue.js",
      "Redux",
      "TailwindCSS",
      "Playwright",
    ],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "Reanimated", "FlashList"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Deno", "Python (FastAPI)", "Jest"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Supabase", "MongoDB"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "Docker",
      "GitHub Actions",
      "Sentry",
      "PostHog",
      "LangChain",
      "Vercel",
    ],
  },
];

// ─── Gradient Mesh Background ─────────────────────────────────────────────────

function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Top-left teal blob */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "#F0FDFA",
          filter: "blur(220px)",
          opacity: 0.12,
        }}
      />
      {/* Bottom-right lavender blob */}
      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "580px",
          height: "580px",
          borderRadius: "50%",
          background: "#F5F3FF",
          filter: "blur(240px)",
          opacity: 0.13,
        }}
      />
      {/* Center-right warm blob */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "#F0FDFA",
          filter: "blur(200px)",
          opacity: 0.1,
        }}
      />
      {/* Mid-left lavender accent */}
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "-80px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#F5F3FF",
          filter: "blur(210px)",
          opacity: 0.1,
        }}
      />
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Nav() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = NAV_LINKS.map((l) => l.href.slice(1));
  const dotPositions = sections.map((_, i) => i / (sections.length - 1));

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="nav-wrapper">
      {/* Desktop: scroll progress timeline */}
      <div className="nav-progress-container">
        <nav className="nav-labels" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-label-item${activeSection === link.href.slice(1) ? " active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-line-row">
          <div className="nav-line-track" />
          <div
            className="nav-line-fill"
            style={{
              transform: `translateY(-50%) scaleX(${scrollProgress})`,
            }}
          />
          {dotPositions.map((pos, i) => (
            <div
              key={sections[i]}
              className={`nav-dot${scrollProgress >= pos - 0.01 ? " reached" : ""}`}
              style={{ left: `${pos * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Mobile bar */}
      <div className="nav-mobile-bar">
        <button
          type="button"
          className="nav-hamburger"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <nav
        className={`mobile-nav${mobileOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={activeSection === link.href.slice(1) ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(link.href);
              setMobileOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".fade-in-up");
    targets.forEach((target, i) => {
      setTimeout(
        () => {
          target.classList.add("visible");
        },
        80 + i * 100,
      );
    });
  }, []);

  return (
    <div ref={ref}>
      <section className="hero-section" id="hero" aria-label="Hero">
        <div className="portfolio-container hero-content">
          <span className="hero-subtitle fade-in-up">Frontend Engineer</span>
          <h1 className="hero-name fade-in-up delay-1">Mario Prieta</h1>
          <p className="hero-tagline fade-in-up delay-2">
            Building products from zero to production, with frontend at the
            heart.
          </p>
          <ul className="hero-icons fade-in-up delay-3">
            <li>
              <a
                href="https://linkedin.com/in/marioprieta"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-link"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} strokeWidth={1.8} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mariops03"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-icon-link"
                aria-label="GitHub profile"
              >
                <Github size={18} strokeWidth={1.8} />
              </a>
            </li>
            <li>
              <a
                href="mailto:marioprieta@gmail.com"
                className="hero-icon-link"
                aria-label="Send email"
              >
                <Mail size={18} strokeWidth={1.8} />
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function AboutSection() {
  const ref = useScrollFade<HTMLElement>();
  return (
    <section ref={ref} id="about" className="section" aria-label="About">
      <div className="portfolio-container">
        <span className="section-label fade-in-up">About</span>
        <h2 className="section-title fade-in-up delay-1">Who I am</h2>
        <p className="about-text fade-in-up delay-2">
          I am a frontend-focused software engineer who has spent the last three
          years taking full technical ownership of products. From React and
          React Native apps to TypeScript APIs and AI agents, I care most about
          what the user actually sees and feels. I built this portfolio with
          Caffeine.ai, so if anything looks off, I guess that is my feedback for
          the team.
        </p>
        <span className="caffeine-badge fade-in-up delay-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
          Built with Caffeine.ai
        </span>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const ref = useScrollFade<HTMLElement>();
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = svgRef.current;
    if (!path) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            path.classList.add("animated");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="experience"
      className="section"
      aria-label="Experience"
    >
      <div className="portfolio-container">
        <span className="section-label fade-in-up">Career</span>
        <h2 className="section-title fade-in-up delay-1">Experience</h2>
        <div className="experience-grid">
          {/* SVG connector — decorative S-curve connecting the cards */}
          <svg
            className="experience-svg-connector"
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "visible",
            }}
          >
            <path
              ref={svgRef}
              className="connector-path"
              d="M 29 28 C 29 45, 71 45, 71 55 S 71 72, 29 82"
            />
          </svg>

          {/* Left column: entry 0 (Founding Engineer) and entry 2 (Air Institute) */}
          <div className="experience-col-left">
            <article
              className="exp-card fade-in-up"
              style={{ marginBottom: 48 }}
            >
              <h3 className="exp-role">{EXPERIENCE[0].role}</h3>
              <div className="exp-company">{EXPERIENCE[0].company}</div>
              <div className="exp-meta">
                <span className="exp-period">{EXPERIENCE[0].period}</span>
                <span className="exp-location">{EXPERIENCE[0].location}</span>
              </div>
              <ul className="exp-bullets">
                {EXPERIENCE[0].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>

            <article className="exp-card fade-in-up delay-2">
              <h3 className="exp-role">{EXPERIENCE[2].role}</h3>
              <div className="exp-company">{EXPERIENCE[2].company}</div>
              <div className="exp-meta">
                <span className="exp-period">{EXPERIENCE[2].period}</span>
                <span className="exp-location">{EXPERIENCE[2].location}</span>
              </div>
              <ul className="exp-bullets">
                {EXPERIENCE[2].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </div>

          {/* Right column: entry 1 (BISITE) */}
          <div className="experience-col-right">
            <article className="exp-card fade-in-up delay-1">
              <h3 className="exp-role">{EXPERIENCE[1].role}</h3>
              <div className="exp-company">{EXPERIENCE[1].company}</div>
              <div className="exp-meta">
                <span className="exp-period">{EXPERIENCE[1].period}</span>
                <span className="exp-location">{EXPERIENCE[1].location}</span>
              </div>
              <ul className="exp-bullets">
                {EXPERIENCE[1].bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion.current) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transition = "box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1)";
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition =
      "transform 300ms cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 300ms cubic-bezier(0.25, 0.1, 0.25, 1)";
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={cardRef}
      className="project-card fade-in-up"
      style={{ transitionDelay: `${index * 60}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
        {project.link && (
          <a
            href={
              project.link.startsWith("http")
                ? project.link
                : `https://${project.link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="project-arrow-icon"
            aria-label={`Visit ${project.title}`}
          >
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        )}
      </div>
      <p className="project-desc">{project.desc}</p>
      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function ProjectsSection() {
  const ref = useScrollFade<HTMLElement>();
  return (
    <section
      ref={ref}
      id="projects"
      className="section"
      aria-label="Projects and Hackathons"
    >
      <div className="portfolio-container">
        <span className="section-label fade-in-up">Work</span>
        <h2 className="section-title fade-in-up delay-1">
          Projects &amp; Hackathons
        </h2>
        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useScrollFade<HTMLElement>();
  return (
    <section ref={ref} id="skills" className="section" aria-label="Skills">
      <div className="portfolio-container">
        <span className="section-label fade-in-up">Expertise</span>
        <h2 className="section-title fade-in-up delay-1">Skills</h2>
        <div className="skills-table">
          {SKILLS.map((group, groupIndex) => (
            <div
              key={group.category}
              className="skill-row fade-in-up"
              style={{ transitionDelay: `${groupIndex * 80}ms` }}
            >
              <span className="skill-category" aria-label={group.category}>
                {group.category}
              </span>
              <ul className="skill-pills">
                {group.items.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="skill-pill fade-in-up"
                    style={{
                      transitionDelay: `${groupIndex * 80 + itemIndex * 50}ms`,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  const ref = useScrollFade<HTMLElement>();
  return (
    <section
      ref={ref}
      id="education"
      className="section"
      aria-label="Education"
    >
      <div className="portfolio-container">
        <span className="section-label fade-in-up">Academic</span>
        <h2 className="section-title fade-in-up delay-1">Education</h2>
        <div className="education-block fade-in-up delay-2">
          <h3 className="education-degree">
            Bachelor&apos;s in Computer Science
          </h3>
          <div className="education-institution">University of Salamanca</div>
          <div className="education-years">2021 – 2025</div>
          <div className="education-notes">
            <p>
              9 distinctions, 2 highest honors in Advanced Programming and
              Operating Systems
            </p>
            <p>
              Certifications: Machine Learning, Neural Networks, Generative AI,
              Python
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useScrollFade<HTMLElement>();
  return (
    <section
      ref={ref}
      id="contact"
      className="section contact-section"
      aria-label="Contact"
    >
      <div className="portfolio-container">
        <span className="section-label fade-in-up" style={{ display: "block" }}>
          Contact
        </span>
        <h2 className="section-title fade-in-up delay-1">Let&apos;s connect</h2>
        <div className="contact-items fade-in-up delay-2">
          <a
            href="mailto:marioprieta@gmail.com"
            className="contact-item"
            aria-label="Send email to Mario"
          >
            <Mail size={16} strokeWidth={1.8} aria-hidden="true" />
            marioprieta@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/marioprieta"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={16} strokeWidth={1.8} aria-hidden="true" />
            linkedin.com/in/marioprieta
          </a>
          <a
            href="https://github.com/mariops03"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
            aria-label="GitHub profile"
          >
            <Github size={16} strokeWidth={1.8} aria-hidden="true" />
            github.com/mariops03
          </a>
        </div>
        <p className="contact-tagline fade-in-up delay-3">
          Currently open to new opportunities
        </p>
        <a
          href="mailto:marioprieta@gmail.com"
          className="cta-button fade-in-up delay-4"
        >
          Get in touch
          <Mail size={15} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="site-footer">
      <div className="portfolio-container">
        <p className="footer-copy">© {year} Mario Prieta</p>
        <p className="footer-built">
          Built with love using{" "}
          <a href={caffeineUrl} target="_blank" rel="noopener noreferrer">
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen">
      <GradientMesh />
      <Nav />
      <main>
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <EducationSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
