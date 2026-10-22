import { readFileSync } from 'node:fs';
import SitePage from './site-page';

function getBody(file) {
  return readFileSync(`${process.cwd()}/${file}`, 'utf8')
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '') ?? '';
}

export default function Home() {
  return <SitePage html={getBody('index.html')} />;
}
