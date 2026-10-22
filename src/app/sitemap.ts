import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1 },
  { path: "/services/", priority: 0.9 },
  { path: "/fleet-operators/", priority: 0.8 },
  { path: "/contact/", priority: 0.8 },
  { path: "/gallery/", priority: 0.6 },
  { path: "/about/", priority: 0.6 },
  { path: "/faq/", priority: 0.6 },
  { path: "/privacy/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
