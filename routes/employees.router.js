module.exports = (app) => {
  const employees = require("../controllers/employee.controller.js");

  // Create a new employees
  app.post("/employees", employees.create);
  app.post("/employees/login", employees.login);

  // Retrieve all employeess
  app.get("/employees", employees.findAll);

  // Retrieve a single employees by id
  app.get("/employees/:id", employees.findOne);

  // Update a employees with id
  app.put("/employees/:id", employees.update);

  // Delete a employees by id
  app.delete("/employees/:id", employees.delete);
};
