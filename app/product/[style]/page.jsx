import { notFound } from 'next/navigation';
import SitePage from '../../site-page';
import { getProductCodes, getProductPageMarkup } from '../../../lib/site-content';

export function generateStaticParams() {
  return getProductCodes().map((style) => ({ style }));
}

export default async function ProductPage({ params }) {
  const { style } = await params;
  const html = getProductPageMarkup(style);
  if (!html) notFound();
  return <SitePage html={html} />;
}
