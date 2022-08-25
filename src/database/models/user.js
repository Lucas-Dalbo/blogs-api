module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'Users',
    // underscored: true,
  });

  // User.associate = (models) => {
  //   User.belongsTo(models.BlogPost,
  //     { as: 'BlogPost', foreginKey: 'userId' });
  // };

  return User;
};