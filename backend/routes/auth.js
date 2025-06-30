const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = 'your_jwt_secret_key'; // 建议放到环境变量

// 登录接口
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: '账号和密码必填' });
  const admin = await db.Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ error: '账号或密码错误' });
  const valid = bcrypt.compareSync(password, admin.password);
  if (!valid) return res.status(401).json({ error: '账号或密码错误' });
  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// 鉴权中间件
function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: '未登录' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.admin = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: '登录已过期或无效' });
  }
}

module.exports = { router, authMiddleware }; 