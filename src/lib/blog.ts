import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  return (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) =>
      b.data.published.getTime() - a.data.published.getTime() ||
      a.id.localeCompare(b.id),
  );
}

export function postUrl(id: string) {
  return `/blog/${id.split("/").map(encodeURIComponent).join("/")}`;
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function readingTime(body = "") {
  return Math.max(
    1,
    Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 200),
  );
}
