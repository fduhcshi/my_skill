---
name: sticker-neo-brutalism
description: Design and build web interfaces in a warm sticker-sheet neo-brutalist style, with cream backgrounds, pastel accents, thick outlines, and hard offset shadows. Use when the user asks for this visual style for a landing page, dashboard, portfolio, project page, or lightweight tool.
---

# Sticker Neo-Brutalism Web Design Skill

## Purpose

Use this skill whenever generating a landing page, research dashboard, experiment report, portfolio, project page, internal tool, or lightweight SaaS interface in the **warm sticker-sheet neo-brutalist** style.

The target aesthetic is:

- warm and playful rather than harsh brutalism;
- technical enough for research / developer tools;
- visually distinctive but still readable;
- built from simple CSS primitives rather than heavy visual effects.

---

## Core visual language

Always use:

- warm cream page background;
- off-white content surfaces;
- dark brown-black text and outlines;
- 2px solid borders;
- hard offset shadows with **zero blur**;
- 10–20px rounded corners;
- pastel yellow, pink, blue, green, and orange accents;
- small rotations on selected cards;
- rounded display typography for large headings/numbers;
- system sans-serif for body copy;
- monospace for metadata, metric labels, run IDs, tags, code-like content.

Avoid:

- glassmorphism;
- translucent cards;
- blurred drop shadows;
- generic blue SaaS dashboards;
- heavy gradients;
- excessive animations;
- ultra-minimal gray-on-white layouts;
- pure black / pure white unless specifically requested;
- every card being rotated;
- excessive decoration that reduces readability.

---

## Design tokens

Use these values by default:

```css
:root {
  --bg: #fff4dd;
  --surface: #fffdf7;
  --text: #26201a;
  --muted: #75695f;

  --orange: #ff5c2b;
  --yellow: #ffd84d;
  --pink: #ffb9cc;
  --blue: #a5dcff;
  --green: #b9e6b1;

  --border: 2px solid var(--text);

  --shadow-sm: 3px 3px 0 var(--text);
  --shadow-md: 5px 5px 0 var(--text);
  --shadow-lg: 7px 7px 0 var(--text);

  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 20px;
}
```

---

## Typography

Preferred hierarchy:

### Display / hero / large metrics

Use:

```css
font-family: "Baloo 2", ui-rounded, system-ui, sans-serif;
font-weight: 800;
```

If Baloo 2 is unavailable, use another rounded heavy display font.

### Body

Use:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Metadata / labels / run IDs

Use:

```css
font-family:
  ui-monospace,
  SFMono-Regular,
  Menlo,
  Monaco,
  Consolas,
  monospace;
```

---

## Card rules

Default card:

```css
.card {
  background: var(--surface);
  border: var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: 24px;
}
```

Large focal card:

```css
.card-lg {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 32px;
}
```

Sticker cards may use one pastel fill and a tiny rotation:

```css
.sticker-yellow {
  background: var(--yellow);
  transform: rotate(-0.6deg);
}
```

Keep rotations approximately between `-1deg` and `1deg` for normal cards.

---

## Buttons

Buttons must feel physical.

```css
.btn {
  border: var(--border);
  border-radius: 12px;
  background: var(--orange);
  box-shadow: var(--shadow-sm);
  font-weight: 800;
}

.btn:hover {
  transform: translate(1px, 1px);
  box-shadow: 2px 2px 0 var(--text);
}

.btn:active {
  transform: translate(3px, 3px);
  box-shadow: none;
}
```

Do not use opacity-only hover states.

---

## Tags and status pills

Use rounded pills with borders and small hard shadows.

Examples:

- `RUNNING` → yellow
- `DONE` → green
- `FAILED` → pink
- experiment parameters → off-white or blue

Metadata labels should usually be uppercase monospace.

---

## Layout principles

Prefer:

- wide central container;
- generous spacing;
- large hero block;
- 2–4 major content sections;
- metric cards;
- charts in framed cards;
- experiment tables;
- notes / callout stickers;
- minimal navigation.

Avoid:

- dense enterprise sidebars unless the product truly needs one;
- nested cards everywhere;
- overly complex page chrome;
- tiny text and excessive information density.

The style works best when each block has a clear visual role.

---

## Charts

Charts must visually belong to the page.

Use:

- chart background: `#fffdf7`;
- axes: `#26201a`;
- primary line: `#ff5c2b`;
- secondary lines: `#a5dcff`, `#ffb9cc`, `#ffd84d`;
- subtle grid: `#eadfcb`;
- no default corporate chart themes.

Put charts inside a bordered hard-shadow card.

---

## Recommended page structure

For research / experiment pages:

```text
Navbar
Hero
Experiment summary
3 metric stickers
Main chart
Research note
Experiment table
Footer
```

For portfolio pages:

```text
Navbar
Hero / intro
Featured project stickers
Selected work grid
About
Contact
Footer
```

For product pages:

```text
Navbar
Hero
Benefits
Feature cards
Demo / screenshot
Pricing or CTA
Footer
```

---

## Responsiveness

At desktop widths:

- use 2-column hero sections;
- 3-column metric grids;
- 2-column content sections.

At tablet/mobile widths:

- collapse to 1 column;
- retain hard shadows;
- reduce padding slightly;
- reduce or remove extreme rotations;
- keep large text readable without overflow.

---

## Accessibility

Always:

- maintain strong text/background contrast;
- support keyboard focus;
- do not rely only on color for status;
- keep body copy readable;
- respect `prefers-reduced-motion`;
- avoid rotating long text blocks.

---

## Generation instruction

When asked to create a webpage in this style:

1. Start from these design tokens.
2. Build semantic HTML first.
3. Use simple reusable CSS classes.
4. Make the layout responsive.
5. Use pastel sticker cards only for emphasis.
6. Use hard shadows with zero blur.
7. Use at least one rounded display heading and monospace metadata.
8. Keep decorations restrained.
9. Avoid generic SaaS aesthetics.
10. The final result should feel like a warm paper notebook / sticker sheet designed for developers or researchers.

---

## Prompt shorthand

The user may simply say:

> Use my Sticker Neo-Brutalism skill.

Interpret that as:

> Create a warm sticker-sheet neo-brutalist interface using cream paper-like backgrounds, off-white surfaces, dark brown outlines, 2px borders, hard offset shadows, pastel yellow/pink/blue/orange accents, subtle card rotations, rounded heavy display type, monospace metadata, restrained physical button interactions, and no glassmorphism or blurred shadows.
