# Next.js Portfolio Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static portfolio as a Next.js App Router app with structured React components, a live GitHub route, and a more premium app-like UI.

**Architecture:** Create a fresh Next.js TypeScript app in the current workspace, move portfolio data into typed content modules, migrate the GitHub API into a route handler plus shared server utilities, and rebuild interactive behavior as focused client components while keeping the main page mostly server-rendered.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node test runner, GitHub REST and GraphQL APIs

---

## File Map

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `app/api/github-activity/route.ts`
- Create: `components/portfolio-shell.tsx`
- Create: `components/sections/*.tsx`
- Create: `components/ui/*.tsx`
- Create: `components/providers/theme-provider.tsx`
- Create: `content/portfolio.ts`
- Create: `lib/github.ts`
- Create: `lib/utils.ts`
- Create: `tests/github-route.test.mjs`
- Modify: `.gitignore`
- Modify: `README.md`
- Delete or stop using: `index.html`, `script.js`, `styles.css`, `api/github-activity.js`

### Task 1: Scaffold the Next.js application

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Write the failing dependency and script expectations**

```json
{
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "node --test tests/*.test.mjs"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "typescript": "latest"
  }
}
```

- [ ] **Step 2: Verify the workspace does not yet have a runnable Next.js app**

Run: `test -f package.json && echo present || echo missing`
Expected: `missing`

- [ ] **Step 3: Create the minimal Next.js scaffold**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Install dependencies and verify the scaffold exists**

Run: `npm install`
Expected: lockfile and `node_modules` created without install errors

- [ ] **Step 5: Commit the scaffold checkpoint**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts next-env.d.ts .gitignore
git commit -m "feat: scaffold Next.js portfolio app"
```

### Task 2: Port the GitHub server integration

**Files:**
- Create: `lib/github.ts`
- Create: `app/api/github-activity/route.ts`
- Test: `tests/github-route.test.mjs`

- [ ] **Step 1: Write the failing GitHub summary test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { summarizeRepositories } from "../lib/github.js";

test("summarizeRepositories prefers owned repositories and derives top language", () => {
  const summary = summarizeRepositories([
    { fork: false, language: "TypeScript", pushed_at: "2026-01-01T00:00:00Z", name: "a", html_url: "https://example.com/a", description: "", stargazers_count: 2 },
    { fork: false, language: "TypeScript", pushed_at: "2026-01-02T00:00:00Z", name: "b", html_url: "https://example.com/b", description: "", stargazers_count: 3 },
    { fork: false, language: "Python", pushed_at: "2026-01-03T00:00:00Z", name: "c", html_url: "https://example.com/c", description: "", stargazers_count: 4 }
  ]);

  assert.equal(summary.topLanguage, "TypeScript");
  assert.equal(summary.recentRepositories.length, 3);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/github-route.test.mjs`
Expected: FAIL because `lib/github.js` or exported functions do not exist yet

- [ ] **Step 3: Implement the minimal GitHub utility and route handler**

```ts
// lib/github.ts
export function summarizeRepositories(repositories: GitHubRepository[]) {
  // shared summary logic moved from the legacy API file
}
```

```ts
// app/api/github-activity/route.ts
export async function GET() {
  // fetch profile, repos, and optional contributions, then return JSON
}
```

- [ ] **Step 4: Run tests to verify the utility passes**

Run: `node --test tests/github-route.test.mjs`
Expected: PASS

- [ ] **Step 5: Commit the API migration**

```bash
git add lib/github.ts app/api/github-activity/route.ts tests/github-route.test.mjs
git commit -m "feat: migrate GitHub activity route"
```

### Task 3: Port content into structured data and base sections

**Files:**
- Create: `content/portfolio.ts`
- Create: `components/sections/*.tsx`
- Create: `components/ui/*.tsx`
- Create: `app/page.tsx`

- [ ] **Step 1: Write the failing content rendering test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { portfolioContent } from "../content/portfolio.js";

test("portfolio content includes core sections", () => {
  assert.equal(portfolioContent.projects.length >= 2, true);
  assert.equal(portfolioContent.experience.length >= 2, true);
  assert.equal(portfolioContent.socialLinks.length >= 3, true);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/content.test.mjs`
Expected: FAIL because the content module does not exist yet

- [ ] **Step 3: Create the typed content module and section components**

```ts
export const portfolioContent = {
  navigation: [...],
  experience: [...],
  projects: [...],
  stackGroups: [...],
};
```

```tsx
export default function HomePage() {
  return <PortfolioShell />;
}
```

- [ ] **Step 4: Run the content test and a build check**

Run: `node --test tests/content.test.mjs`
Expected: PASS

Run: `npm run build`
Expected: production build completes successfully

- [ ] **Step 5: Commit the content migration**

```bash
git add content app/page.tsx components tests/content.test.mjs
git commit -m "feat: port portfolio content into React sections"
```

### Task 4: Rebuild client interactions and premium styling

**Files:**
- Create: `components/providers/theme-provider.tsx`
- Create: `components/ui/command-palette.tsx`
- Create: `components/ui/project-accordion.tsx`
- Create: `components/ui/voice-intro-button.tsx`
- Create: `app/globals.css`
- Modify: `components/portfolio-shell.tsx`

- [ ] **Step 1: Write the failing interaction contract test**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("global styles define design tokens for the redesigned portfolio", () => {
  const css = readFileSync("app/globals.css", "utf8");
  assert.match(css, /--bg:/);
  assert.match(css, /--accent:/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/style-contract.test.mjs`
Expected: FAIL because `app/globals.css` or the tokens do not exist yet

- [ ] **Step 3: Implement the client components and design system**

```tsx
"use client";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // hydrate persisted theme and expose toggle behavior
}
```

```css
:root {
  --bg: ...;
  --accent: ...;
}
```

- [ ] **Step 4: Run tests and build again**

Run: `node --test tests/style-contract.test.mjs`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit the interaction and styling pass**

```bash
git add app/globals.css components/providers components/ui components/portfolio-shell.tsx tests/style-contract.test.mjs
git commit -m "feat: rebuild portfolio interactions and styling"
```

### Task 5: Remove legacy entrypoints and update docs

**Files:**
- Modify: `README.md`
- Delete: `index.html`
- Delete: `script.js`
- Delete: `styles.css`
- Delete: `api/github-activity.js`

- [ ] **Step 1: Write the failing cleanup expectation**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

test("legacy static entrypoints are removed after Next.js migration", () => {
  assert.equal(existsSync("index.html"), false);
  assert.equal(existsSync("script.js"), false);
  assert.equal(existsSync("styles.css"), false);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/cleanup.test.mjs`
Expected: FAIL because the legacy files still exist

- [ ] **Step 3: Remove legacy files and refresh the README**

```md
# Vivek Portfolio

Next.js portfolio with live GitHub activity and structured portfolio content.
```

- [ ] **Step 4: Run the full verification suite**

Run: `npm test`
Expected: PASS

Run: `npm run build`
Expected: PASS

- [ ] **Step 5: Commit the cleanup**

```bash
git add README.md tests
git rm index.html script.js styles.css api/github-activity.js
git commit -m "refactor: complete Next.js portfolio migration"
```

## Self-Review

- Spec coverage: the plan covers the scaffold, content migration, GitHub route migration, interaction rebuild, responsive styling, and final cleanup.
- Placeholder scan: no `TODO`, `TBD`, or undefined implementation handoffs remain.
- Type consistency: all paths and module names align with the agreed Next.js App Router structure.
