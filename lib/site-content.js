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

function siteHeader(page) {
  const current = (slug) => (page === slug || (slug === 'blog' && page === 'blog-post') ? ' aria-current="page"' : '');

  return `<div class="site-announcement">Press-on nail collections, made for your brand <a href="contact.html" data-enquire>Start a conversation</a></div>
<header class="site-header">
  <div class="wrap nav">
    <a class="logo" href="index.html" aria-label="Sevenail home"><span class="logo-mark" aria-hidden="true">S</span>Sevenail</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">Menu</button>
    <ul class="menu" id="menu">
      <li class="has-sub"><a href="products.html"${current('products') || current('product')}>Collections</a>
        <ul class="sub">
          <li><a href="products.html#cat-1">Classic &amp; solid</a></li>
          <li><a href="products.html#cat-2">French &amp; minimal</a></li>
          <li><a href="products.html#cat-3">Fashion &amp; embellished</a></li>
          <li><a href="products.html#cat-4">3D sculpted</a></li>
          <li><a href="products.html#cat-5">Special finishes</a></li>
        </ul>
      </li>
      <li class="has-sub"><a href="solutions.html"${current('solutions')}>What we do</a>
        <ul class="sub">
          <li><a href="solutions.html#OEM/ODM">OEM / ODM</a></li>
          <li><a href="solutions.html#custom-design">Custom design</a></li>
          <li><a href="solutions.html#private-label">Private label</a></li>
          <li><a href="solutions.html#packaging">Custom packaging</a></li>
        </ul>
      </li>
      <li><a href="about.html"${current('about')}>Our studio</a></li>
      <li><a href="blog.html"${current('blog')}>Journal</a></li>
      <li><a href="contact.html"${current('contact')}>Contact</a></li>
    </ul>
    <a class="btn" href="contact.html" data-enquire>Request a quote <span aria-hidden="true">↗</span></a>
  </div>
</header>`;
}

function siteFooter() {
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer-callout">
      <p class="footer-kicker">YOUR IDEA, OUR STUDIO</p>
      <h2>Let’s make something worth wearing.</h2>
      <p>Share your direction. We’ll help you shape the collection.</p>
      <a class="footer-cta" href="contact.html" data-enquire>Start a conversation <span aria-hidden="true">↗</span></a>
    </div>
    <div class="foot">
      <div class="footer-brand">
        <a class="logo" href="index.html"><span class="logo-mark" aria-hidden="true">S</span>Sevenail</a>
        <p class="footer-brand-copy">Press-on nail manufacturing for brands building their next collection.</p>
        <div class="social">
          <a href="https://www.linkedin.com/company/143914966/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61594726078919" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://www.instagram.com/sevenail_factory/" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.tiktok.com/@sevenail_factory" target="_blank" rel="noopener" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
        </div>
      </div>
      <div><h3>Collections</h3><ul>
        <li><a href="products.html#cat-1">Classic &amp; solid</a></li>
        <li><a href="products.html#cat-2">French &amp; minimal</a></li>
        <li><a href="products.html#cat-3">Fashion &amp; embellished</a></li>
        <li><a href="products.html#cat-4">3D sculpted</a></li>
        <li><a href="products.html#cat-5">Special finishes</a></li>
      </ul></div>
      <div><h3>Services</h3><ul>
        <li><a href="solutions.html#OEM/ODM">OEM / ODM</a></li>
        <li><a href="solutions.html#custom-design">Custom design</a></li>
        <li><a href="solutions.html#private-label">Private label</a></li>
        <li><a href="solutions.html#packaging">Custom packaging</a></li>
        <li><a href="solutions.html#wholesale">Wholesale / B2B</a></li>
      </ul></div>
      <div><h3>Say hello</h3><ul class="contact-list">
        <li><a href="mailto:aaron@seungilchem.com">aaron@seungilchem.com</a></li>
        <li><a href="about.html">About Sevenail</a></li>
        <li><a href="faq.html">Frequently asked questions</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul></div>
    </div>
    <p class="copy">© <span class="yr"></span> Sevenail. All rights reserved.</p>
  </div>
</footer>`;
}

export function getPageMarkup(file) {
  const source = readFileSync(`${process.cwd()}/content/pages/${file}`, 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  const page = file.replace(/\.html$/i, '').replace(/^index$/, 'home');
  const content = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*\/>/gi, '')
    .replace(/<dialog\b[^>]*>[\s\S]*?<\/dialog\s*>/gi, '')
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, '')
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, '');

  return `${siteHeader(page)}${content}${siteFooter()}`;
}

const productCategories = {
  1: ['Classic & solid', 'CLASSIC COLOR'],
  2: ['French & minimal', 'MINIMAL DESIGN'],
  3: ['Fashion & embellished', 'STUDIO DESIGN'],
  4: ['3D sculpted', '3D SCULPTED'],
  5: ['Special finishes', 'SPECIAL FINISH'],
};

function readProducts() {
  const source = readFileSync(`${process.cwd()}/content/pages/products.html`, 'utf8');
  return [...source.matchAll(/<a class="catalog-card"([^>]*)>([\s\S]*?)<\/a>/g)].map(([, attrs, card]) => {
    const code = card.match(/<span>([A-Z]{2}\d{2})<\/span>/)?.[1];
    const category = attrs.match(/data-category="(\d+)"/)?.[1];
    const image = card.match(/class="catalog-image-primary" src="([^"]+)"/)?.[1];
    const title = card.match(/<h3>([\s\S]*?)<\/h3>/)?.[1]?.replace(/&amp;/g, '&');
    return code && category && image && title ? { code, category, image, title } : null;
  }).filter(Boolean);
}

export function getProductCodes() {
  return readProducts().map(({ code }) => code);
}

export function getProductPageMarkup(code) {
  const product = readProducts().find((item) => item.code === code);
  if (!product) return null;

  const [categoryName, categoryLabel] = productCategories[product.category];
  const source = readFileSync(`${process.cwd()}/content/pages/product.html`, 'utf8');
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';
  let content = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/i, '')
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/i, '');

  content = content
    .replace(/<a href="products\.html#cat-4">3D sculpted<\/a>/, `<a href="products.html#cat-${product.category}">${categoryName}</a>`)
    .replace(/>PB01<\/nav>/, `>${product.code}</nav>`)
    .replace(/PB01 nail design sample/g, `${product.code} nail design sample`)
    .replace(/src="\/assets\/products\/pb-3d-sculpted\/PB01\.JPG"/g, `src="${product.image}"`)
    .replace(/Glossy black press-on nail sample decorated with sculpted red hearts/g, `${product.title}, style ${product.code}`)
    .replace(/<span>PB · 01<\/span>/, `<span>${product.code.slice(0, 2)} · ${product.code.slice(2)}</span>`)
    .replace(/A sculptural heart motif in high contrast black and red\./, `${product.title} from the ${categoryName.toLowerCase()} collection.`)
    .replace(/3D SCULPTED &nbsp;·&nbsp; STUDIO SAMPLE PB01/, `${categoryLabel} &nbsp;·&nbsp; STUDIO SAMPLE ${product.code}`)
    .replace(/3D sculpted<br>press-on nails/, `${product.title}<br>press-on nails`)
    .replace(/A glossy black base meets raised red heart accents\. Build on this studio sample with a color story, finish and signature detail shaped for your brand\./, `Use this ${product.title.toLowerCase()} design as a starting point for your collection. Adjust the shape, colors, finish and details to suit your brand.`)
    .replace(/Style PB01 \/ 3D sculpted press-on nails/g, `Style ${product.code} / ${product.title}`)
    .replace(/Sculpted embellishments give a nail design texture, depth and a memorable focal point\. This studio sample is one direction; color, artwork and finish can be developed around your brief\./, `This ${categoryName.toLowerCase()} studio sample is one direction for your range. Color, artwork and finish can be developed around your brief.`)
    .replace(/PB01 is a studio design reference\./, `${product.code} is a studio design reference.`);

  return `${siteHeader('product')}${content}${siteFooter()}`.replace(
    /href="(index|products|contact|solutions|about|faq|blog|product|blog-post)\.html/g,
    'href="/$1.html',
  );
}
