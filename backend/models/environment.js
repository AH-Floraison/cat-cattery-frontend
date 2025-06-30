module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Environment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image_url: DataTypes.STRING,
    key: DataTypes.STRING,
    value: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_en: DataTypes.STRING,
    description_zh: DataTypes.STRING,
    description_en: DataTypes.STRING
  }, {
    tableName: 'environments',
    timestamps: false
  });
}; 