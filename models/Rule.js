module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define(
    'Rule',
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

  Rule.associate = (models) => {
    Rule.belongsTo(models.Community, {
      foreignKey: {
        name: 'communityId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Rule;
};
