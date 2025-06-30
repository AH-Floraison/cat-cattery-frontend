module.exports = (sequelize, DataTypes) => {
  return sequelize.define('About', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    image_url: DataTypes.STRING,
    content_zh: DataTypes.TEXT,
    content_en: DataTypes.TEXT
  }, {
    tableName: 'abouts',
    timestamps: false
  });
}; 