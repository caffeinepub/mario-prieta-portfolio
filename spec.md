# Mario Prieta Portfolio

## Current State

Single-page React portfolio with:
- Flat `#FAFAFA` background (`oklch(0.981 0 0)`)
- Nav with "MP" logo on left, links on right, no active state indicator
- Timeline with line/dot anchored to left edge (`padding-left: 36px`, `left: 6px`)
- Scroll fade-in animations using `useScrollFade` hook + `.fade-in-up` CSS class
- Fixed delays via `.delay-1` through `.delay-5` classes (not staggered per-item)
- `scroll-behavior: smooth` already set on `html`
- No per-section entrance animation (sections themselves don't animate, only children)
- Caffeine badge in About section has no special animation

## Requested Changes (Diff)

### Add
- **Gradient mesh background**: Fixed-position pseudo-element or layered divs with soft watercolor blobs: teal tint `#F0FDFA`, lavender `#F5F3FF`, off-white `#FAFAFA`. Very low opacity (10–15%), heavily blurred (200px+), `position: fixed`, `z-index: -1`.
- **Navbar active section indicator**: Teal underline/dot below the active nav link, smoothly transitioning (300ms ease) as active section changes. Active section detected via IntersectionObserver on sections.
- **Per-section entrance animation**: Each `<section>` itself fades in and slides up (translateY 20px → 0) on viewport entry, trigger once.
- **Timeline stagger**: Each `.timeline-entry` staggered 150ms apart when scrolling into view.
- **Project card stagger**: Each `.project-card` staggered 100ms apart.
- **Skill pill stagger**: Each `.skill-pill` staggered 50ms apart.
- **Caffeine badge pulse/glow animation**: On first appearance, badge pulses or glows once.

### Modify
- **Nav**: Remove `nav-logo` ("MP") element. Change `nav-inner` to center nav links horizontally (instead of `justify-content: space-between`). Keep hamburger for mobile.
- **Timeline centering**: Restructure `.timeline` to center the vertical line and dots relative to the section container width. Currently `left: 6px` / `padding-left: 36px` — needs to be genuinely centered (e.g. using a centered column layout with the line running through the center).
- **Fade-in animation**: Change duration to 400ms, timing to ease-out. Change translateY from 24px to 20px.
- **Hero section**: Hero children remain instantly visible (no entrance animation delay), as currently implemented. Ensure hero section itself has no entrance animation.
- **Stagger implementation**: Replace generic `.delay-1/.delay-2/...` classes with inline `style` transitionDelay for precise per-item stagger (150ms timeline, 100ms projects, 50ms skills).

### Remove
- `nav-logo` element (the "MP" link) from the Nav component.

## Implementation Plan

1. **Background mesh**: Add a fixed `<div>` with `pointer-events: none` and `z-index: -1` containing 3–4 blurred radial gradient blobs (teal, lavender, off-white) using CSS `filter: blur(200px)` or `backdrop-filter`. Low opacity (0.12–0.15). Add to `App.tsx` root.

2. **Nav active indicator**: 
   - Add `useActiveSection` hook that uses IntersectionObserver to track which section is currently in view (by section id).
   - Pass `activeSection` to Nav as prop or via context.
   - Add a small teal underline (`::after` pseudo-element or an absolutely-positioned `<span>`) per nav link that shows when active.
   - Use CSS transition 300ms ease on opacity/width for the underline.

3. **Nav restructure**: Remove `nav-logo` from JSX. Change `nav-inner` layout to `justify-content: center` for the links. Keep hamburger visible on mobile at far right using `position: absolute` or flex spacer.

4. **Timeline centering**: Switch to a centered two-column layout where the vertical line runs down the center, or use a single-column layout with the line centered. A clean approach: make `.timeline` use `position: relative` with a centered pseudo-element (`left: 50%`), and each entry is full-width with the dot absolutely positioned at center. For simplicity, center line at a fixed offset that matches content.

5. **Animation overhaul**:
   - Update `.fade-in-up` transition to `400ms ease-out`.
   - Update translateY to 20px.
   - Add `.section-animate` class for section-level entrance animation.
   - Apply IntersectionObserver on sections in each section component.
   - For timeline/projects/skills: assign inline `transitionDelay` based on item index × stagger interval in JSX.

6. **Caffeine badge animation**: Add a `@keyframes caffeine-pulse` that applies a soft glow on first appearance. Use `animation-fill-mode: forwards` so it triggers once.
