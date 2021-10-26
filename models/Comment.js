module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      commentDetails: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaulValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Comment;
};
