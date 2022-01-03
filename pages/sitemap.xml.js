import React from "react";
// import fs from "fs";
import instance from "./../components/utils/Interceptor";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = "https://dyk.digital";


  const request = await instance.get(process.env.REACT_APP_API_URL + '/api/posts');
  const documents = request.data || [];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      ${documents
        .map((post) => {
          return `
              <url>
                <loc>${baseUrl}/posts/${post.id}</loc>
                <lastmod>${post.created_at}</lastmod>
                <changefreq>daily</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;