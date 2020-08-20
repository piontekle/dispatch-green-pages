import axios from 'axios';

const base = `${process.env.REACT_APP_API}`

async function getCompany(name) {
  return await axios.get(`${base}/companies/`, {
    params: { name: name }
  });
}

async function getCompanies() {
  return await axios.get(`${base}/companies/all`);
}

async function createCompany(form) {
  return await axios.post(`${base}/companies/create`, { form });
}

async function deleteCompany(name) {
  return await axios.post(`${base}/companies/remove`, { name: name });
};

async function editCompany(name, form) {
  return await axios.post(
    `${base}/companies/edit`,
    { name: name, form: form }
  );
};

export {
  getCompany,
  getCompanies,
  createCompany,
  deleteCompany,
  editCompany
};
