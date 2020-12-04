module.exports = (app) => {
  const sectors = require("../controllers/sector.controller.js");

  // Create a new sectors
  app.post("/sectors", sectors.create);
  app.post("/sectors/login", sectors.login);

  // Retrieve all sectorss
  app.get("/sectors", sectors.findAll);

  // Retrieve a single sectors by id
  app.get("/sectors/:id", sectors.findOne);

  // Update a sectors with id
  app.put("/sectors/:id", sectors.update);

  // Delete a sectors by id
  app.delete("/sectors/:id", sectors.delete);
};
