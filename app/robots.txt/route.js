export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://cloud101.in/sitemap.xml
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
