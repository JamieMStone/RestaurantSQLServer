const setupDb = require("./setupDb");
const Company = require("./company");
const Location = require("./location");
const Menu = require("./menu");
const express = require("express"); 

const app = express();

app.use(express.json());

//Companies
app.post("/companies", async (req, res) =>{
    const {name, logoUrl} = req.body;
    await Company.create({name, logoUrl});
    res.sendStatus(201);
});

app.get("/companies", async (req, res) => {
    const companies = await Company.findAll();
    res.json(companies);
})

app.delete("/companies/:id", async (req, res) => {
    const company = await Company.findByPk(req.params.id);
    if (!company){
        return res.sendStatus(404);
    }
    await company.destroy();
    res.sendStatus(200);
})

app.put("/companies/:id", async (req, res) =>{
    const company = await Company.findByPk(req.params.id);
    if (!company){
        return res.sendStatus(404);
    }

    const {name, logoUrl} = req.body;
    await company.update({name, logoUrl});
    res.sendStatus(201);
})

//Locations
app.post("/companies/:id/locations", async (req, res) =>{
    const company = await Company.findByPk(req.params.id);
    if (!company){
        return res.sendStatus(404);
    }
    const { name, capacity, manager } = req.body;
    await company.createLocation({name, capacity, manager});

    res.sendStatus(201);
});

app.get("/companies/:id", async (req, res) =>{
    const company = await Company.findByPk(req.params.id, {
        include: Location,
    });
    if (!company){
        return res.sendStatus(404);
    }
    res.json(company);
})

app.delete("/companies/:id/locations/:locationId", async (req, res) =>{
    const location = await Location.findOne({
        where: {
            companyId: req.params.id,
            id: req.params.locationId,
        },
      })
    if (!location){
        return res.sendStatus(404);
    }
    await location.destroy();
    res.sendStatus(200);
})

//Menus
app.post("/companies/:id/menus", async (req, res) =>{

    const company = await Company.findByPk(req.params.id);
    if (!company){
        return res.sendStatus(404);
    }
    const { title } = req.body;
    await company.createMenu({title});

    res.sendStatus(201);

});

app.get("/companies/:id/menus" , async (req, res) =>{

    const company = await Company.findByPk(req.params.id, {
        include: Menu,
    });
    if (!company){
        return res.sendStatus(404);
    }
    res.json(company);
});


app.get("/companies/:id/menus/:menuId", async (req, res) =>{
    /*
    const company = await Company.findByPk(req.params.id, {
        include: Menu,
    });
    if (!company){
        return res.sendStatus(404);
    }
    res.json(company);
    */
    const menu = await Menu.findOne({
        where: {
            companyId: req.params.id,
            id: req.params.menuId,
        },
      })
    if (!menu){
        return res.sendStatus(404);
    }
    res.json(menu);
});

app.delete("/companies/:id/menus/:menuId", async (req, res) =>{
    const menu = await Menu.findOne({
        where: {
            companyId: req.params.id,
            id: req.params.menuId,
        },
      })
    if (!menu){
        return res.sendStatus(404);
    }
    await menu.destroy();
    res.sendStatus(200);
})






setupDb();

module.exports = app;