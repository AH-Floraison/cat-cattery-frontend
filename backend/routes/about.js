const express = require('express');
const router = express.Router();
const db = require('../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 获取关于我们内容
router.get('/', async (req, res) => {
  let about = await db.About.findOne();
  if (!about) {
    about = await db.About.create({ content_zh: '[]', content_en: '[]', image_url: '' });
  }
  // 兼容老数据
  let content_zh = about.content_zh;
  let content_en = about.content_en;
  try {
    content_zh = JSON.parse(content_zh);
  } catch { content_zh = content_zh ? [{ title: '', content: content_zh }] : []; }
  try {
    content_en = JSON.parse(content_en);
  } catch { content_en = content_en ? [{ title: '', content: content_en }] : []; }
  res.json({ ...about.toJSON(), content_zh, content_en });
});

// 更新关于我们内容（文本）
router.put('/', async (req, res) => {
  let { content_zh, content_en } = req.body;
  let about = await db.About.findOne();
  // 只允许数组
  if (!Array.isArray(content_zh)) content_zh = [];
  if (!Array.isArray(content_en)) content_en = [];
  // 强制转字符串
  const strZh = JSON.stringify(content_zh);
  const strEn = JSON.stringify(content_en);
  if (!about) {
    about = await db.About.create({ content_zh: strZh, content_en: strEn });
  } else {
    about.content_zh = strZh;
    about.content_en = strEn;
    await about.save();
  }
  res.json({ ...about.toJSON(), content_zh, content_en });
});

// 上传/更换图片
router.post('/image', upload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  let about = await db.About.findOne();
  const image_url = '/uploads/' + req.file.filename;
  if (!about) {
    about = await db.About.create({ image_url });
  } else {
    about.image_url = image_url;
    await about.save();
  }
  res.json({ image_url: about.image_url });
});

module.exports = router; 