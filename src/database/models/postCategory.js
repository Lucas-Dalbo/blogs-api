module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    }, { 
      timestamps: false,
      tableName: 'PostCategories', 
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'Category',
      through: PostCategory,
      foreginKey: 'categoryId',
      otherKey: 'postId',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: PostCategory,
      foreginKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};