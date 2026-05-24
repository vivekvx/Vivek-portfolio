import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const page = readFileSync("app/page.tsx", "utf8");
const shell = readFileSync("components/portfolio-shell.tsx", "utf8");
const content = readFileSync("content/portfolio.ts", "utf8");
const route = readFileSync("app/api/github-activity/route.ts", "utf8");
const githubLib = readFileSync("lib/github.ts", "utf8");
const css = readFileSync("app/globals.css", "utf8");

assert(page.includes("PortfolioShell"), "home page should render the portfolio shell");
assert(shell.includes("GitHubActivitySection"), "portfolio shell should include the live GitHub section");
assert(shell.includes("ThemeProvider"), "portfolio shell should include the theme provider");
assert(shell.includes("CommandPalette"), "portfolio shell should include the command palette");
assert(content.includes("Trivana Capital"), "content should include Trivana experience");
assert(content.includes("GDGSSIPMT"), "content should include GDGSSIPMT experience");
assert(content.includes("Friday.ai"), "content should include Friday.ai");
assert(content.includes("FlowRestore"), "content should include FlowRestore");
assert(content.includes("Paytm AI Hackathon"), "content should include Paytm AI Hackathon");
assert(content.includes("SBI Mutual Fund Hackathon"), "content should include SBI Mutual Fund Hackathon");
assert(route.includes("fetchGitHubSnapshot"), "GitHub API route should use the shared snapshot helper");
assert(githubLib.includes("https://api.github.com/users/vivekvx"), "GitHub lib should fetch the public profile");
assert(githubLib.includes("https://api.github.com/graphql"), "GitHub lib should support the GraphQL contribution calendar");
assert(githubLib.includes("process.env.GITHUB_TOKEN"), "GitHub lib should support a server token");
assert(css.includes("--accent:"), "global styles should define design tokens");
assert(css.includes(".github-chart-card"), "global styles should include GitHub card styling");
assert(existsSync("public/assets/icons/github.svg"), "public assets should be copied for Next.js");
assert(!existsSync("index.html"), "legacy index.html should be removed");
assert(!existsSync("script.js"), "legacy script.js should be removed");
assert(!existsSync("styles.css"), "legacy styles.css should be removed");
assert(!existsSync("api/github-activity.js"), "legacy Vercel API should be removed");

console.log("Next.js portfolio contract passed.");
