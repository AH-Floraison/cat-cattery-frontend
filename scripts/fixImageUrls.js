// scripts/fixImageUrls.js
const fs = require('fs');
const path = require('path');
const db = require('../backend/models');

const uploadsDir = path.join(__dirname, '../backend/uploads');

async function fixTable(table, field = 'image_url') {
  const rows = await db[table].findAll();
  const files = fs.readdirSync(uploadsDir);
  for (const row of rows) {
    if (!row[field]) continue;
    // 只取文件名部分
    const dbFile = row[field].split('/').pop();
    const exists = files.includes(dbFile);
    if (!exists) {
      console.warn(`[${table}] 警告: 数据库记录 ${row.id} 指向的图片 ${dbFile} 不存在于 uploads 目录！`);
      continue;
    }
    // 修正路径为 /uploads/xxx
    const fixed = '/uploads/' + dbFile;
    if (row[field] !== fixed) {
      row[field] = fixed;
      await row.save();
      console.log(`[${table}] 修正: ${row.id} -> ${fixed}`);
    }
  }
}

async function main() {
  await fixTable('Environment');
  await fixTable('Cat');
  await fixTable('Certificate');
  await fixTable('Logo');
  console.log('所有图片路径自动比对修正完成！');
  process.exit(0);
}

main();