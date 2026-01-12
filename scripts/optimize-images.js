const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
    path.join(__dirname, '../public/features'),
];

async function optimizeImages() {
    console.log('Starting image optimization...');

    for (const dir of directories) {
        if (!fs.existsSync(dir)) continue;

        const files = fs.readdirSync(dir);

        for (const file of files) {
            if (!file.match(/\.(png|jpg|jpeg)$/i)) continue;

            const inputPath = path.join(dir, file);
            const outputPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

            // Skip if webp already exists and is newer
            if (fs.existsSync(outputPath)) {
                // optional: check timestamps
                continue;
            }

            console.log(`Optimizing: ${file} -> .webp`);

            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);

                console.log(`✅ Converted ${file}`);
            } catch (err) {
                console.error(`❌ Failed to convert ${file}:`, err);
            }
        }
    }
    console.log('Optimization complete!');
}

optimizeImages();
