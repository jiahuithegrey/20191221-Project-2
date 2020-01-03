module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    });
  
    Recipe.associate = function(models) {
      Recipe.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Recipe;
  };