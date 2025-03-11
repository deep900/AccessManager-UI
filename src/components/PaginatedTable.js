import React from "react";

const PaginatedTable = (data) => {
  const headerData = data[0];

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>{headerData}</tr>
        </thead>
        <tbody>
          {orgData?.map((org) => (
            <>
              <tr>
                <td>{org.id}</td>
                <td>{org.orgName}</td>
                <td>{org.orgDescription}</td>
                <td>{org.country}</td>
                <td>
                  <select>
                    <option>Create</option>
                    <option>Modify</option>
                    <option>Delete</option>
                  </select>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      <nav aria-label="">
        <ul className="pagination">
          <li className={showPrevButton ? "page-item" : "page-item disabled"}>
            <span className="page-link" onClick={handlePreviousPage}>
              Previous
            </span>
          </li>
          <li className="page-item">
            <span className="page-link" href="#" onClick={handleNextPage}>
              Next
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default PaginatedTable;
