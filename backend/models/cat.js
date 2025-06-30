module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cat', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    name_zh: DataTypes.STRING,
    name_en: DataTypes.STRING,
    breed: DataTypes.STRING,
    breed_zh: DataTypes.STRING,
    breed_en: DataTypes.STRING,
    color: DataTypes.STRING,
    color_zh: DataTypes.STRING,
    color_en: DataTypes.STRING,
    description: DataTypes.TEXT,
    description_zh: DataTypes.STRING,
    description_en: DataTypes.STRING,
    image_url: DataTypes.STRING,
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'cats',
    timestamps: false
  });
}; 