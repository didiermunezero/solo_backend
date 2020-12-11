const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");

// create express app
const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(fileUpload());
require("./routes/users.router.js")(app);
require("./routes/employees.router.js")(app);
require("./routes/sectors.router.js")(app);
require("./routes/types.router.js")(app);
require("./routes/districts.router.js")(app);

const dbConfig = require("./mongodb/index.js");
const mongoose = require("mongoose");
dotenv.config();

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("\nSuccessfully connected to the database");
    app.listen(process.env.PORT, () => {
      console.log(`Server started at http://localhost:${process.env.PORT}\n`);
    });
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
