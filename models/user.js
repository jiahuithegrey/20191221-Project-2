module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    });
  
    User.associate = function(models) {
      User.hasMany(models.Recipe, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };