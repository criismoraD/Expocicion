import fs from 'node:fs';
import path from 'node:path';

export const EXPECTED_DIAGRAMS = [
  'diagramas/00-sistema-completo.html',
  'diagramas/01-backoffice.html',
  'diagramas/02-portal-cliente.html',
  'diagramas/03-sitio-web.html',
  'diagramas/04-app-ventas.html',
];

const FORBIDDEN_STOCK_HOSTS = [
  'unsplash.com',
  'pexels.com',
  'shutterstock.com',
  'picsum.photos',
  'istockphoto.com',
  'gettyimages.com',
  'freepik.com',
  'placeholder.com',
];

export function extractSlides(html) {
  const matches = [];
  const regex = /<section\b([^>]*\bclass="[^"]*\bslide\b[^"]*"[^>]*)>([\s\S]*?)<\/section>/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const attrs = m[1];
    const body = m[2];
    const titleMatch = attrs.match(/data-title="([^"]+)"/);
    const sectionMatch = attrs.match(/data-section="([^"]+)"/);
    matches.push({
      attrs,
      body,
      title: titleMatch ? titleMatch[1] : null,
      section: sectionMatch ? sectionMatch[1] : null,
    });
  }
  return matches;
}

export function extractMediaRefs(slideHtml) {
  const images = [];
  const imgRegex = /<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g;
  let m;
  while ((m = imgRegex.exec(slideHtml)) !== null) {
    images.push(m[1]);
  }

  const iframes = [];
  const iframeRegex = /<iframe\b[^>]*\bdata-src="([^"]+)"[^>]*>/g;
  while ((m = iframeRegex.exec(slideHtml)) !== null) {
    iframes.push(m[1]);
  }

  function countElementsWithClass(html, className) {
    let count = 0;
    const tagRegex = /<[a-zA-Z][^>]*\bclass="([^"]+)"[^>]*>/g;
    let match;
    while ((match = tagRegex.exec(html)) !== null) {
      const tokens = match[1].trim().split(/\s+/);
      if (tokens.includes(className)) count++;
    }
    return count;
  }

  const shotCount = countElementsWithClass(slideHtml, 'shot');
  const diagramCount = countElementsWithClass(slideHtml, 'diagram-frame');
  const photoSlotCount = countElementsWithClass(slideHtml, 'photo-slot');

  return { images, iframes, shotCount, diagramCount, photoSlotCount };
}

export function validateDeck(html, baseDir) {
  const errors = [];
  const slides = extractSlides(html);

  if (slides.length === 0) {
    errors.push('No slides found in index.html');
    return { ok: false, slidesCount: 0, errors };
  }

  const embeddedDiagrams = new Set();

  slides.forEach((slide, idx) => {
    const num = idx + 1;
    if (!slide.title) {
      errors.push(`Slide ${num} is missing data-title`);
    }
    if (!slide.section) {
      errors.push(`Slide ${num} is missing data-section`);
    }

    const media = extractMediaRefs(slide.body);

    // One media item per slide rule (screenshot OR diagram OR photo slot, never multiple)
    const visualBlocks = media.shotCount + media.diagramCount + media.photoSlotCount;
    if (visualBlocks > 1) {
      errors.push(
        `Slide ${num} ("${slide.title}") has ${visualBlocks} media blocks (shots=${media.shotCount}, diagrams=${media.diagramCount}, photoSlots=${media.photoSlotCount}); must be at most 1 per slide`
      );
    }

    // Check every image path exists and is not a stock URL or static diagram PNG
    for (const src of media.images) {
      if (/^https?:\/\//i.test(src)) {
        errors.push(`Slide ${num} references external image URL: ${src}`);
        continue;
      }
      if (/diagrama-.*\.png$/i.test(src)) {
        errors.push(`Slide ${num} embeds a diagram as PNG instead of HTML iframe: ${src}`);
      }
      const cleanPath = src.split('?')[0].split('#')[0];
      const fullPath = path.join(baseDir, cleanPath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Slide ${num} references missing image file: ${src}`);
      }
    }

    // Check every diagram iframe path exists and uses theme=light
    for (const src of media.iframes) {
      const cleanPath = src.split('?')[0].split('#')[0];
      embeddedDiagrams.add(cleanPath);
      const fullPath = path.join(baseDir, cleanPath);
      if (!fs.existsSync(fullPath)) {
        errors.push(`Slide ${num} references missing diagram HTML: ${cleanPath}`);
      }
      if (!src.includes('theme=light')) {
        errors.push(`Slide ${num} diagram iframe missing theme=light parameter: ${src}`);
      }
    }
  });

  // Ensure all 6 DIAGRAMAS_CEA HTML files are embedded
  for (const expected of EXPECTED_DIAGRAMS) {
    if (!embeddedDiagrams.has(expected)) {
      errors.push(`Missing embedded HTML diagram: ${expected}`);
    }
  }

  // Ensure no stock image domains appear anywhere
  const lower = html.toLowerCase();
  for (const host of FORBIDDEN_STOCK_HOSTS) {
    if (lower.includes(host)) {
      errors.push(`Forbidden stock photo host found in HTML: ${host}`);
    }
  }

  return {
    ok: errors.length === 0,
    slidesCount: slides.length,
    embeddedDiagramsCount: embeddedDiagrams.size,
    errors,
  };
}
