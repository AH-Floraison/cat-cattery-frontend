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

// 获取所有证书
router.get('/', async (req, res) => {
  const certs = await db.Certificate.findAll();
  res.json(certs);
});

// 新增证书
router.post('/', upload.single('image'), async (req, res) => {
  console.log('certificate post req.body:', req.body);
  const {
    name_zh = '',
    name_en = '',
    description_zh = '',
    description_en = ''
  } = req.body;
  const image_url = req.file ? '/uploads/' + req.file.filename : '';
  const name = name_zh || name_en || '';
  try {
    if (!name_zh && !name_en) {
      return res.status(400).json({ error: '中英文名称至少填写一个' });
    }
    const cert = await db.Certificate.create({
      name,
      name_zh,
      name_en,
      description_zh,
      description_en,
      image_url
    });
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 修改证书
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const updateData = { name };
  if (req.file) updateData.image_url = '/uploads/' + req.file.filename;
  await db.Certificate.update(updateData, { where: { id: req.params.id } });
  const cert = await db.Certificate.findByPk(req.params.id);
  res.json(cert);
});

// 删除证书
router.delete('/:id', async (req, res) => {
  const cert = await db.Certificate.findByPk(req.params.id);
  if (cert && cert.image_url) {
    const filePath = path.join(__dirname, '../', cert.image_url);
    fs.unlink(filePath, err => {
      if (err && err.code !== 'ENOENT') {
        console.error('删除图片文件失败:', filePath, err);
      }
    });
  }
  await db.Certificate.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router; 