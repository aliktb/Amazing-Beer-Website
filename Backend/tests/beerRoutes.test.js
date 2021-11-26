const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const { Beer } = require("../persistence/beer.js");

const server = require("../server.js");

chai.use(chaiHttp);

const testBeer = {
  id: 1,
  name: "testBeer",
  description: "is a beer that we are testing",
  image_url: "no image",
  abv: 10.0,
  alcohol_free: false,
  type: "gasoline",
};
