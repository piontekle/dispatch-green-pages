const service = require('./service');

function get(req, res, next) {
  const { name } = req.query;

  return service.getCompany(name)
  .then(company => {
    res.status(200).json(company);
  })
  .catch(err => {
    console.log(err);
    next();
  })
};

function getAll(req, res, next) {
  return service.getCompanies()
  .then(companies => {
    res.status(200).json(companies);
  })
  .catch(err => {
    console.log(err);
    next();
  })
};

function create(req, res, next) {
  const { form }= req.body;

  return service.createCompany(form)
  .then(company => {
    company.msg
    ? res.status(500).json({ msg: company.msg })
    : res.status(200).json(company);
  })
  .catch(err => {
    console.log(err);
    next();
  })
};

function remove(req, res, next) {
  const { name } = req.body;
  console.log(req.body)
  return service.deleteCompany(name)
  .then(result => {
    result.msg
    ? res.status(500).json({ msg: result.msg })
    : service.getCompanies()
    .then(companies => res.status(200).json(companies));
  })
  .catch(err => {
    console.log(err);
    next();
  })
};

function edit(req, res, next) {
  const {name, form} = req.body;

  return service.editCompany(name, form)
  .then(company => {
    company.msg
    ? res.status(500).json({ msg: company.msg })
    : res.status(200).json(company);
  })
  .catch(err => {
    console.log(err);
    next();
  })
};

module.exports = { get, getAll, create, remove, edit };
