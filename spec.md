# Mario Prieta Portfolio

## Current State

Single-page portfolio built in React + TypeScript with Tailwind CSS + custom CSS in `/src/frontend/index.css`. The app has these components:

- `GradientMesh` – four fixed blurred blobs (teal/lavender), low opacity
- `Nav` – sticky, transparent-background, centered links with an active underline indicator; mobile hamburger
- `HeroSection` – name, subtitle, tagline, three social icon links; no entrance animation
- `AboutSection` – 3-sentence bio paragraph + Caffeine badge; currently mentions "looking for my next role in Zurich" (must change)
- `ExperienceSection` – vertical center-line timeline with three entries
- `ProjectsSection` – 2-column card grid (5 cards); basic hover lift
- `SkillsSection` – category label + pill row per group
- `EducationSection` – left teal border block
- `ContactSection` – centered links + CTA button; currently says "Open to opportunities in Zurich, Switzerland" (must change)
- `Footer` – copyright + Caffeine link

CSS: `index.css` with OKLCH design tokens, Inter/General Sans body font, `fade-in-up` scroll animation system (400ms ease-out), navbar styles.
`index.html`: meta descriptions still mention "Zurich" (must be updated).

## Requested Changes (Diff)

### Add

**Typography system:**
- Load "Instrument Serif" from Google Fonts (for headlines)
- Load "JetBrains Mono" from Google Fonts (for mono accents: dates, tags, period labels)
- Body font is already "General Sans" via local font-face — keep it, just ensure it takes effect
- Apply `font-family: 'Instrument Serif', serif` to: `.hero-name`, `.section-title`, all `h2` heading-level elements
- Apply `font-family: 'JetBrains Mono', monospace` to: `.timeline-period`, `.timeline-location`, date/period spans, `.project-tag`, `.skill-pill`, `.education-years`
- `font-variant-numeric: tabular-nums` on all elements using JetBrains Mono
- `text-wrap: balance` on all headings (h1, h2, h3, .hero-name, .section-title)
- Hero name: `font-size: clamp(2.5rem, 5vw, 4.5rem)` — wait, current is larger (clamp(48px,7.5vw,80px)), keep the larger size as-is since the request says "Large sizes" — use `clamp(2.5rem, 5vw, 4.5rem)` only if it would be smaller; actually the spec says use that clamp so use it exactly.

**Navbar – Scroll Progress Timeline (full rebuild):**
- Remove current underline-per-link active state
- New layout: full-width sticky bar with NO background color (transparent); `backdrop-filter: blur(8px)` remains
- A single horizontal line (1.5px, `#E5E7EB`) spans 100% width at the bottom of the navbar
- Section labels sit ABOVE the line, in a row, evenly spaced
- A teal fill line overlays the gray line, starting at 0 and expanding right proportional to total page scroll progress (`scaleX` from `transform-origin: left`)
- At the position of each section on the line, place a 6px dot; dots are gray by default, turn teal as progress reaches them
- Active section label: teal color + `font-weight: 600`
- Progress/dot transitions: `150ms cubic-bezier(0.25, 0.1, 0.25, 1)` — use only `transform` and `opacity`
- On nav link click: smooth scroll to section; each section gets `scroll-margin-top: 80px`
- Mobile: keep hamburger menu approach (progress timeline collapses on mobile)

**Experience – Staggered Zigzag Layout:**
- Remove the vertical center timeline entirely (`.timeline`, `.timeline-dot`, `::before`)
- New layout: CSS Grid with two columns (~58% left / ~42% right)
- Card 1 (Founding Engineer, Supahost AI) → left column
- Card 2 (Full-Stack Dev, BISITE) → right column, slightly lower (margin-top offset)
- Card 3 (Trainee Full-Stack, Air Institute) → left column
- Each card: `border-left: 3px solid #0D9488`, `border-radius: 12px`, `padding: 24px`, subtle white/near-white background
- Hover: `translateY(-4px)` + box-shadow; animate ONLY `transform` and `box-shadow`
- SVG curved path connecting the three cards in flow order; dashed `#E5E7EB` by default; animates to solid teal via `stroke-dashoffset` as user scrolls past (IntersectionObserver driven)

**Projects – Updated Cards + 6 Cards + 3D Tilt:**
- Update data: 6 cards in exact order specified (add GlobalTrends, update NearBuy desc, update HP-Enjoyers, update Supahost link)
- Grid: 3 columns desktop (>1024px), 2 tablet, 1 mobile
- 3D perspective tilt: mouse position drives `rotateX`/`rotateY` (max ±4deg) via `perspective(800px)`; NO transition on mousemove, 300ms ease-out on mouseleave
- On hover: tech tag pills animate from `opacity: 0; translateY(8px)` → `opacity: 1; translateY(0)`, staggered 40ms each
- Cards WITH links: show `ArrowUpRight` icon (top-right corner) that rotates 45deg to `ArrowRight` or similar on hover
- Cards WITHOUT links: no arrow icon
- `prefers-reduced-motion`: disable tilt entirely

**Animations – Polish:**
- All transitions: `cubic-bezier(0.25, 0.1, 0.25, 1)` (replace all `ease-out`, `ease` in transitions)
- Entrance: 300ms duration (down from 400ms)
- Stagger between siblings: 60ms (down from 150ms/100ms/50ms where applicable)
- Animate ONLY `transform` and `opacity` in entrance animations
- Hero: NO entrance animation (already implemented; ensure it stays)
- `prefers-reduced-motion`: disable all entrance animations and 3D tilt

### Modify

**About text:** Replace current "I am currently looking for my next role in Zurich." with the new paragraph ending "I built this portfolio with Caffeine.ai, so if anything looks off, I guess that is my feedback for the team."

**Contact tagline:** Change "Open to opportunities in Zurich, Switzerland" → "Currently open to new opportunities"

**`index.html` meta descriptions:** Remove all "Zurich"/"Switzerland" references from description/og/twitter tags.

**Caffeine badge:** Update border color to teal (`#0D9488`) border, keep as subtle pill.

**`useScrollFade` hook:** Update transition timings to 300ms and `cubic-bezier(0.25, 0.1, 0.25, 1)`.

**`useActiveSection` hook:** Keep IntersectionObserver logic; also export scroll progress (0–1) for the navbar progress bar, or compute it inside the Nav component via `window.scrollY / (document.body.scrollHeight - window.innerHeight)`.

### Remove

- All mentions of "Zurich" or "Switzerland" from the entire codebase (App.tsx, index.html, any strings)
- Vertical timeline styles and DOM structure from ExperienceSection
- The old navbar active underline-per-link system (replace entirely)
- HP-Enjoyers old GitHub link (card 6 has no external link per spec)
- Old 5-card PROJECTS array (replace with 6-card array)

## Implementation Plan

1. **Update `index.html`** – Remove Zurich/Switzerland from all meta tags; add Google Fonts `<link>` preconnect + stylesheet for Instrument Serif and JetBrains Mono.

2. **Update `index.css`** – 
   - Add font-family CSS variables for serif and mono fonts
   - Apply `font-family: 'Instrument Serif', serif` to hero-name, section-title, h2 selectors
   - Apply `font-family: 'JetBrains Mono', monospace` + `font-variant-numeric: tabular-nums` to period/date/tag/pill selectors
   - Add `text-wrap: balance` to all headings
   - Replace all `ease-out` / `ease` in transitions with `cubic-bezier(0.25, 0.1, 0.25, 1)`
   - Change entrance animation duration to 300ms
   - Rebuild navbar CSS for the scroll-progress-timeline layout (remove old underline styles, add horizontal line + dots + fill)
   - Add experience zigzag grid CSS
   - Add SVG path animation keyframes
   - Update project grid to 3-col desktop
   - Add 3D tilt CSS (perspective container)
   - Add tag pill entrance animation on hover
   - Update stagger delays to 60ms increments
   - `prefers-reduced-motion` block: disable entrance animations and tilt
   - Update `.caffeine-badge` to have teal border

3. **Update `App.tsx`** –
   - Fix about text (remove Zurich reference, add Caffeine.ai mention)
   - Fix contact tagline text
   - Update PROJECTS array: 6 cards with correct data, links, no-link flags
   - Rebuild `Nav` component: compute scroll progress (0–1) via scroll event, calculate per-section dot positions, render progress line with scaleX, render dots, render labels above line; click handlers smooth-scroll to sections
   - Rebuild `ExperienceSection`: remove timeline DOM, use zigzag two-column grid with cards, add SVG path overlay
   - Rebuild `ProjectsSection`: add 3D tilt mouse handlers per card, add hover tag animation, conditional arrow icon
   - Ensure all sections have `scroll-margin-top: 80px`
   - Remove `<MapPin>` icon usage if no longer needed or keep for location display
   - Update `useScrollFade` calls to use 300ms/60ms timing

4. **Update `useActiveSection.ts`** – Keep as-is or adapt to also support the Nav's scroll-progress calculation (can be handled inline in Nav).

5. **Validate** – typecheck, lint, build.
