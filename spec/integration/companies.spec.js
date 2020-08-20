const request = require("request");
const server = require("../../server");
const base = "http://localhost:5000/api/companies/";

const Company = require("../../server/db/models/company");

describe("Company", () => {

  describe("POST /create", () => {
    it("should create a new company", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          name: "Thor's Hardware",
          location: "Asgard"
        }
      };

      request.post(options, (err, res, body) => {
        Company.findOne({ name: "Thor's Hardware" })
        .then(company => {
          expect(res.statusCode).toBe(200);
          expect(company.name).toBe("Thor's Hardware");
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        })
      })
    })
  });

  describe("POST /remove", () => {
    it("should delete existing record", (done) => {
      Company.create({ name: "Antman's Pest Control" })
      .then(company => {
        const options = {
          url: `${base}remove`,
          form: { name: company.name }
        };

        request.post(options, (err, res, body) => {
          Company.findOne({ name: company.name })
          .then(found => {
            expect(res.statusCode).toBe(200);
            expect(found).toBeNull();
            done();
          })
        })
      })
      .catch(err => {
        console.log(err);
        done();
      })
    })
  })

  describe("GET /:name", () => {
    it("should get company by name", (done) => {
      Company.create({ name: "Captain Marvel's Memorabilia" })
      .then(company => {
        request.get(`${base}?name=${company.name}`, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          done();
        })
      })
      .catch(err => {
        console.log(err);
        done();
      })
    })
  })

});
