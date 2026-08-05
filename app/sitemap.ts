import { MetadataRoute } from "next";

import { calculators } from "@/data/calculators";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://klinlist.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/calculators`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const calculatorPages: MetadataRoute.Sitemap = calculators.map((calc) => ({
    url: `${siteUrl}/calculators/${calc.id}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...calculatorPages];
}
