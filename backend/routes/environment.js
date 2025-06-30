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

// 获取所有环境图片
router.get('/', async (req, res) => {
  const envs = await db.Environment.findAll();
  res.json(envs);
});

// 新增环境图片
router.post('/', upload.single('image'), async (req, res) => {
  console.log('environment post req.body:', req.body);
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
    const env = await db.Environment.create({
      name,
      name_zh,
      name_en,
      description_zh,
      description_en,
      image_url
    });
    res.json(env);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 修改环境图片
router.put('/:id', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  const updateData = { name };
  if (req.file) updateData.image_url = '/uploads/' + req.file.filename;
  await db.Environment.update(updateData, { where: { id: req.params.id } });
  const env = await db.Environment.findByPk(req.params.id);
  res.json(env);
});

// 删除环境图片
router.delete('/:id', async (req, res) => {
  const env = await db.Environment.findByPk(req.params.id);
  if (env && env.image_url) {
    const filePath = path.join(__dirname, '../', env.image_url);
    fs.unlink(filePath, err => {
      if (err && err.code !== 'ENOENT') {
        console.error('删除图片文件失败:', filePath, err);
      }
    });
  }
  await db.Environment.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

// 获取首页背景图
router.get('/home-bg', async (req, res) => {
  const bg = await db.Environment.findOne({ where: { key: 'home_bg' } });
  res.json(bg ? { image_url: bg.value } : { image_url: null });
});

// 上传首页背景图（覆盖）
router.post('/home-bg', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const image_url = '/uploads/' + req.file.filename;
  let bg = await db.Environment.findOne({ where: { key: 'home_bg' } });
  if (bg) {
    // 删除旧图片文件
    if (bg.value) {
      const oldPath = path.join(__dirname, '../', bg.value);
      fs.unlink(oldPath, err => {
        if (err && err.code !== 'ENOENT') {
          console.error('删除旧首页背景图失败:', oldPath, err);
        }
      });
    }
    bg.value = image_url;
    await bg.save();
  } else {
    bg = await db.Environment.create({ key: 'home_bg', value: image_url, name: '首页背景图' });
  }
  res.json({ image_url });
});

module.exports = router; 