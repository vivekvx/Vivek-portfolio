const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_LOGIN = "vivekvx";
const GITHUB_PROFILE_ENDPOINT = "https://api.github.com/users/vivekvx";
const GITHUB_REPOS_ENDPOINT =
  "https://api.github.com/users/vivekvx/repos?per_page=100&type=owner&sort=pushed";

const contributionQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          months {
            name
            firstDay
            totalWeeks
            year
          }
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

export type GitHubRepository = {
  fork: boolean;
  language: string | null;
  pushed_at: string | null;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
};

export type GitHubContributionCalendar =
  | {
      available: true;
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          date: string;
          contributionCount: number;
          contributionLevel: string;
          color: string;
          weekday: number;
        }>;
      }>;
      months: Array<{
        name: string;
        firstDay: string;
        totalWeeks: number;
        year: number;
      }>;
    }
  | {
      available: false;
      reason: string;
      message?: string;
    };

export function buildHeaders(token?: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vivekvx-portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export function summarizeRepositories(repositories: GitHubRepository[]) {
  const ownedRepositories = repositories.filter((repo) => !repo.fork);
  const latestPush = ownedRepositories[0]?.pushed_at || repositories[0]?.pushed_at || null;
  const languageCounts = ownedRepositories.reduce<Record<string, number>>((counts, repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
    return counts;
  }, {});

  const topLanguage =
    Object.entries(languageCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || null;

  return {
    latestPush,
    topLanguage,
    recentRepositories: ownedRepositories.slice(0, 4).map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at,
    })),
  };
}

export async function fetchContributionCalendar(token?: string): Promise<GitHubContributionCalendar> {
  if (!token) {
    return {
      available: false,
      reason: "missing_token",
    };
  }

  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      ...buildHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: contributionQuery,
      variables: {
        login: GITHUB_LOGIN,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL failed with ${response.status}`);
  }

  const payload = await response.json();
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (payload.errors?.length || !calendar) {
    throw new Error("GitHub GraphQL returned an invalid contribution payload");
  }

  return {
    available: true,
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks,
    months: calendar.months,
  };
}

export async function fetchGitHubSnapshot() {
  const token = process.env.GITHUB_TOKEN;
  const headers = buildHeaders(token);

  const [profileResponse, reposResponse, contributionCalendar] = await Promise.all([
    fetch(GITHUB_PROFILE_ENDPOINT, {
      headers,
      next: { revalidate: 900 },
    }),
    fetch(GITHUB_REPOS_ENDPOINT, {
      headers,
      next: { revalidate: 900 },
    }),
    fetchContributionCalendar(token).catch((error) => ({
      available: false,
      reason: "github_unavailable",
      message: error instanceof Error ? error.message : "Unknown GitHub error",
    })),
  ]);

  if (!profileResponse.ok || !reposResponse.ok) {
    throw new Error("GitHub public profile sync failed");
  }

  const [profile, repositories] = await Promise.all([profileResponse.json(), reposResponse.json()]);
  const summary = summarizeRepositories(repositories);

  return {
    profile: {
      login: profile.login || GITHUB_LOGIN,
      url: profile.html_url || `https://github.com/${GITHUB_LOGIN}`,
      publicRepos: profile.public_repos ?? summary.recentRepositories.length,
      followers: profile.followers ?? 0,
    },
    summary: {
      topLanguage: summary.topLanguage,
      lastPush: summary.latestPush,
    },
    repositories: summary.recentRepositories,
    contributionCalendar,
    generatedAt: new Date().toISOString(),
  };
}
