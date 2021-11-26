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
        expect(response.text).to.equal(`${testBook.title} saved to database!`);
        done();
      });
  });
});
