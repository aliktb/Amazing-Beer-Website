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

describe("basic testing", function () {
  it("testing the /create route", function (done) {
    chai
      .request(server)
      .post("/beerRoutes/create")
      .send(testBeer)
      .end((err, response) => {
        if (err) {
          console.log("Something is wrong");
          done(err);
        }
        console.log(response.text);
        expect(err).to.be.null;
        expect(response).to.have.status(201);
        expect(response.text).to.be.a("String");
        expect(response.text).to.equal(
          `New beer saved to database. Beer is: ${testBeer.name}`
        );
        done();
      });
  });
  it("testing the /getall Route", function (done) {
    chai
      .request(server)
      .get("/beerRoutes/getAll")
      .end((err, response) => {
        if (err) {
          console.log("Something is wrong");
          done(err);
        }
        const body = response.body;
        console.log(body);
        expect(response).to.have.status(200);
        expect(body).to.not.be.null;

        body.map((beer) => {
          expect(beer).to.contain.keys("name");
          expect(beer).to.be.a("Object");
        });
        done();
      });
  });
  after(function (done) {
    Beer.deleteMany({}).then(() => {
      done();
    });
  });
});
