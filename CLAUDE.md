# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The landing page **and setup documentation** for the **AstrOs** ecosystem (open-source animation/control system for Star Wars R2 astromech droids), served as a GitHub Pages site at https://battlesloth.github.io. The root landing page is the single file `index.html`; the multi-page setup guide lives under `docs/` (served at `battlesloth.github.io/docs/`).

## Architecture

- **Buildless static site.** There is no build step, no `package.json`, no bundler, and no test/lint tooling — every file is served as-is. The landing page is self-contained in `index.html` (plus root `assets/`); the `docs/` guide is its own self-contained bundle (see below).
- **Styling = Tailwind + DaisyUI from CDNs.** Tailwind is loaded via `cdn.tailwindcss.com` (runtime JIT, not a compiled stylesheet) and DaisyUI v4 via jsDelivr. There is no Tailwind config file — utility classes are interpreted in the browser. `<html data-theme="winter">` selects the DaisyUI base theme.
- **Custom palette lives in an inline `<style>` block.** Brand colors are defined as custom classes (`bg-r2-light` `#548c9c`, `bg-r2-xlight` `#cbdce1`, `bg-r2-complement` `#f49446`, and `primary` `#2a5a97`). The `.btn-primary` / `.bg-primary` / `.text-primary` / `.border-primary` overrides use `!important` on purpose — they must beat DaisyUI's own component styles in the cascade. Add new brand colors here, not as Tailwind config.
- **Page structure** is a top-to-bottom flow of `<section>`s: navbar → hero → projects grid (three cards: AstrOs.Server, AstrOs.ESP, AstrOs.Screen) → "How It Works" architecture diagram → footer.

## The AstrOs wordmark (read before touching any title)

The "AstrOs" wordmark is hand-typeset and is the most edit-sensitive part of the file — most recent commits are spacing fixes to it. Conventions:

- Always wrapped in `font-starwars` (the `distant_galaxyregular` `@font-face` defined inline).
- The capital **A** and **O** are rendered one size larger than the surrounding `str`/`s` (e.g. `<span class="text-2xl">A</span>str<span class="text-2xl">O</span>s` inside a `text-xl` title).
- When a suffix follows (`.Server`, `.Screen`), the dot is wrapped in `<span class="font-starwars-dot-pad">.</span>` to add trailing space. **`.ESP` intentionally omits the dot-pad** — don't "fix" it for consistency.
- The wordmark appears at several sizes (navbar, hero, cards, footer, architecture boxes); each instance sizes the A/O relative to its local context, so copy the nearest existing instance rather than inventing sizes.

## Documentation site (`docs/`)

A multi-page setup/assembly guide, also buildless. It is a **self-contained bundle** with its own `assets/` (a duplicated `favicon.svg` + the `distant_galaxyregular` font) so its relative paths resolve independently of the root site. It originated from a design handoff kept (gitignored) in `.docs/handoff/`; that handoff README is the authoritative spec for the design tokens and components.

- **Navigation is data-driven.** `docs/docs-nav.js` exports a `NAV` array (groups → items with `num`/`title`/`file`) that is the **single source of truth**: every page injects its sidebar and prev/next footer from it on load. Add or reorder pages by editing `NAV`, not by hand-editing each page's chrome. The same script also wires the mobile drawer and the code-block copy buttons.
- **One token-driven stylesheet.** `docs/astros-docs.css` holds all styling; design tokens are CSS custom properties under `:root` (brand colors mirror the landing page — `--blue #2a5a97`, `--teal #548c9c`, `--orange #f49446`). Reusable component classes: `.callout` (`.tip`/`.warn`/`.note`), `.code` (with **manual** `.tok-*` syntax spans — there is no highlighter), `.steps`, `.nav-card`, `.dt` tables, `.pin-chip`.
- **Pages share a hand-copied scaffold.** Each `*.html` duplicates the same `<head>` + topbar + `<article>` shell (only the sidebar/footer are injected). The custom diagrams — the `hardware.html` pinout and the `pairing.html` topology (page-scoped `<style>`) — are bespoke HTML/CSS, not generated.
- **Technical content is verified against the source repos** (`AstrOs.ESP`, `AstrOs.Server`) and is pre-1.0/beta. Treat pin numbers, the `docker-compose.yml`, ports, and baud rates as load-bearing — re-verify against those repos before changing them. Established facts: firmware GPIO 2–11 are **outputs** (not input "triggers"), only two UARTs are wired (A1/A2 are reserved/unused), the master↔server link is 115200 baud (padawan 9600), and the server image is `ghcr.io/battlesloth/astros-server`.

## Developing

- **Preview locally:** open `index.html` (or `docs/index.html`) directly in a browser, or serve the repo root (`python3 -m http.server`) and visit it. No install step.
- **Deploy:** push to `main`. GitHub Pages serves the repo root automatically (user/org page — `battlesloth.github.io`). There is no Actions workflow.
- External links to the project repos point at `https://github.com/battlesloth/...` and use `target="_blank" rel="noopener noreferrer"`.
