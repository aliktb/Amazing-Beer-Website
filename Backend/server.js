const express = require("express");

if (testDB == true) {
  dbURI = "testBeer";
} else {
  dbURI = "Beer";
}

const beerRoutes = require("./routes/beerRoutes.js");

const mongoose = require("mongoose");

app.use(express.json());

const errorLogger = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send(err.message);
};

mongoose.connect(
  `mongodb+srv://root:root@cluster0.ilyqd.mongodb.net/${dbURI}`,
  { useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log(`Error, cant connect to database: ${error}`);
    } else {
      console.log("No error!");
    }
  }
);

app.use("/beerRoutes", beerRoutes);
app.use(errorLogger);

const server = app.listen(5015, () => {
  console.log("Listening on port 5015");
});

module.exports = server;
