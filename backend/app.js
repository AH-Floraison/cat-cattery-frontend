const express = require('express');
const cors = require('cors');
const db = require('./models');
const path = require('path');
const auth = require('./routes/auth');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, '../../frontend/public/images')));

app.use('/api/cats', require('./routes/cat'));
app.use('/api/certificates', require('./routes/certificate'));
app.use('/api/environments', require('./routes/environment'));
app.use('/api/contacts', require('./routes/contact'));
app.use('/api/logos', require('./routes/logo'));
app.use('/api/about', require('./routes/about'));
app.use('/api', auth.router);

// 数据库同步
(async () => {
  await db.sequelize.sync({ alter: true });
})();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
module.exports.authMiddleware = auth.authMiddleware; 