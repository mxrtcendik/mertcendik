import { ogPosts } from "@/lib/og-posts";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// View counts for posts, stored in D1 (see migrations/0001_views.sql).
// GET reads a count, POST adds one view and returns the new count.

const headers = { "Cache-Control": "no-store" };

async function database() {
  const { env } = await getCloudflareContext({ async: true });
  return env.VIEWS_DB;
}

// Only real posts get a row, so nobody can fill the table with made-up slugs.
function isPost(slug: string) {
  return Object.hasOwn(ogPosts, slug);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!isPost(slug))
    return Response.json({ error: "Not found" }, { status: 404 });

  const db = await database();
  const row = await db
    .prepare("SELECT count FROM views WHERE slug = ?")
    .bind(slug)
    .first<{ count: number }>();

  return Response.json({ count: row?.count ?? 0 }, { headers });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!isPost(slug))
    return Response.json({ error: "Not found" }, { status: 404 });

  // One statement, so two visits at the same moment both count.
  const db = await database();
  const row = await db
    .prepare(
      `INSERT INTO views (slug, count) VALUES (?, 1)
       ON CONFLICT (slug) DO UPDATE SET count = count + 1
       RETURNING count`
    )
    .bind(slug)
    .first<{ count: number }>();

  return Response.json({ count: row?.count ?? 1 }, { headers });
}
