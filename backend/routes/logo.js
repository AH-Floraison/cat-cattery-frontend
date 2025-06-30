const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 获取所有logo
router.get('/', async (req, res) => {
  const logos = await db.Logo.findAll();
  res.json(logos);
});

// 上传新logo
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { name } = req.body;
  const image_url = '/uploads/' + req.file.filename;
  const safeName = name || '未命名Logo';
  try {
    const logo = await db.Logo.create({ name: safeName, image_url, is_active: false });
    res.json(logo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 切换激活logo
router.put('/:id/activate', async (req, res) => {
  const id = req.params.id;
  await db.Logo.update({ is_active: false }, { where: {} });
  await db.Logo.update({ is_active: true }, { where: { id } });
  const logo = await db.Logo.findByPk(id);
  res.json(logo);
});

// 删除logo
router.delete('/:id', async (req, res) => {
  const logo = await db.Logo.findByPk(req.params.id);
  if (logo && logo.image_url) {
    const filePath = path.join(__dirname, '../', logo.image_url);
    fs.unlink(filePath, err => {
      if (err && err.code !== 'ENOENT') {
        console.error('删除图片文件失败:', filePath, err);
      }
    });
  }
  await db.Logo.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router; 