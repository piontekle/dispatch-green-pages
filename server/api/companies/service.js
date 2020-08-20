const Company = require('../../db/models/company');

async function getCompany(name) {
  return await Company.findOne({ name: name });
};

async function getCompanies() {
  return await Company.find();
};

async function createCompany(form) {
  try {
    const company = await Company.create({
      name: form.name,
      number: form.number,
      location: form.location,
      website: form.website,
      industry: form.industry,
      description: form.description
    });

    if (company === null) return { msg: "DB error creating company." };

    return company;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
};

async function deleteCompany(name) {
  try {
    const result = await Company.deleteOne({ name: name });

    return result;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
}

async function editCompany(name, form) {
  try {
    const company = await Company.findOneAndUpdate(
      { name: name },
      {
        name: form.name,
        number: form.number,
        location: form.location,
        website: form.website,
        industry: form.industry,
        description: form.description
      },
      { new: true }
    );

    if (company === null) return { msg: "DB error updating company."}

    return company;
  } catch(err) {
    console.log(err);
    return { msg: err };
  }
};

module.exports = {
  getCompany,
  getCompanies,
  createCompany,
  deleteCompany,
  editCompany
};
