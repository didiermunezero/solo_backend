module.exports = (app) => {
    const districts = require("../controllers/district.controller.js");
  
    // Create a new districts
    app.post("/districts", districts.create);
  
    // Retrieve all districtss
    app.get("/districts", districts.findAll);
  
    // Retrieve a single districts by id
    app.get("/districts/:id", districts.findOne);
  
    // Update a districts with id
    app.get("/districts/district/:district", districts.findByDistrict);
  
    // Delete a districts by id
    app.delete("/districts/:id", districts.delete);
  };
  