const sequelize = require("./db");
const { Sequelize, DataTypes, Model } = require("sequelize");

class Location extends Model{}

Location.init(
    {
        name: DataTypes.STRING,
        capacity: DataTypes.INTEGER,
        manager: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "location",
    }
)

module.exports = Location;