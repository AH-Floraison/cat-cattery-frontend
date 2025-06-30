const express = require('express');
const router = express.Router();
const db = require('../models');

// 获取所有联系方式
router.get('/', async (req, res) => {
  const contacts = await db.Contact.findAll();
  res.json(contacts);
});

// 新增联系方式
router.post('/', async (req, res) => {
  const { type, value } = req.body;
  const contact = await db.Contact.create({ type, value });
  res.json(contact);
});

// 修改联系方式
router.put('/:id', async (req, res) => {
  const { type, value } = req.body;
  await db.Contact.update({ type, value }, { where: { id: req.params.id } });
  const contact = await db.Contact.findByPk(req.params.id);
  res.json(contact);
});

// 删除联系方式
router.delete('/:id', async (req, res) => {
  await db.Contact.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router; 