module.exports = (app) => {
    const users = require("../controllers/user.controller.js");
  
    // Create a new users
    app.post("/users", users.create);
  
    // Retrieve all userss
    app.get("/users", users.findAll);
  
    // Retrieve a single users by id
    app.get("/users/:id", users.findOne);
  
    // Update a users with id
    app.put("/users/:id", users.update);
  
    // Delete a users by id
    app.delete("/users/:id", users.delete);
  };
  