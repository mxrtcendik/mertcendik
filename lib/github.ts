const repoPattern = /github\.com\/([^/]+)\/([^/#?]+)/;

export async function getGithubStars(url: string): Promise<number | null> {
  const match = url.match(repoPattern);
  if (!match) return null;

  const [, owner, repo] = match;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "cendik.dev",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (
      !data ||
      typeof data !== "object" ||
      !("stargazers_count" in data) ||
      typeof data.stargazers_count !== "number"
    ) {
      return null;
    }

    return data.stargazers_count;
  } catch {
    return null;
  }
}
