module.exports = (app) => {
  const sectors = require("../controllers/sector.controller.js");

  // Create a new sectors
  app.post("/sectors", sectors.create);

  // Retrieve all sectors
  app.get("/sectors", sectors.findAll);

  // Retrieve a single sectors by id
  app.get("/sectors/:id", sectors.findOne);

  // Update a sectors with id
  app.get("/sectors/district/:district", sectors.findByDistrict);

  // Delete a sectors by id
  app.delete("/sectors/:id", sectors.delete);
};
