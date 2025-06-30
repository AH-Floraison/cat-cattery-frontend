module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Certificate', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image_url: DataTypes.STRING,
    name_zh: DataTypes.STRING,
    name_en: DataTypes.STRING,
    description_zh: DataTypes.TEXT,
    description_en: DataTypes.TEXT
  }, {
    tableName: 'certificates',
    timestamps: false
  });
}; 