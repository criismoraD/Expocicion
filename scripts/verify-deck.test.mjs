import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractSlides, extractMediaRefs, validateDeck, EXPECTED_DIAGRAMS } from './deck-validator.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckDir = path.resolve(__dirname, '..', 'presentacion-html');
const indexPath = path.join(deckDir, 'index.html');

test('extractSlides parses section attributes cleanly', () => {
  const sample = `
    <section class="slide active" data-title="Portada" data-section="Inicio"><p>Hola</p></section>
    <section class="slide" data-title="Tema 2" data-section="Cuerpo"><div class="shot"><img src="assets/logo-cea.webp" alt="Logo"></div></section>
  `;
  const slides = extractSlides(sample);
  assert.equal(slides.length, 2);
  assert.equal(slides[0].title, 'Portada');
  assert.equal(slides[1].section, 'Cuerpo');
  const refs = extractMediaRefs(slides[1].body);
  assert.deepEqual(refs.images, ['assets/logo-cea.webp']);
  assert.equal(refs.shotCount, 1);
});

test('validateDeck catches multiple images or diagram PNGs on one slide', () => {
  const badHtml = `
    <section class="slide" data-title="Bad" data-section="Test">
      <div class="shot"><img src="assets/backoffice.png" alt="A"></div>
      <div class="shot"><img src="assets/diagrama-backoffice.png" alt="B"></div>
    </section>
  `;
  const res = validateDeck(badHtml, deckDir);
  assert.equal(res.ok, false);
  assert.ok(res.errors.some((e) => e.includes('has 2 media blocks')));
  assert.ok(res.errors.some((e) => e.includes('embeds a diagram as PNG')));
});

test('production presentation index.html satisfies all structural and media rules', () => {
  const html = fs.readFileSync(indexPath, 'utf8');
  const res = validateDeck(html, deckDir);
  assert.equal(res.ok, true, `Validation errors:\n${res.errors.join('\n')}`);
  assert.equal(res.embeddedDiagramsCount, EXPECTED_DIAGRAMS.length);
  assert.equal(res.slidesCount, 28, `Expected 28 slides in 3-question structure, got ${res.slidesCount}`);
  for (const url of [
    'https://admin.grupoceaperu.com/',
    'https://portal.grupoceaperu.com/',
    'https://grupoceaperu.com/',
    'https://cea-crm-backend-914895036295.southamerica-east1.run.app/docs',
  ]) {
    assert.ok(html.includes(url), `Expected live production link: ${url}`);
  }
  assert.ok(html.includes('AGENTS.md') && html.includes('VERSION_BACKOFFICE'), 'Expected AGENTS.md governance slide with unified VX.YY versioning');
  assert.ok(html.includes('OpenCode') && html.includes('Antigravity'), 'Expected AI agents OpenCode and Antigravity');
  assert.ok(html.includes('Google Meet') && html.includes('ficheros físicos'), 'Expected manual operation and physical contract files diagnosis');
  assert.ok(html.includes('cronograma') && !html.toLowerCase().includes('inercia'), 'Expected cronograma guide in Block 3 without negative inercia wording');
  assert.ok(
    html.includes('assets/evidencia-agenda-cea.jpg') &&
      html.includes('assets/evidencia-contratos-mano.jpg') &&
      html.includes('assets/evidencia-ficheros-cea.jpg'),
    'Expected real office evidence photos on Slides 06 and 07'
  );
  assert.ok(!/ferreter|miniapp|05-miniapp/i.test(html), 'Expected zero references to ferreteria or miniapp in index.html');
  assert.ok(html.includes('beforeprint') && html.includes('cea-deck-key'), 'Expected PDF beforeprint preload and iframe keyboard forwarding');
  assert.ok(
    html.includes('assets/backoffice.png') && html.includes('assets/portal.png') && html.includes('assets/sitio-web.png'),
    'Expected Plan B offline backup captures on Demo slide'
  );
  for (const diag of EXPECTED_DIAGRAMS) {
    const diagHtml = fs.readFileSync(path.join(deckDir, diag), 'utf8');
    assert.ok(!/ferreter|miniapp|05-miniapp/i.test(diagHtml), `Expected zero references to ferreteria or miniapp in ${diag}`);
    assert.ok(diagHtml.includes('cea-deck-key'), `Expected iframe keyboard forwarding script in ${diag}`);
  }
});
