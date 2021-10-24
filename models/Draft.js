module.exports = (sequelize, DataTypes) => {
  const Draft = sequelize.define(
    'Draft',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('main', 'img'),
        allowNull: false,
      },
      like: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      allowNotification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Draft.associate = (models) => {
    Draft.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Draft.belongsTo(models.Community, {
      foreignKey: {
        name: 'communityId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Draft;
};
