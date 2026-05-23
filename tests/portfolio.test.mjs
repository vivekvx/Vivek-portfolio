import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const script = readFileSync("script.js", "utf8");
const apiPath = "api/github-contributions.js";
const api = existsSync(apiPath) ? readFileSync(apiPath, "utf8") : "";
const aboutMatch = html.match(/<section class="about full-row" id="about">[\s\S]*?<\/section>/);
const aboutHtml = aboutMatch?.[0] || "";
const achievementsMatch = html.match(/<section class="achievements full-row" id="achievements">[\s\S]*?<\/section>/);
const achievementsHtml = achievementsMatch?.[0] || "";

const expectations = [
  ["command palette button", 'id="command-toggle"'],
  ["command palette dialog", 'id="command-palette"'],
  ["copyable contact buttons", "data-copy"],
  ["speech intro button", 'id="voice-button"'],
  ["activity grid", 'id="activity-grid"'],
  ["AI stack chips", "stack-pills"],
  ["toast feedback", 'id="toast"'],
  ["Vivek Sahu name", "Vivek Sahu"],
  ["LinkedIn profile", "https://www.linkedin.com/in/viveksahuvx/"],
  ["X profile", "https://x.com/Vivekvkvq"],
  ["Friday project", "https://github.com/vivekvx/Friday.ai"],
  ["FlowRestore project", "https://github.com/vivekvx/Flowrestore"],
  ["work experience section", 'id="experience"'],
  ["Trivana work", "Trivana Capital"],
  ["GDGSSIPMT work", "GDGSSIPMT"],
  ["GitHub sync section", 'id="github-sync"'],
  ["GitHub sync function", "syncGitHub"],
  ["GitHub contribution API file", apiPath],
  ["client contribution API fetch", "/api/github-contributions"],
  ["GitHub GraphQL contribution calendar", "contributionCalendar"],
  ["GitHub token server only", "process.env.GITHUB_TOKEN"],
  ["public repo API", "https://api.github.com/users/vivekvx/repos?per_page=100&sort=updated"],
  ["public events API", "https://api.github.com/users/vivekvx/events/public?per_page=100"],
  ["generated GitHub graph", "graph-generated"],
  ["GitHub contribution settings", "Contribution settings"],
  ["GitHub year tabs", "year-tabs"],
  ["OSS PR row", "OSS PRs"],
  ["contribution caption", "1,326 contributions in the last year"],
  ["AI stack section", "LLM Engineering"],
  ["AI agents stack", "AI Agents"],
  ["hackathons section", 'id="achievements"'],
  ["Paytm AI Hackathon", "Paytm AI Hackathon"],
  ["SBI Mutual Fund Hackathon", "SBI Mutual Fund Hackathon"],
  ["only two hackathon rows", "achievement-list"],
  ["no Google hackathon rows", "Google Hyderabad Build"],
  ["no Harvard row", "Harvard HPAIR"],
  ["no profile details section", 'class="identity full-row"'],
  ["no phone row", 'id="phone-row"'],
  ["no Instagram link", "https://www.instagram.com/"],
  ["no GitHub token", "GITHUB_TOKEN"],
  ["no About featured project list", "featured-list"],
  ["no Friday in About", "Friday.ai"],
  ["no FlowRestore in About", "FlowRestore"],
  ["copy handler", "navigator.clipboard.writeText"],
  ["project accordion handler", "aria-expanded"],
  ["activity grid builder", "buildActivityGrid"],
  ["SVG icon assets", "assets/icons/github.svg"],
  ["section reveal motion", "enhanceSectionMotion"],
];

for (const [label, snippet] of expectations) {
  if (label === "no Instagram link") {
    assert(!html.includes(snippet), "Instagram should not be included");
    continue;
  }
  if (label === "no profile details section" || label === "no phone row") {
    assert(!html.includes(snippet), `${snippet} should not be included`);
    continue;
  }
  if (label === "no GitHub token") {
    assert(!html.includes(snippet) && !script.includes(snippet), "GitHub token should not be required");
    continue;
  }
  if (label === "GitHub contribution API file") {
    assert(existsSync(snippet), `${snippet} should exist`);
    continue;
  }
  if (label === "GitHub GraphQL contribution calendar" || label === "GitHub token server only") {
    assert(api.includes(snippet), `Missing ${label}: expected ${snippet}`);
    continue;
  }
  if (label === "no About featured project list" || label === "no Friday in About" || label === "no FlowRestore in About") {
    assert(!aboutHtml.includes(snippet), `${snippet} should not be inside About`);
    continue;
  }
  if (label === "only two hackathon rows") {
    const rowCount = (achievementsHtml.match(/<article>/g) || []).length;
    assert.equal(rowCount, 2, "Hackathons section should contain exactly two rows");
    continue;
  }
  if (label === "no Google hackathon rows" || label === "no Harvard row") {
    assert(!achievementsHtml.includes(snippet), `${snippet} should not be inside Hackathons`);
    continue;
  }
  assert(
    html.includes(snippet) || script.includes(snippet),
    `Missing ${label}: expected ${snippet}`,
  );
}

console.log("Portfolio interactive contract passed.");
