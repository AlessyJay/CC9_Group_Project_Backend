module.exports = (sequelize, DataTypes) => {
  const UserInteraction = sequelize.define(
    'UserInteraction',
    {
      ruleDetail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  UserInteraction.associate = (models) => {
    UserInteraction.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    UserInteraction.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return UserInteraction;
};
