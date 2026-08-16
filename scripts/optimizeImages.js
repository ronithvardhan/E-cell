import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgDir = path.resolve(__dirname, '../public/images');

function optimizeDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      optimizeDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const outputWebp = path.join(dir, path.basename(fullPath, ext) + '.webp');
        sharp(fullPath)
          .resize({ width: 1600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputWebp)
          .then(() => console.log(`Optimized: ${dirent.name} -> ${path.basename(outputWebp)}`))
          .catch(console.error);
      }
    }
  });
}

if (fs.existsSync(imgDir)) {
  optimizeDirectory(imgDir);
} else {
  console.log('No public/images directory found.');
}
