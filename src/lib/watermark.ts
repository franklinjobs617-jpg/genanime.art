import sharp from 'sharp';

export async function addWatermark(imageBuffer: Buffer, text: string = "AnimeAI"): Promise<Buffer> {
    try {
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();

        if (!metadata.width || !metadata.height) {
            return imageBuffer;
        }

        const width = metadata.width;
        const height = metadata.height;

        // Create a dynamic SVG for the watermark
        // Text at bottom right, semi-transparent white
        const fontSize = Math.floor(width * 0.05); // 5% of width
        const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
        .title { fill: rgba(255, 255, 255, 0.5); font-size: ${fontSize}px; font-weight: bold; font-family: sans-serif; }
      </style>
      <text x="${width - 16}" y="${height - 16}" text-anchor="end" class="title">${text}</text>
    </svg>
    `;

        const buffer = await image
            .composite([
                {
                    input: Buffer.from(svgImage),
                    top: 0,
                    left: 0,
                },
            ])
            .toBuffer();

        return buffer;
    } catch (error) {
        console.error("Error adding watermark:", error);
        return imageBuffer; // Return original if watermark fails
    }
}
