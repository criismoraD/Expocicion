import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateDeck } from './deck-validator.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const deckDir = path.resolve(__dirname, '..', 'presentacion-html');
const indexPath = path.join(deckDir, 'index.html');

const html = fs.readFileSync(indexPath, 'utf8');
const result = validateDeck(html, deckDir);

if (!result.ok) {
  console.error('Deck validation failed:');
  for (const err of result.errors) {
    console.error(`  - ${err}`);
  }
  process.exit(1);
}

console.log(
  `Deck validated successfully: ${result.slidesCount} slides, ${result.embeddedDiagramsCount} embedded HTML diagrams, 0 errors.`
);
