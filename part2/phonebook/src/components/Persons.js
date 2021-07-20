import React from "react";

const Persons = ({ persons, deleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {persons.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}{" "}
            <button onClick={() => deleteHandler(p.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Persons;
