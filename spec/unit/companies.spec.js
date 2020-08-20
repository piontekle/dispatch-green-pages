const Company = require('../../server/db/models/company');

describe("Company", () => {
  describe("#create", () => {
    it("should create a new company", (done) => {
      Company.create({
        name: "Batman's Closet",
        number: "123-555-9999",
        location: "Gotham City",
        website: "batsrus.com",
        industry: "fashion",
        description: "Best selection of batman's old suits"
      }).then(company => {
        expect(company.name).toBe("Batman's Closet");
        done();
      }).catch(err => {
        console.log(err);
        done();
      })

    })
  })

  describe("#find", () => {
    it("should find and return the company by name", (done) => {
      Company.create({ name: "Superman's Silverware" })
      .then(company => {
        Company.findOne({ name: company.name })
        .then(found => {
          expect(found.name).toBe("Superman's Silverware");
          done();
        })
      })
    })
  })

  describe("#update", () => {
    it("should update the company name and return updated document", (done) => {
      Company.create({
        name: "Wonderwoman's Wild World",
        number: "123-333-3333"
      })
      .then(company => {
        Company.findOneAndUpdate(
          { name: "Wonderwoman's Wild World" },
          { name: "Wonderwoman's Wonderous World" },
          { new: true }
        )
        .then(updated => {
          expect(updated.name).toBe("Wonderwoman's Wonderous World");
          expect(updated.number).toBe("123-333-3333");
          done();
        })
      })
    })
  })

  describe("#delete", () => {
    it("should delete the company", (done) => {
      Company.create({ name: "Joker's Jokes" })
      .then(company => {
        Company.deleteOne({ name: company.name })
        .then(deleted => {
          Company.findOne({ name: deleted.name })
          .then(found => {
            expect(found).toBeNull();
            done();
          })
        })
      })
    })
  })

});
