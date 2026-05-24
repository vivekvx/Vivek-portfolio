# Next.js Portfolio Redesign and React Migration

## Overview

This project will migrate the current static portfolio into a Next.js App Router application with a cleaner React architecture, structured content, and a more premium, app-like presentation. The new version will preserve the existing single-page portfolio flow, keep the live GitHub activity section, and make future edits easier by moving portfolio content into data-driven modules.

The result should feel more advanced without becoming harder to maintain. The portfolio should remain fast, easy to update, responsive, and visually distinctive.

## Goals

- Migrate the current static HTML, CSS, and JavaScript portfolio into Next.js.
- Rebuild the UI as reusable React components with clear boundaries.
- Preserve the live GitHub activity experience using a server route.
- Move portfolio content into structured data so updates are easy.
- Upgrade the visual design to feel more premium and product-minded.
- Preserve strong mobile behavior and accessibility.

## Non-Goals

- Converting the portfolio into a multi-page site in this pass.
- Adding a CMS, database, or authentication.
- Rebuilding the content itself beyond what is needed to support the new structure.
- Introducing excessive animation or interaction that harms readability or performance.

## Product Direction

The site will remain a single-page portfolio, but it should feel like a polished modern web app rather than a static document. The design language should reflect an AI product engineer: sharp typography, restrained motion, richer section framing, and a more intentional layout system.

The portfolio should prioritize clarity first, then polish. Every visual upgrade should support hierarchy, readability, and stronger storytelling around work, projects, and GitHub activity.

## Architecture

### Framework

- Next.js with App Router
- TypeScript
- Single landing page at `app/page.tsx`
- Global styles in `app/globals.css`

### App Structure

Expected high-level structure:

- `app/layout.tsx`
- `app/page.tsx`
- `app/api/github-activity/route.ts`
- `components/sections/`
- `components/ui/`
- `content/portfolio.ts`
- `lib/github.ts`
- `lib/utils.ts`
- `public/` for static assets migrated from `assets/`

### Component Boundaries

Section components should own presentation for a single content area:

- Hero
- Profile / intro
- Social links
- Experience
- GitHub activity
- About
- Stack
- Achievements
- Projects
- Footer or contact strip if needed during implementation

Shared UI components should handle repeated interface patterns:

- Section shell
- Buttons
- Tag or pill groups
- Social card
- Project accordion card
- Dialog or command palette shell
- Stats card

### Content Model

Portfolio content will be centralized in `content/portfolio.ts`. This file should contain:

- profile identity and intro text
- navigation items
- social links
- work experience entries
- about bullets
- tech stack groups
- achievements
- project entries

This allows the page to render from structured data rather than hardcoded JSX blocks, making future editing much easier.

## Live GitHub Data

### Requirement

The GitHub section must remain live rather than becoming static.

### Design

- A Next.js route handler at `app/api/github-activity/route.ts` will replace the current `api/github-activity.js`.
- Server-side logic in `lib/github.ts` will fetch and normalize GitHub profile and repository data.
- The UI will consume the API route and render:
  - public repo count
  - follower count
  - latest push date
  - top language snapshot
  - recent repositories
  - contribution calendar when credentials and upstream access allow it

### Failure Handling

If GitHub data is unavailable because of missing credentials, rate limits, or upstream failure:

- the section must still render
- static fallback copy must explain limited availability
- portfolio layout must not collapse
- users must still have a direct link to the GitHub profile

This preserves reliability while keeping the live feel.

## Interaction Design

Existing interactions will be preserved and modernized:

- Theme toggle with local persistence
- Command palette or quick-action dialog
- Expandable project cards
- Voice intro button using browser speech synthesis
- Section reveal animations

Implementation expectations:

- interactive features should live in small client components
- the main page should stay as server-rendered as practical
- state should be local and simple unless shared state becomes necessary

## Visual System

### Direction

The redesign should feel premium, bold, and modern without drifting into clutter. It should look like a portfolio for someone building AI products and developer tools.

### Visual Traits

- stronger type hierarchy with a more intentional display and mono pairing
- layered backgrounds or atmospheric framing instead of a flat page
- app-like panels for GitHub and project content
- cleaner spacing rhythm across sections
- restrained accent usage
- meaningful hover and entrance motion

### Motion

Motion should be used in a focused way:

- staggered section reveals
- refined hover states
- subtle hero motion
- smooth project expansion

Motion must degrade cleanly for reduced-motion users.

## Responsive Behavior

The site must work cleanly across desktop and mobile:

- top navigation should adapt to smaller screens
- content grids should collapse gracefully
- GitHub activity layout should remain readable on mobile
- buttons and tap targets should stay comfortable
- large visual treatments should not create horizontal overflow

## Accessibility

The new app should maintain or improve accessibility:

- semantic landmarks and headings
- keyboard-accessible dialogs and toggles
- clear focus states
- accessible project expansion controls
- decorative visuals hidden from screen readers where appropriate
- reduced-motion support

## Testing Strategy

Implementation should be test-driven where practical for behavior changes and extracted logic.

Priority test coverage:

- GitHub data normalization and fallback logic
- rendering of key content from structured data
- important interactive behavior that is feasible to test in this setup

At minimum, the migration should preserve an executable verification path for:

- build success
- page rendering
- GitHub route behavior under success and fallback conditions

## Migration Strategy

The migration should proceed in focused stages:

1. Scaffold Next.js app structure and move assets.
2. Port content into structured data.
3. Rebuild the page from section components.
4. Migrate the GitHub API into a route handler plus shared server utilities.
5. Rebuild client interactions.
6. Apply the visual redesign and responsive refinements.
7. Verify behavior, build output, and fallback states.

This order keeps the app functional while reducing risk during the redesign.

## Risks and Mitigations

### Risk: GitHub integration becomes more fragile during migration

Mitigation:

- isolate fetch and transform logic in `lib/github.ts`
- handle missing data defensively
- keep clear fallback UI states

### Risk: redesign adds too much complexity

Mitigation:

- preserve single-page scope
- keep interactions purposeful
- prefer reusable UI patterns over one-off flourishes

### Risk: client-side behavior spreads too widely

Mitigation:

- keep most sections server-rendered
- isolate interactivity into narrow client components
- avoid unnecessary global state

## Acceptance Criteria

The design is successful when:

- the portfolio runs as a Next.js App Router app
- content is rendered from structured React-friendly data
- the GitHub section remains live with graceful fallbacks
- the page feels more polished and advanced than the current static version
- key interactions from the current site still work
- the site is responsive and accessible
- future content edits are significantly easier than editing raw HTML
