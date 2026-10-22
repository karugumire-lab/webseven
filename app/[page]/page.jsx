import { notFound } from 'next/navigation';
import SitePage from '../site-page';
import { getPageMarkup, pageSlugs } from '../../lib/site-content';

export function generateStaticParams() {
  return pageSlugs.map((page) => ({ page }));
}

export default async function Page({ params }) {
  const { page } = await params;
  if (!pageSlugs.includes(page)) notFound();
  return <SitePage html={getPageMarkup(`${page}.html`)} />;
}
