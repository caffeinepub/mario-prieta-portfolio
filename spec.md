# Mario Prieta Portfolio

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Single-page personal portfolio / interactive resume for Mario Prieta
- Smooth scroll navigation with anchor links
- Hero section: name, subtitle, tagline, social icon links (LinkedIn, GitHub, Email)
- About section: short bio paragraph, "Built with Caffeine.ai" badge
- Experience section: vertical timeline (dot + line) with three job entries, bullet-point highlights
- Projects section: 2-column card grid with title, description, tech tag pills, optional GitHub link icon
- Skills section: grouped by category, each skill as a pill/tag
- Education section: degree, institution, year, distinctions, certifications
- Contact section: centered items, location line, large CTA email button
- Footer: copyright and "Built with Caffeine.ai" line
- Scroll-triggered fade-in animations (Intersection Observer, subtle)
- Responsive layout (desktop-first, mobile secondary)

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: minimal Motoko canister (static portfolio, no dynamic data needed -- backend required by platform)
2. Frontend: single App.tsx with all sections, Inter font via Google Fonts, custom CSS variables for color tokens (#FAFAFA, #1A1A1A, #0D9488), max-width 1100px container
3. Navigation: fixed top nav with anchor links to each section, smooth scroll via CSS
4. Timeline: CSS-only vertical line + dot markers, left-aligned
5. Project cards: CSS Grid 2-col desktop / 1-col mobile, tech pills, external link icon
6. Skills: grouped rows with category label, pill tags with teal hover
7. Animations: useIntersectionObserver hook for fade-in-up on scroll
8. Footer: centered copyright and Caffeine.ai credit
