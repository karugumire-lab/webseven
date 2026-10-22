import { readFileSync } from 'node:fs';
import { notFound } from 'next/navigation';
import SitePage from '../site-page';

const pages = ['about', 'blog', 'blog-post', 'contact', 'faq', 'product', 'products', 'solutions'];

export function generateStaticParams() {
  return pages.map((page) => ({ page }));
}

function getBody(file) {
  return readFileSync(`${process.cwd()}/${file}`, 'utf8')
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '') ?? '';
}

export default async function Page({ params }) {
  const { page } = await params;
  if (!pages.includes(page)) notFound();
  return <SitePage html={getBody(`${page}.html`)} />;
}
