const sequelize = require("./db");
const { Sequelize, DataTypes, Model } = require("sequelize");

class Company extends Model{}

Company.init(
    {
        name: DataTypes.STRING,
        logoUrl: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        modelName: "company",
    }
);

module.exports = Company;