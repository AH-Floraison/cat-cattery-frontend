const bcrypt = require('bcryptjs');
const { Admin, sequelize } = require('../models');

async function createAdmin() {
  const username = 'wuyunmaoshe';
  const password = '987654';
  const hash = bcrypt.hashSync(password, 10);
  await sequelize.sync();
  const exist = await Admin.findOne({ where: { username } });
  if (exist) {
    console.log('管理员已存在');
    return;
  }
  await Admin.create({ username, password: hash });
  console.log('管理员账号已创建:', username);
  process.exit(0);
}

createAdmin().catch(e => { console.error(e); process.exit(1); }); 