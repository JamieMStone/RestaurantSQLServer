const sequelize = require("./db");
const Company = require("./company");
const Location = require("./location");
const Menu = require("./menu");

async function setupDb(){
    Company.hasMany(Location);
    Location.belongsTo(Company);

    Company.hasMany(Menu);
    Menu.belongsTo(Company);

    await sequelize.sync();
}

module.exports = setupDb;