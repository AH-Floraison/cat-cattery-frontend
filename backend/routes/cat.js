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

// 获取所有猫咪
router.get('/', async (req, res) => {
  const cats = await db.Cat.findAll();
  res.json(cats);
});

// 新增猫咪
router.post('/', upload.single('image'), async (req, res) => {
  console.log('cat post req.body:', req.body);
  const {
    name, name_zh, name_en,
    breed, breed_zh, breed_en,
    color, color_zh, color_en,
    description, description_zh, description_en,
    is_available
  } = req.body;
  const image_url = req.file ? '/uploads/' + req.file.filename : null;
  const realName = name || name_zh || name_en || '未命名';
  const cat = await db.Cat.create({
    name: realName,
    name_zh, name_en,
    breed, breed_zh, breed_en,
    color, color_zh, color_en,
    description, description_zh, description_en,
    is_available, image_url
  });
  res.json(cat);
});

// 修改猫咪
router.put('/:id', upload.single('image'), async (req, res) => {
  const {
    name, name_zh, name_en,
    breed, breed_zh, breed_en,
    color, color_zh, color_en,
    description, description_zh, description_en,
    is_available
  } = req.body;
  const updateData = {
    name: name || name_zh || name_en,
    name_zh, name_en,
    breed, breed_zh, breed_en,
    color, color_zh, color_en,
    description, description_zh, description_en,
    is_available
  };
  if (req.file) updateData.image_url = '/uploads/' + req.file.filename;
  await db.Cat.update(updateData, { where: { id: req.params.id } });
  const cat = await db.Cat.findByPk(req.params.id);
  res.json(cat);
});

// 删除猫咪
router.delete('/:id', async (req, res) => {
  const cat = await db.Cat.findByPk(req.params.id);
  if (cat && cat.image_url) {
    const filePath = path.join(__dirname, '../', cat.image_url);
    fs.unlink(filePath, err => {
      if (err && err.code !== 'ENOENT') {
        console.error('删除图片文件失败:', filePath, err);
      }
    });
  }
  await db.Cat.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router; 