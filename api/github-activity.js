const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_LOGIN = "vivekvx";
const GITHUB_PROFILE_ENDPOINT = "https://api.github.com/users/vivekvx";
const GITHUB_REPOS_ENDPOINT = "https://api.github.com/users/vivekvx/repos?per_page=100&type=owner&sort=pushed";

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

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");
  res.end(JSON.stringify(payload));
}

function buildHeaders(token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "vivekvx-portfolio",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function summarizeRepositories(repositories) {
  const ownedRepositories = repositories.filter((repo) => !repo.fork);
  const latestPush = ownedRepositories[0]?.pushed_at || repositories[0]?.pushed_at || null;
  const languageCounts = ownedRepositories.reduce((counts, repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
    return counts;
  }, {});

  const topLanguage = Object.entries(languageCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || null;

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

async function fetchContributionCalendar(token) {
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

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "method_not_allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  const headers = buildHeaders(token);

  try {
    const [profileResponse, reposResponse, contributionCalendar] = await Promise.all([
      fetch(GITHUB_PROFILE_ENDPOINT, { headers }),
      fetch(GITHUB_REPOS_ENDPOINT, { headers }),
      fetchContributionCalendar(token).catch((error) => ({
        available: false,
        reason: "github_unavailable",
        message: error.message,
      })),
    ]);

    if (!profileResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub public profile sync failed");
    }

    const [profile, repositories] = await Promise.all([
      profileResponse.json(),
      reposResponse.json(),
    ]);

    const summary = summarizeRepositories(repositories);

    return json(res, 200, {
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
    });
  } catch {
    return json(res, 503, { error: "github_unavailable" });
  }
};
