import React from "react";

const Filter = ({ searchTerm, filterChangeHandler, clearFilter }) => {
  return (
    <div>
      Filter shown with:{" "}
      <input value={searchTerm} onChange={filterChangeHandler} />
      <button onClick={clearFilter}>Clear Filter</button>
    </div>
  );
};

export default Filter;
