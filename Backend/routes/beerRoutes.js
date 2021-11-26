const router = require("express").Router();

const { beerImport } = require("../persistence/beer.js");

router.post("/create", (req, res) => {
  const newBeer = new beerImport(req.body);
  console.log(req.body);
  console.log(newBeer);

  newBeer
    .save()
    .then((result) => {
      res.status(201).send(`New beer saved to database. Beer is: ${result}`);
    })
    .catch((error) => {
      console.log(`error :( : ${error}`);
      res.status(500).send(error);
    });
});

router.get("/getAll", (req, res) => {
  beerImport.find((error, beerList) => {
    if (error) {
      console.log(`error: ${error}`);
    }
    res.status(200).send(beerList);
  });
});

router.get("/getById/:id", (req, res) => {
  console.log(req.params.id);
  beerImport.findById(req.params.id, (error, result) => {
    if (error) {
      console.log(`error: ${error}`);
    }
    res.status(200).send(result);
  });
});

router.put("/updateById/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);

  console.log(req.body);

  beerImport.findByIdAndUpdate(id, req.body, { new: true }, (error, result) => {
    if (error) {
      console.log(`There was an error: ${error}`);
    }
    res.status(202).send(result);
  });
});

router.delete("/deleteById/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  beerImport.findByIdAndDelete(id, (error) => {
    if (error) {
      console.log(`error: ${error}`);
    }
    res.status(202).send("Deleted!");
  });
});

module.exports = router;
