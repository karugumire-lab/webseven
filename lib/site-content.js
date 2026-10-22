import { readFileSync } from 'node:fs';

export const pageSlugs = [
  'about',
  'blog',
  'blog-post',
  'contact',
  'faq',
  'product',
  'products',
  'solutions',
];

export function getPageMarkup(file) {
  const source = readFileSync(`${process.cwd()}/content/pages/${file}`, 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  return body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '');
}
