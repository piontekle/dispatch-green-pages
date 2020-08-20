import React from 'react';

const List = ({ companies, onClick }) => {
  return (
    <div className="list-group">
      { companies.length
        ? companies.map(company => {
          return (
            <li
              key={company.name}
              className="list-group-item list-group-item-action list-group-item-success"
            >
              <p>{company.name} ............... {company.number ? company.number : "???-???-????"}</p>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onClick("details", company)}
                >
                  Details
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onClick("edit", company)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => onClick("delete", company.name)}
                >
                  Delete
                </button>
              </div>
            </li>
          )
        })
        : <div> No Companies Yet </div>
      }
    </div>
  )
}

export default List;
