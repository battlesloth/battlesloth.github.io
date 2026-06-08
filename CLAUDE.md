# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The landing page for the **AstrOs** ecosystem (open-source animation/control system for Star Wars R2 astromech droids), served as a GitHub Pages site at https://battlesloth.github.io. The entire site is the single file `index.html`.

## Architecture

- **Buildless static site.** There is no build step, no `package.json`, no bundler, and no test/lint tooling. All markup, styles, and content live in `index.html`. The only other tracked files are `assets/favicon.svg` and `assets/fonts/DISTGRG_-webfont.woff`.
- **Styling = Tailwind + DaisyUI from CDNs.** Tailwind is loaded via `cdn.tailwindcss.com` (runtime JIT, not a compiled stylesheet) and DaisyUI v4 via jsDelivr. There is no Tailwind config file — utility classes are interpreted in the browser. `<html data-theme="winter">` selects the DaisyUI base theme.
- **Custom palette lives in an inline `<style>` block.** Brand colors are defined as custom classes (`bg-r2-light` `#548c9c`, `bg-r2-xlight` `#cbdce1`, `bg-r2-complement` `#f49446`, and `primary` `#2a5a97`). The `.btn-primary` / `.bg-primary` / `.text-primary` / `.border-primary` overrides use `!important` on purpose — they must beat DaisyUI's own component styles in the cascade. Add new brand colors here, not as Tailwind config.
- **Page structure** is a top-to-bottom flow of `<section>`s: navbar → hero → projects grid (three cards: AstrOs.Server, AstrOs.ESP, AstrOs.Screen) → "How It Works" architecture diagram → footer.

## The AstrOs wordmark (read before touching any title)

The "AstrOs" wordmark is hand-typeset and is the most edit-sensitive part of the file — most recent commits are spacing fixes to it. Conventions:

- Always wrapped in `font-starwars` (the `distant_galaxyregular` `@font-face` defined inline).
- The capital **A** and **O** are rendered one size larger than the surrounding `str`/`s` (e.g. `<span class="text-2xl">A</span>str<span class="text-2xl">O</span>s` inside a `text-xl` title).
- When a suffix follows (`.Server`, `.Screen`), the dot is wrapped in `<span class="font-starwars-dot-pad">.</span>` to add trailing space. **`.ESP` intentionally omits the dot-pad** — don't "fix" it for consistency.
- The wordmark appears at several sizes (navbar, hero, cards, footer, architecture boxes); each instance sizes the A/O relative to its local context, so copy the nearest existing instance rather than inventing sizes.

## Developing

- **Preview locally:** open `index.html` directly in a browser, or serve the folder (`python3 -m http.server`) and visit it. No install step.
- **Deploy:** push to `main`. GitHub Pages serves the repo root automatically (user/org page — `battlesloth.github.io`). There is no Actions workflow.
- External links to the project repos point at `https://github.com/battlesloth/...` and use `target="_blank" rel="noopener noreferrer"`.
