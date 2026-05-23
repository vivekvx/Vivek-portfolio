const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_LOGIN = "vivekvx";

const contributionQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionYears
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

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return json(res, 405, { error: "method_not_allowed" });
  }

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return json(res, 500, { error: "missing_token" });
  }

  const to = new Date();
  const from = new Date(to);
  from.setFullYear(to.getFullYear() - 1);

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "vivekvx-portfolio",
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

    if (payload.errors?.length || !payload.data?.user) {
      throw new Error("GitHub GraphQL returned an invalid contribution payload");
    }

    const calendar = payload.data.user.contributionsCollection.contributionCalendar;

    return json(res, 200, {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
      months: calendar.months,
      years: payload.data.user.contributionYears,
      generatedAt: new Date().toISOString(),
    });
  } catch {
    return json(res, 503, { error: "github_unavailable" });
  }
};
