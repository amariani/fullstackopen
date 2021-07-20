import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
    const duplicatedPerson = detectDuplicate(newName);

    if (duplicatedPerson) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (result) {
        const newPersonData = {
          ...duplicatedPerson,
          number: newPhone,
        };
        personsService
          .update(duplicatedPerson.id, newPersonData)
          .then((res) => {
            setPersons(persons.map((p) => (p.name !== newName ? p : res)));
          })
          .catch((e) => {
            console.error(`Error:`, e);
          });
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personsService.create(newPerson).then((newPersonResponse) => {
        setPersons(persons.concat(newPersonResponse));
      });
    }

    setNewName("");
    setNewPhone("");
  };

  const detectDuplicate = (name) => {
    return persons.find((p) => p.name === name);
  };

  const filteredPersons = () =>
    persons.filter((p) => {
      return p.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
    });

  const deletePerson = (id) => {
    const personFound = persons.find((p) => p.id === id);
    const result = window.confirm(`Delete ${personFound.name}?`);

    if (result) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((e) => {
          console.error(`Error:`, e);
        });
    }
  };
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
      <Persons persons={filteredPersons()} deleteHandler={deletePerson} />
    </div>
  );
};

export default App;
