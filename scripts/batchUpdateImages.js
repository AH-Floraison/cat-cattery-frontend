// scripts/batchUpdateImages.js
const path = require('path');
const fs = require('fs');
const db = require('../models'); // 自动加载 models/index.js

// 1. 环境图片映射
const environmentMap = [
  { key: 'main_hall', file: 'env-main-hall.png' },
  { key: 'spa', file: 'env-spa.png' },
  { key: 'medical', file: 'env-medical.png' },
  { key: 'nutrition', file: 'env-nutrition.png' },
  { key: 'kitten_area_a', file: 'env-kitten-area-a.png' },
  { key: 'kitten_area_b', file: 'env-kitten-area-b.png' }
];

// 2. 猫咪图片映射
const catMap = [
  { name_en: 'Kitten 1', file: 'kitten-1.png' },
  { name_en: 'Kitten 2', file: 'kitten-2.png' },
  { name_en: 'Kitten 3', file: 'kitten-3.png' }
];

// 3. 证书图片映射
const certMap = [
  { name_en: 'CFA Certificate', file: 'cert-cfa.png' },
  { name_en: 'TICA Certificate', file: 'cert-tica.png' }
];

// 4. logo图片
const logoList = [
  { name: 'logo-light', file: 'logo-light.jpg', is_active: true },
  { name: 'logo-dark', file: 'logo-dark.jpg', is_active: false }
];

const uploadsDir = path.join(__dirname, '../backend/uploads');

async function run() {
  // 1. 环境图片批量更新
  for (const env of environmentMap) {
    const imageUrl = `/uploads/${env.file}`;
    await db.Environment.update({ image_url: imageUrl }, { where: { key: env.key } });
    console.log(`环境图片已更新: ${env.key} -> ${imageUrl}`);
  }

  // 2. 猫咪图片批量更新
  for (const cat of catMap) {
    const imageUrl = `/uploads/${cat.file}`;
    await db.Cat.update({ image_url: imageUrl }, { where: { name_en: cat.name_en } });
    console.log(`猫咪图片已更新: ${cat.name_en} -> ${imageUrl}`);
  }

  // 3. 证书图片批量更新
  for (const cert of certMap) {
    const imageUrl = `/uploads/${cert.file}`;
    await db.Certificate.update({ image_url: imageUrl }, { where: { name_en: cert.name_en } });
    console.log(`证书图片已更新: ${cert.name_en} -> ${imageUrl}`);
  }

  // 4. logo图片批量插入（如表不存在请先建表）
  if (db.Logo) {
    for (const logo of logoList) {
      const imageUrl = `/uploads/${logo.file}`;
      // 先查重
      const exist = await db.Logo.findOne({ where: { name: logo.name } });
      if (!exist) {
        await db.Logo.create({ name: logo.name, image_url: imageUrl, is_active: logo.is_active });
        console.log(`Logo已插入: ${logo.name}`);
      } else {
        await db.Logo.update({ image_url: imageUrl, is_active: logo.is_active }, { where: { name: logo.name } });
        console.log(`Logo已更新: ${logo.name}`);
      }
    }
  }

  console.log('所有图片批量写入/更新完成！');
  process.exit(0);
}

run().catch(err => {
  console.error('批量写入出错:', err);
  process.exit(1);
});