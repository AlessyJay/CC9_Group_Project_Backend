module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      isSeen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongsTo(models.User, {
      as: 'UserIdToNoti',
      foreignKey: {
        name: 'userIdToNoti',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Notification.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Notification.belongsTo(models.Comment, {
      foreignKey: {
        name: 'commentId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Notification.belongsTo(models.Post, {
      foreignKey: {
        name: 'postId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Notification;
};
