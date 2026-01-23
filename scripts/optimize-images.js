const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeBackgroundImage() {
  const inputPath = path.join(__dirname, '../public/image.png');
  const outputDir = path.join(__dirname, '../public');
  
  try {
    // 检查输入文件是否存在
    if (!fs.existsSync(inputPath)) {
      console.log('❌ Input image not found:', inputPath);
      return;
    }

    // 生成优化的WebP版本
    await sharp(inputPath)
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 70 })
      .toFile(path.join(outputDir, 'image-optimized.webp'));
    
    console.log('✅ Generated image-optimized.webp');

    // 生成移动端版本
    await sharp(inputPath)
      .resize(640, null, {
        withoutEnlargement: true,
        fit: 'cover'
      })
      .webp({ quality: 65 })
      .toFile(path.join(outputDir, 'image-mobile.webp'));
    
    console.log('✅ Generated image-mobile.webp');

    console.log('🎉 Image optimization complete!');
    console.log('💡 Update your components to use the optimized images');
    
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
  }
}

if (require.main === module) {
  optimizeBackgroundImage();
}

module.exports = optimizeBackgroundImage;