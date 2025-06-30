module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'admins',
    timestamps: false
  });
}; 