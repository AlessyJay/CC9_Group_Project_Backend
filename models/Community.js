module.exports = (sequelize, DataTypes) => {
  const Community = sequelize.define(
    'Community',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      profileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bannerUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      descriptions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM('PUBLIC', 'RESTRICTED'),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Community.associate = (models) => {
    Community.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Community.hasMany(models.Member, {
      foreignKey: {
        name: 'communityId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Community.hasMany(models.Post, {
      foreignKey: {
        name: 'communityId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Community.hasMany(models.Draft, {
      foreignKey: {
        name: 'communityId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Community.hasMany(models.Rule, {
      foreignKey: {
        name: 'communityId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Community;
};
