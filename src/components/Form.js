import React from 'react';

const Form = ({
  isEditing,
  handleChange,
  onSubmit,
  handleCancel,
  name,
  number,
  location,
  website,
  industry,
  description
}) => {

  return (
    <form onSubmit={onSubmit}>
      <legend>Enter Company Details:</legend>
      <div className="form-group">
        <label htmlFor="nameInput">Name*:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="name"
          value={name}
          id="nameInput"
          aria-describedby="nameHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="numberInput">Number:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="number"
          value={number}
          id="numberInput"
          aria-describedby="numberHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="locationInput">Location:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="location"
          value={location}
          id="locationInput"
          aria-describedby="locationHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="websiteInput">Website:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="website"
          value={website}
          id="websiteInput"
          aria-describedby="websiteHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="industryInput">Industry:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="industry"
          value={industry}
          id="industryInput"
          aria-describedby="industryHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionInput">Description:</label>
        <input
          className="form-control"
          onChange={handleChange}
          name="description"
          value={description}
          id="descriptionInput"
          aria-describedby="descriptionHelp"
        />
      </div>
      <button type="submit" className="btn btn-success">
        {isEditing ? "Update" : "Add"}
      </button>
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => handleCancel("showForm")}
      >
        Cancel
      </button>
    </form>
  )
}

export default Form;
