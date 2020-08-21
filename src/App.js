import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './App.css';

import Form from "./components/Form";
import List from "./components/List";

import {
  getCompany,
  getCompanies,
  createCompany,
  deleteCompany,
  editCompany
} from './api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDetails: false,
      showForm: false,
      isEditing: false,
      companies: [],
      company: {},
      search: "",
      name: "",
      number: "",
      location: "",
      website: "",
      industry: "",
      description: ""
    }

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onListClick = this.onListClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    getCompanies()
    .then(result => {
      this.setState({ companies: result.data })
    })
  };

  toggle(val) {
    this.setState({ [val]: !this.state[val] });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value})
  }

  async onSearch() {
    const { search } = this.state;

    const company = await getCompany(search);

    if (company.data !== null) {
      this.setState({
        company: company.data,
        showDetails: true,
        search: ""
      })
    } else {
      this.setState({ search: "" })
    }
  }

  async onListClick(action, val) {
    if (action === "details") {
      this.setState({
        company: val,
        showDetails: true
      });
    } else if (action === "edit") {
      this.setState({
        company: val,
        name: val.name,
        number: val.number,
        location: val.location,
        website: val.website,
        industry: val.industry,
        description: val.description,
        showForm: true,
        isEditing: true
      })
    } else if (action === "delete") {
      let result = await deleteCompany(val);
      if (result.statusCode !== 500) {
        this.setState({ companies: result.data })
      }
    }
  }

  async onFormSubmit(e) {
    e.preventDefault();

    const form = {
      name: this.state.name,
      number: this.state.number,
      location: this.state.location,
      website: this.state.website,
      industry: this.state.industry,
      description: this.state.description
    }

    if (this.state.isEditing) {
      const updated = await editCompany(this.state.company.name, form);

      if (updated.data) {
        this.setState({
          company: "",
          isEditing: false
        })
      }
    } else await createCompany(form);

    const companies = await getCompanies();
    this.setState({
      companies: companies.data,
      showForm: false,
      name: "",
      number: "",
      location: "",
      website: "",
      industry: "",
      description: ""
    })
  }

  render() {
    const { showDetails, showForm, isEditing, companies, company } = this.state;
    return (
      <div className="App container-fluid">
        <header className="navbar navbar-dark bg-dark">
          <div className="navbar-brand"> Dispatch Green Pages</div>
        </header>
        <div className="row">
          <div className="col-sm">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  id="basic-addon1"
                >
                  Search:
                </span>
              </div>
              <input
                type="text"
                name="search"
                value={this.state.search}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Company Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            {
              !showForm
              ? (
                <>
                  <button onClick={this.onSearch} className="btn btn-primary">
                    Search
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => this.toggle("showForm")}
                  >
                    Add Company
                  </button>
                  <h5>Companies</h5>
                  <List
                    companies={companies}
                    onClick={this.onListClick}
                  />
                </>
              ) : (
                <Form
                  isEditing={isEditing}
                  company={company}
                  handleChange={this.handleChange}
                  onSubmit={this.onFormSubmit}
                  handleCancel={this.toggle}
                  name={this.state.name}
                  number={this.state.number}
                  location={this.state.location}
                  website={this.state.website}
                  industry={this.state.industry}
                  description={this.state.description}
                />
              )
            }
            <Popup
              open={showDetails}
              closeOnDocumentClick
              onClose={() => this.toggle("showDetails")}
            >
              <div className="list-group">
                <div className="list-group-item">Name: {company.name}</div>
                <div className="list-group-item">Number: {company.number}</div>
                <div className="list-group-item">Location: {company.location}</div>
                <div className="list-group-item">Website: {company.website}</div>
                <div className="list-group-item">Industry: {company.industry}</div>
                <div className="list-group-item">Description: {company.description}</div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
