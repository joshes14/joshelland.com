# AGENTS.md - Developer Guidelines for my-portfolio

This is a personal portfolio website built with Astro, React, TypeScript, and Tailwind CSS v4.

## Project Overview

- **Framework**: Astro 6.x with React integration
- **Styling**: Tailwind CSS v4 with CSS-first configuration
- **Animations**: Framer Motion (React components)
- **Content**: Astro Content Collections with Zod schemas
- **TypeScript**: Strict mode enabled via `astro/tsconfigs/strict`
- **Node**: Requires Node.js >= 22.12.0 (see `.nvmrc`)

## Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run astro dev    # Same as above

# Build & Preview
npm run build        # Production build to ./dist/
npm run preview      # Preview production build locally

# Astro CLI
npm run astro check        # Type-check all files
npm run astro -- --help    # Get Astro CLI help
npm run astro add <pkg>    # Add integrations (react, mdx, etc.)
```

### Type Checking

```bash
npm run astro check    # Run Astro's built-in type checker
```

No separate test framework is currently configured. For manual testing, use `npm run dev` and verify in browser.

## Code Style Guidelines

### TypeScript Conventions

1. **Always use explicit types for Props interfaces**:
   ```typescript
   interface Props {
     children: ReactNode;
     delay?: number;
     className?: string;
   }
   ```

2. **Use `import type` for type-only imports**:
   ```typescript
   import type { ReactNode } from "react";
   ```

3. **Avoid `any` - use `unknown` with type guards when necessary**

4. **Component function declarations over arrow functions**:
   ```typescript
   export default function FadeIn({ children }: Props) {
     // ...
   }
   ```

### Astro Components (`.astro`)

1. **Frontmatter (YAML) section**: Place imports and logic at the top between `---` markers
2. **Props interface**: Define in frontmatter using `interface Props`
3. **Destructuring with defaults**: Use `const { prop = default } = Astro.props`
4. **Use `class:list` for conditional classes**:
   ```astro
   class:list={["base-class", condition && "conditional-class"]}
   ```
5. **Use `transition:*` directives** for client-side navigation animations
6. **Scripts**: Place inline `<script>` tags at bottom of file; use `import type` for TypeScript

### React Components (`.tsx`)

1. **Props with explicit interface** (see TypeScript conventions above)
2. **Default parameter values** in function signature
3. **Use Framer Motion** for animations - always check `useReducedMotion()`
4. **Fragment usage**: Use `<>...</>` for multiple elements

### CSS & Tailwind

1. **Tailwind v4**: Uses CSS-first config with `@theme` in `global.css`
2. **Custom colors/fonts**: Defined in `@theme` block, not `tailwind.config.js`
3. **Class naming**: Use lowercase with hyphens (BEM-lite pattern)
4. **Responsive utilities**: Mobile-first with `md:` and `lg:` prefixes
5. **Avoid arbitrary values**: Use semantic values from theme

### Imports & Module Structure

1. **Order of imports**:
   ```
   1. Astro integrations and configs (astro:*, @astrojs/*)
   2. React imports
   3. Third-party libraries (framer-motion, etc.)
   4. Internal components and layouts
   5. Styles
   ```

2. **Path aliases**: Use relative imports (`../components/`, `./utils/`)

3. **Content Collections**:
   ```typescript
   import { defineCollection } from "astro:content";
   import { z } from "astro:schema";
   import { glob } from "astro/loaders";
   ```

### Accessibility

1. **Always include `alt` text** on `<img>` elements
2. **Use semantic HTML**: `<nav>`, `<main>`, `<article>`, `<section>`, `<button>`
3. **ARIA labels** on icon-only buttons
4. **Focus states**: Use `.focus-ring` class defined in `global.css`
5. **Reduced motion**: Always check `useReducedMotion()` for animations

### File Organization

```
src/
├── components/          # Reusable UI components
│   ├── *.astro          # Astro components
│   └── *.tsx            # React components
├── layouts/             # Page layouts (BaseLayout.astro)
├── pages/               # Route pages (*.astro, [slug].astro)
├── content/             # Content collections
│   ├── blog/            # Markdown blog posts
│   └── gallery/         # Gallery items
├── styles/
│   └── global.css       # Tailwind v4 config + custom styles
└── content.config.ts    # Content collection schemas
```

### Naming Conventions

- **Components**: PascalCase (`AnimatedHeading.tsx`, `ProjectCard.astro`)
- **Files**: kebab-case for non-component files (`global.css`, `content.config.ts`)
- **CSS classes**: kebab-case with semantic prefixes (`nav-*`, `hero-*`, `prose-*`)
- **Content**: Files starting with `_` are excluded from collections

### Error Handling

1. **Optional chaining**: Use `?.` for potentially undefined values
2. **Nullish coalescing**: Use `??` for default values
3. **Guard clauses**: Return early for error conditions
4. **Type narrowing**: Use `typeof`, `instanceof`, or custom type guards

## Git Conventions

- **Commits**: Conventional commit messages (feat, fix, docs, style, refactor, test, chore)
- **Ignored paths**: See `.gitignore`
  - `public/images/` - Images deployed via SCP, not git
  - `.agent/` - Agent configuration and skills
  - `.github/` - GitHub workflows and Copilot instructions

## Browser Support

- Modern browsers (ES2022+)
- CSS `backdrop-filter` and `@starting-style` supported
- Respect `prefers-reduced-motion` media query

## Environment Variables

- `.env` files are gitignored
- Production env vars: `.env.production`
- No secrets should be committed

## Additional Notes

1. **View Transitions**: This site uses Astro's `ClientRouter` for page transitions
2. **Fonts**: Google Fonts loaded via CSS `@import` (Archivo, Space Grotesk)
3. **No external image CDN** - images served from `/public/images/`
4. **VS Code**: Recommended extension: `astro-build.astro-vscode`
