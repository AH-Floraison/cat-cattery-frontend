module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Logo', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    tableName: 'logos',
    timestamps: false
  });
}; 