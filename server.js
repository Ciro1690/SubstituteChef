"use strict";

const app = require("./app");

app.listen(5432, function () {
  console.log(`Started on PORT 5432`);
});