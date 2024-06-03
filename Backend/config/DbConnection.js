const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://krishnadas10official:fFs00SzLQF63TU4D@cluster0.okzakwg.mongodb.net/CrudTask"
  )
  .then(() => console.log("DB connected "))
  .catch(() => console.log("error"));

module.exports = mongoose;
