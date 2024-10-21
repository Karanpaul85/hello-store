import { tagList } from "@/constant/common_constants";

export const revalidate = 30; // revalidate at most every hour

const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_BASE_URL_PROD
    : process.env.NEXT_PUBLIC_API_BASE_URL_DEV;

const EXTERNAL_DATA_URL = `${baseUrl}/api/allNewsData`;

function generateUrl(loc, lastmod, priority = 0.8) {
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
    </url>`;
}

function generateSiteMap(posts) {
  const currentDate = new Date().toISOString();
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${currentDate}</lastmod>
        <priority>1.00</priority>
      </url>
  `;

  // Generating URLs for 'hi' category
  sitemap += tagList.hi
    .map((item) => generateUrl(`${baseUrl}/hi/${item.category}`, currentDate))
    .join("");

  // Generating URLs for 'en' category
  sitemap += tagList.en
    .map((item) => generateUrl(`${baseUrl}/en/${item}`, currentDate))
    .join("");

  // Generating URLs for posts
  sitemap += posts
    .map(({ article_id, language, category, updatedAt }) =>
      generateUrl(
        `${baseUrl}/${language === "hindi" ? "hi" : "en"}/${
          category[0]
        }/${article_id}`,
        updatedAt
      )
    )
    .join("");

  sitemap += `</urlset>`;

  return sitemap;
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const request = await fetch(EXTERNAL_DATA_URL);
  const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  // No need to define an empty function
}
