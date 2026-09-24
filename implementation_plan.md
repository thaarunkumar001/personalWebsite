# Implementation Plan — Apple iPhone 17-Inspired Redesign & Color Palette Overhaul

Redesign **Thaarun Kumar's** portfolio website [`index.html`](file:///c:/Users/DHARUN/Desktop/AI%20Project/PersonalWebsite/index.html) to emulate the sleek, spacious, Apple iPhone 17 product showcase aesthetic, incorporating the exact color palette requested by the user and fixing navigation pane scrolling.

## User Review Required

> [!IMPORTANT]
> - **Color Scheme Overhaul:**
>   - **Navigation Bar:** Pure Black background (`#000000` / `#0a0a0c`) with crisp white typography, white TK monogram logo, and sleek dark borders.
>   - **Main Background:** Crisp White (`#ffffff`) across the overall body and section backdrops.
>   - **Content & Cards Fills:** Cream/Warm Vanilla `#FFF6DC` background for all cards, bento blocks, timeline containers, certification cards, and contact boxes.
>   - **Card & Content Text:** High-contrast Deep Black (`#000000` / `#111111`) text for high readability inside `#FFF6DC` cards.
> - **Apple iPhone 17 Bento Design:** Large rounded corners (`border-radius: 24px`), generous inner padding (`2.5rem` - `3rem`), subtle borders, elegant elevation hover effects, and expansive vertical section spacing (`7rem` - `9rem`).
> - **Navigation Fix:** Add explicit `scroll-margin-top: 100px` to all `<section>` elements and smooth JS scroll offset to ensure navigation links jump directly to section headers below the sticky dark nav bar.

## Open Questions

- *None. Requirements and color scheme directives (`black nav pane`, `white bg`, `#FFF6DC` cards, `black text`) are fully defined.*

## Proposed Changes

### Portfolio Website

#### [MODIFY] [index.html](file:///c:/Users/DHARUN/Desktop/AI%20Project/PersonalWebsite/index.html)

1. **CSS Design Tokens & Theme Revision:**
   - Update CSS custom properties for Apple Bento styling:
     - `--color-nav-bg: #0a0a0c`
     - `--color-nav-text: #ffffff`
     - `--color-bg-primary: #ffffff`
     - `--color-card-bg: #FFF6DC`
     - `--color-card-text: #000000`
     - `--color-accent: #0f766e` (Teal accent for badges and interactive links)
   - Ensure cards use `#FFF6DC` with `border-radius: 24px` and shadow elevation.

2. **Navigation Fix & Header Styling:**
   - Add `scroll-margin-top: 100px;` to all section elements (`#hero`, `#about`, `#experience`, `#skills`, `#certifications`, `#career`, `#contact`).
   - Style `.site-header` with black background (`rgba(0, 0, 0, 0.92)`), white TK SVG monogram logo, and high-contrast nav links.

3. **Apple-Style Hero & Expansive Section Layouts:**
   - Expand Hero section with high-impact typography, larger CTA buttons, and spacious layout.
   - Refine About section with `#FFF6DC` Apple bento feature cards.
   - Upgrade Professional Experience timeline into structured `#FFF6DC` Apple cards with black text and clear date tags.
   - Transform Technical Skillset into 3 wide Bento grid cards in `#FFF6DC`.
   - Upgrade Certifications Carousel into featured `#FFF6DC` Apple showcase cards with smooth scrolling, previous/next controls, and touch swipe.
   - Upgrade Career Direction into numeric Apple Bento cards in `#FFF6DC`.
   - Upgrade Contact grid into interactive `#FFF6DC` action boxes.

4. **JavaScript Smooth Scroll Enhancement:**
   - Add smooth scroll handler for nav link clicks to close mobile overlay automatically and scroll smoothly with fixed header offset.

## Verification Plan

### Automated Tests
- Inspect HTML structure for valid syntax and verify all `href="#id"` links match valid `<section id="id">` targets.

### Manual Verification
- **Navigation Test:** Click each nav item (*About*, *Experience*, *Skills*, *Certifications*, *Career*, *Contact*) on Desktop and Mobile. Verify smooth scrolling lands cleanly below the black sticky header.
- **Color Verification:** Check black nav bar (`#0a0a0c`), white page background (`#ffffff`), and `#FFF6DC` card fills with deep black typography.
- **Card Aesthetics:** Verify Apple Bento rounded corners (`24px`), padding, hover transitions, and clean typography.
