module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Contact', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    value: DataTypes.STRING
  }, {
    tableName: 'contacts',
    timestamps: false
  });
}; 