import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import NotificationMesage from "./components/NotificationMesage";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationType, setNotificationType] = useState(null);
  const [notificationMessage, setMotificationMessage] = useState(null);

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
            setNotificationType("success");
            setMotificationMessage(`Updated ${newName}`);
          })
          .catch((e) => {
            console.error(`Error:`, e);
            setNotificationType("error");
            setMotificationMessage(`${newName} could not be updated`);
          });
      }
    } else {
      const newPerson = { name: newName, number: newPhone };
      personsService.create(newPerson).then((newPersonResponse) => {
        setPersons(persons.concat(newPersonResponse));
        setNotificationType("success");
        setMotificationMessage(`Added ${newName}`);
      });
    }

    // Notification cleanup
    setTimeout(() => {
      setMotificationMessage(null);
    }, 3000);

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
          setNotificationType("success");
          setMotificationMessage(`Removed ${personFound.name}`);
        })
        .catch((e) => {
          console.error(`Error:`, e);
          setNotificationType("error");
          setMotificationMessage(
            `${personFound.name} has already been removed from database.`
          );
          setPersons(persons.filter((p) => p.id !== id));
        });

      // Notification cleanup
      setTimeout(() => {
        setMotificationMessage(null);
      }, 3000);
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMesage
        notificationType={notificationType}
        message={notificationMessage}
      />
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
