module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define(
    'Member',
    {
      role: {
        type: DataTypes.ENUM('ADMIN', 'MEMBER'),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Member.associate = (models) => {
    Member.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Member.belongsTo(models.Community, {
      foreignKey: {
        name: 'communityId',
        allowNull: true,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Member;
};
