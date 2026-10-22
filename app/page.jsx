import SitePage from './site-page';
import { getPageMarkup } from '../lib/site-content';

export default function Home() {
  return <SitePage html={getPageMarkup('index.html')} />;
}
