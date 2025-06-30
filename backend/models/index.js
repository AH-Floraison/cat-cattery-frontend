const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cat = require('./cat')(sequelize, Sequelize);
db.Certificate = require('./certificate')(sequelize, Sequelize);
db.Environment = require('./environment')(sequelize, Sequelize);
db.Contact = require('./contact')(sequelize, Sequelize);
db.Logo = require('./logo')(sequelize, Sequelize);
db.About = require('./about')(sequelize, Sequelize);
db.Admin = require('./admin')(sequelize, Sequelize);

module.exports = db; 