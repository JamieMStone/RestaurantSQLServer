const sequelize = require("./db");
const { Sequelize, DataTypes, Model } = require("sequelize");

class Menu extends Model{}

Menu.init(
    {
        title: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "menu",
    }
)

module.exports = Menu;