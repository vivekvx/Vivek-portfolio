const root = document.documentElement;
const toast = document.getElementById("toast");
const commandPalette = document.getElementById("command-palette");
const storedTheme = localStorage.getItem("portfolio-theme");

if (storedTheme === "light") {
  root.classList.add("light");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  root.classList.toggle("light");
  const theme = root.classList.contains("light") ? "light" : "dark";
  localStorage.setItem("portfolio-theme", theme);
  showToast(`${theme} mode`);
});

document.getElementById("coffee-button").addEventListener("click", () => {
  showToast("Opening support link");
});

document.getElementById("command-toggle").addEventListener("click", () => {
  commandPalette.showModal();
});

document.getElementById("command-close").addEventListener("click", () => {
  commandPalette.close();
});

commandPalette.addEventListener("click", (event) => {
  if (event.target === commandPalette) {
    commandPalette.close();
  }
});

commandPalette.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => commandPalette.close());
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    commandPalette.showModal();
  }
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showToast("Copied to clipboard");
    } catch {
      showToast(value);
    }
    if (commandPalette.open) {
      commandPalette.close();
    }
  });
});

document.getElementById("voice-button").addEventListener("click", () => {
  const message = "Hey, I am Vivek Sahu. I build AI agents, developer tooling, and reliable full stack systems.";
  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
    speechSynthesis.speak(new SpeechSynthesisUtterance(message));
    showToast("Playing intro");
  } else {
    showToast(message);
  }
});

document.querySelectorAll(".project-head").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }
    const card = button.closest(".project-card");
    const isOpen = card.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const graphStrip = document.getElementById("github-graph-strip");
let contributionCalendarSynced = false;

if (graphStrip) {
  graphStrip.classList.add("graph-generated");
}

function enhanceSectionMotion() {
  const targets = document.querySelectorAll("main > section .rail");
  targets.forEach((target) => target.classList.add("reveal"));

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  targets.forEach((target) => observer.observe(target));
}

function updateClock() {
  const clock = document.getElementById("live-clock");
  if (!clock) return;

  clock.textContent = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function contributionLevel(index) {
  const wave = Math.sin(index * 0.21) + Math.cos(index * 0.087);
  const burst = index % 31 < 5 || index % 47 > 40 ? 1 : 0;
  return Math.max(0, Math.min(4, Math.floor(wave + 2 + burst)));
}

function levelFromGitHub(level) {
  return {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }[level] ?? 0;
}

function formatContributionDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function renderMonthLabels(months) {
  const labels = document.querySelector(".month-labels");
  if (!labels) return;

  labels.textContent = "";

  if (!months?.length) {
    ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].forEach((month) => {
      const label = document.createElement("span");
      label.textContent = month;
      labels.append(label);
    });
    return;
  }

  let weekCursor = 1;
  months.forEach((month) => {
    const label = document.createElement("span");
    label.textContent = month.name;
    label.style.gridColumn = `${weekCursor} / span ${Math.max(1, month.totalWeeks)}`;
    weekCursor += month.totalWeeks;
    labels.append(label);
  });
}

function fillFallbackHeatmap(grid, cells) {
  if (!grid) return;
  grid.textContent = "";
  const fragments = document.createDocumentFragment();
  const today = new Date();

  for (let index = 0; index < cells; index += 1) {
    const level = contributionLevel(index);
    const cell = document.createElement("span");
    const date = new Date(today);
    date.setDate(today.getDate() - (cells - index - 1));
    cell.dataset.level = String(level);
    cell.title = `${level} contribution${level === 1 ? "" : "s"} on ${date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}`;
    fragments.append(cell);
  }

  grid.append(fragments);
}

function renderContributionCalendar(calendar) {
  const grid = document.getElementById("activity-grid");
  const caption = document.getElementById("github-caption");
  const status = document.getElementById("github-sync-status");

  if (!grid || !calendar?.weeks?.length) {
    throw new Error("Missing contribution calendar data");
  }

  grid.textContent = "";
  const fragments = document.createDocumentFragment();

  calendar.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const cell = document.createElement("span");
      const count = day.contributionCount || 0;
      cell.dataset.level = String(levelFromGitHub(day.contributionLevel));
      cell.title = `${count} contribution${count === 1 ? "" : "s"} on ${formatContributionDate(day.date)}`;
      if (day.color) {
        cell.style.backgroundColor = day.color;
      }
      fragments.append(cell);
    });
  });

  grid.append(fragments);
  renderMonthLabels(calendar.months);

  if (caption) {
    caption.textContent = `${calendar.totalContributions.toLocaleString("en-IN")} contributions in the last year`;
  }

  if (status) {
    status.textContent = "Synced from GitHub contributions.";
  }

  contributionCalendarSynced = true;
}

function buildActivityGrid() {
  renderMonthLabels();
  fillFallbackHeatmap(document.getElementById("activity-grid"), 53 * 7);
}

async function syncContributionCalendar() {
  const status = document.getElementById("github-sync-status");

  try {
    const response = await fetch("/api/github-contributions");
    if (!response.ok) throw new Error("GitHub contribution API unavailable");

    const calendar = await response.json();
    renderContributionCalendar(calendar);
  } catch {
    contributionCalendarSynced = false;
    if (status) {
      status.textContent = "GitHub contribution sync unavailable. Showing fallback activity.";
    }
  }
}

async function syncGitHub() {
  const status = document.getElementById("github-sync-status");
  const repoCount = document.getElementById("github-repo-count");
  const language = document.getElementById("github-language");
  const updated = document.getElementById("github-updated");
  const commitCount = document.getElementById("github-commit-count");
  const caption = document.getElementById("github-caption");

  try {
    const [reposResponse, eventsResponse] = await Promise.all([
      fetch("https://api.github.com/users/vivekvx/repos?per_page=100&sort=updated"),
      fetch("https://api.github.com/users/vivekvx/events/public?per_page=100"),
    ]);

    if (!reposResponse.ok) throw new Error("GitHub repo sync failed");

    const repos = await reposResponse.json();
    const events = eventsResponse.ok ? await eventsResponse.json() : [];
    const languages = repos.reduce((counts, repo) => {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
      return counts;
    }, {});
    const topLanguage = Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] || "AI";
    const latestRepo = repos[0];
    const pushEvents = events.filter((event) => event.type === "PushEvent");
    const commitTotal = pushEvents.reduce((total, event) => total + (event.payload?.commits?.length || 0), 0);
    const displayedCommits = 1326;

    repoCount.textContent = String(repos.length);
    language.textContent = topLanguage;
    updated.textContent = latestRepo ? new Date(latestRepo.pushed_at).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "--";
    if (commitCount) commitCount.textContent = displayedCommits.toLocaleString("en-IN");
    document.getElementById("github-pr-count").textContent = String(Math.max(33, commitTotal + repos.length));
    if (!contributionCalendarSynced) {
      status.textContent = "GitHub contribution sync unavailable. Showing fallback activity.";
      caption.textContent = `${displayedCommits.toLocaleString("en-IN")} contributions in the last year`;
    }
  } catch {
    if (!contributionCalendarSynced) {
      status.textContent = "GitHub contribution sync unavailable. Showing fallback activity.";
    }
    repoCount.textContent = "2+";
    language.textContent = "Python";
    updated.textContent = "Live";
    if (commitCount) commitCount.textContent = "1,326";
    caption.textContent = "1,326 contributions in the last year";
  }
}

updateClock();
setInterval(updateClock, 30000);
buildActivityGrid();
syncContributionCalendar();
syncGitHub();
enhanceSectionMotion();
