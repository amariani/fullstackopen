import React, { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePersonAdd = (event) => {
    event.preventDefault();
    const isDuplicate = avoidDuplicates(newName);

    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newPhone };
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewPhone("");
  };

  const avoidDuplicates = (name) => {
    return persons.find((p) => p.name === name);
  };

  const filteredPersons = () =>
    persons.filter((p) => {
      return p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchTerm={searchTerm}
        filterChangeHandler={handleFilterChange}
        clearFilter={() => setSearchTerm("")}
      />
      <Form
        submitHandler={handlePersonAdd}
        nameValue={newName}
        phoneValue={newPhone}
        nameChangeHandler={handleNameChange}
        numberChangeHandler={handlePhoneChange}
      />
      <Persons persons={filteredPersons()} />
    </div>
  );
};

export default App;
