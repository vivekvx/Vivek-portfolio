"use client";

import { useEffect, useState } from "react";

import { formatShortDate } from "@/lib/utils";

type Snapshot = {
  profile: {
    login: string;
    url: string;
    publicRepos: number;
    followers: number;
  };
  summary: {
    topLanguage: string | null;
    lastPush: string | null;
  };
  repositories: Array<{
    name: string;
    url: string;
    description: string | null;
    language: string | null;
    stars: number;
    pushedAt: string | null;
  }>;
  contributionCalendar:
    | {
        available: true;
        totalContributions: number;
        months: Array<{ name: string; totalWeeks: number }>;
        weeks: Array<{
          contributionDays: Array<{
            date: string;
            contributionCount: number;
            contributionLevel: string;
            color: string;
          }>;
        }>;
      }
    | {
        available: false;
        reason: string;
        message?: string;
      };
  generatedAt: string;
};

const DEFAULT_MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
const EMPTY_CELLS = Array.from({ length: 53 * 7 });

function levelFromGitHub(level: string) {
  return {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }[level] ?? 0;
}

export function GitHubActivitySection() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-activity", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub activity API unavailable");
        return response.json();
      })
      .then((data: Snapshot) => {
        if (!cancelled) setSnapshot(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const contributionCalendar = snapshot?.contributionCalendar;
  const contributionAvailable = contributionCalendar?.available;
  const contributionDays = contributionAvailable
    ? contributionCalendar.weeks.flatMap((week) => week.contributionDays)
    : [];
  const visibleMonths = contributionAvailable
    ? contributionCalendar.months.slice(-3).map((month) => month.name)
    : DEFAULT_MONTHS.slice(-3);
  const currentYear = contributionAvailable
    ? new Date(contributionDays[contributionDays.length - 1]?.date ?? new Date().toISOString()).getFullYear()
    : new Date().getFullYear();

  return (
    <section className="github-sync full-row" id="github-sync">
      <div className="rail coding-section">
        <h2>Coding Activity</h2>
        <div className="github-chart-card">
          <div className="github-hero-row">
            <div className="github-identity">
              <span className="github-badge">
                <img src="/assets/icons/github.svg" alt="" aria-hidden="true" />
              </span>
              <div className="github-hero-copy">
                <h3>GitHub</h3>
                <p>
                  <strong>
                    {contributionAvailable
                      ? contributionCalendar.totalContributions.toLocaleString("en-IN")
                      : "--"}
                  </strong>{" "}
                  <span>{currentYear}</span> <em>Commits</em>
                </p>
              </div>
            </div>
          </div>

          <div className="github-stat-row" aria-label="GitHub profile snapshot">
            <article className="github-stat">
              <span>Public repos</span>
              <strong>{snapshot?.profile.publicRepos ?? "--"}</strong>
            </article>
            <article className="github-stat">
              <span>Followers</span>
              <strong>{snapshot?.profile.followers ?? "--"}</strong>
            </article>
            <article className="github-stat">
              <span>Latest push</span>
              <strong>{formatShortDate(snapshot?.summary.lastPush)}</strong>
            </article>
          </div>

          <div className="github-chart-layout">
            <div className="contribution-panel">
              <p className="github-section-note">
                Server-backed profile stats and repositories. The contribution calendar appears when this deployment has a GitHub token configured.
              </p>
              <div className="calendar-wrap">
                <div className="weekday-labels" aria-hidden="true">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div className="calendar-area">
                  <div className="github-graph-strip graph-generated">
                    <div className="github-graph-content">
                      <div className="month-labels" aria-hidden="true">
                        {visibleMonths.map((month, index) => (
                          <span key={`${month}-${index}`}>{month}</span>
                        ))}
                      </div>
                      <div className="activity-grid" aria-label="GitHub contribution activity graph">
                        {contributionAvailable
                          ? contributionCalendar.weeks.flatMap((week) =>
                              week.contributionDays.map((day) => (
                                <span
                                  key={day.date}
                                  data-level={levelFromGitHub(day.contributionLevel)}
                                  title={`${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formatShortDate(day.date)}`}
                                  style={day.color ? { backgroundColor: day.color } : undefined}
                                />
                              )),
                            )
                          : EMPTY_CELLS.map((_, index) => <span key={index} data-level={0} />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contribution-footer">
                <span className="contribution-count-line">
                  {contributionAvailable
                    ? `${contributionCalendar.totalContributions.toLocaleString("en-IN")} contributions in ${currentYear}`
                    : "Contribution calendar unavailable in this deployment. Open GitHub for the full yearly graph."}
                </span>
                <div className="contribution-legend" aria-label="Contribution intensity legend">
                  <span>Less</span>
                  <i data-level="0" />
                  <i data-level="1" />
                  <i data-level="2" />
                  <i data-level="3" />
                  <i data-level="4" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          <div className="activity-meta-row">
            <p><strong>{snapshot?.summary.topLanguage || "No dominant language yet"}</strong> appears most often across Vivek&apos;s recent public repositories.</p>
            <span className="oss-chip">
              <b>⌘</b>
              <em>{snapshot?.generatedAt ? `Synced ${formatShortDate(snapshot.generatedAt, { month: "short", day: "numeric" })}` : "Awaiting sync"}</em>
            </span>
            <span>
              {failed
                ? "Live GitHub snapshot unavailable right now. Open the profile link for the latest activity."
                : contributionAvailable
                  ? "Live snapshot synced from GitHub."
                  : "Profile data is live. Contribution calendar needs a server-side GitHub token."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
