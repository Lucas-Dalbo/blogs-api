module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
      postId: { type: DataTypes.INTEGER, primaryKey: true, foreginKey: true },
      categoryId: { type: DataTypes.INTEGER, primaryKey: true, foreginKey: true },
    }, { 
      timestamps: false,
      tableName: 'PostCategories', 
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      through: PostCategory,
      foreginKey: 'postId',
      otherKey: 'categoryId',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreginKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};