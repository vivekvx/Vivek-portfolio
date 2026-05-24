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
const DEFAULT_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const CONTRIBUTION_GRID_CELLS = 53 * 7;

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

function formatShortDate(value, options = { month: "short", day: "numeric", year: "numeric" }) {
  if (!value) return "--";
  return new Date(value).toLocaleDateString("en-IN", options);
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
    DEFAULT_MONTHS.forEach((month) => {
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

function setTextContent(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
}

function renderContributionUnavailable(message) {
  const grid = document.getElementById("activity-grid");
  const caption = document.getElementById("github-caption");
  const note = document.getElementById("github-calendar-note");

  if (!grid) return;

  grid.textContent = "";
  const fragments = document.createDocumentFragment();

  for (let index = 0; index < CONTRIBUTION_GRID_CELLS; index += 1) {
    const cell = document.createElement("span");
    cell.dataset.level = "0";
    cell.title = message;
    fragments.append(cell);
  }

  grid.append(fragments);
  renderMonthLabels();

  if (caption) {
    caption.textContent = "Live public GitHub snapshot";
  }

  if (note) {
    note.textContent = message;
  }
}

function renderContributionCalendar(calendar) {
  const grid = document.getElementById("activity-grid");
  const caption = document.getElementById("github-caption");
  const note = document.getElementById("github-calendar-note");

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

  if (note) {
    note.textContent = "Contribution calendar synced from GitHub's last 12 months of public activity.";
  }
}

function renderRepositoryList(repositories) {
  const list = document.getElementById("github-repo-list");
  if (!list) return;

  list.textContent = "";

  if (!repositories?.length) {
    const empty = document.createElement("p");
    empty.className = "github-repo-empty";
    empty.textContent = "Repository details are unavailable right now. Open GitHub to browse the latest work.";
    list.append(empty);
    return;
  }

  repositories.forEach((repo) => {
    const item = document.createElement("a");
    item.className = "github-repo-item";
    item.href = repo.url;
    item.target = "_blank";
    item.rel = "noreferrer";

    const title = document.createElement("strong");
    title.textContent = repo.name;

    const description = document.createElement("p");
    description.textContent = repo.description || "No public description provided.";

    const meta = document.createElement("small");
    const parts = [];
    if (repo.language) parts.push(repo.language);
    if (typeof repo.stars === "number") parts.push(`${repo.stars} star${repo.stars === 1 ? "" : "s"}`);
    if (repo.pushedAt) parts.push(`Updated ${formatShortDate(repo.pushedAt, { month: "short", day: "numeric", year: "numeric" })}`);
    meta.textContent = parts.join(" · ");

    item.append(title, description, meta);
    list.append(item);
  });
}

function renderGitHubActivity(snapshot) {
  const profileLink = document.getElementById("github-profile-link");
  const status = document.getElementById("github-sync-status");

  setTextContent("github-public-repo-count", String(snapshot.profile.publicRepos ?? "--"));
  setTextContent("github-follower-count", String(snapshot.profile.followers ?? "--"));
  setTextContent("github-last-push", snapshot.summary.lastPush ? formatShortDate(snapshot.summary.lastPush, { month: "short", day: "numeric", year: "numeric" }) : "--");
  setTextContent("github-top-language", snapshot.summary.topLanguage || "No dominant language yet");
  setTextContent("github-updated", snapshot.generatedAt ? `Synced ${formatShortDate(snapshot.generatedAt, { month: "short", day: "numeric" })}` : "Awaiting sync");

  if (profileLink && snapshot.profile.url) {
    profileLink.href = snapshot.profile.url;
  }

  renderRepositoryList(snapshot.repositories);

  if (snapshot.contributionCalendar?.available) {
    renderContributionCalendar(snapshot.contributionCalendar);
  } else {
    renderContributionUnavailable("Contribution calendar unavailable in this deployment. Open GitHub for the full yearly graph.");
  }

  if (status) {
    status.textContent = snapshot.contributionCalendar?.available
      ? "Live snapshot synced from GitHub."
      : "Profile data is live. Contribution calendar needs a server-side GitHub token.";
  }
}

async function syncGitHubActivity() {
  const status = document.getElementById("github-sync-status");

  try {
    const response = await fetch("/api/github-activity", {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("GitHub activity API unavailable");
    }

    const snapshot = await response.json();
    renderGitHubActivity(snapshot);
  } catch {
    renderContributionUnavailable("Contribution calendar unavailable in this deployment. Open GitHub for the full yearly graph.");
    renderRepositoryList([]);
    setTextContent("github-public-repo-count", "--");
    setTextContent("github-follower-count", "--");
    setTextContent("github-last-push", "--");
    setTextContent("github-top-language", "GitHub sync unavailable");
    setTextContent("github-updated", "Unavailable");
    if (status) {
      status.textContent = "Live GitHub snapshot unavailable right now. Open the profile link for the latest activity.";
    }
  }
}

updateClock();
setInterval(updateClock, 30000);
renderContributionUnavailable("Contribution calendar unavailable in this deployment. Open GitHub for the full yearly graph.");
syncGitHubActivity();
enhanceSectionMotion();
