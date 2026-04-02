# Contributing

Thanks for your interest in improving this portfolio.

## Quick Start (Local)

- Recommended: VS Code + the **Live Server** extension.
- Then open the repo folder and start Live Server from `index.html`.

No build step is required (static HTML/CSS/JS).

## What to Work On

- Bug fixes (broken links, console errors, layout issues)
- Accessibility improvements (labels, keyboard nav, contrast)
- Performance improvements (reduce blocking work, optimize assets)
- Content updates (copy, links, projects)

## Before You Submit a PR

- Confirm the site still renders correctly on:
  - Desktop and mobile widths
  - A Chromium-based browser and Firefox
- Avoid adding new heavy dependencies for small changes.
- Keep changes focused and consistent with the existing style.

## How to Contribute

1. Fork the repo
2. Create a branch: `git checkout -b fix/short-description`
3. Make changes
4. Commit with a clear message
5. Open a Pull Request

## Reporting Issues

Use the GitHub issue templates:

- Bug report
- Feature request
- UI update

For security issues, follow **SECURITY.md** and avoid public disclosure.

## Style Guidelines

### HTML
- Prefer semantic elements and correct heading order.
- Keep ARIA attributes meaningful (don’t add ARIA if native semantics already work).

### CSS
- Reuse existing variables/tokens when possible.
- Keep responsive behavior mobile-first.

### JavaScript
- Prefer small, readable functions.
- Avoid introducing frameworks/build tools unless necessary.
