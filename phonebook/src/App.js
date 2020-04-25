import React, {useState, useEffect} from 'react';
import './App.scss';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './services/axios-service';
import Notification from './components/Notification';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    services.getAll().then(persons => setPerson(persons));
  },[]);

  const handleNewName = (e) => {
    setNewName(e.target.value);
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!person.find(el => el.name === newName)){
      const newPerson = {
        name: newName,
        number: newNumber
      }
      services.newPerson(newPerson).then(update => {
        setPerson(person.concat(update));
        setNewName('');
        setNewNumber('');
        setMessage(`${newName} is added.`);
        setTimeout(() => {
          setMessage(null);
        },5000);
      })      
    }else{
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const element = person.find(el => el.name === newName);
        const updatedPerson = {
          ...element,
          number : newNumber
        }
        services.updateNumber(element.id, updatedPerson).then(res => {
          setNewName('');
          setNewNumber('');
          services.getAll().then(persons => setPerson(persons));
          setMessage(`${element.name} number is updated.`);
          setTimeout(() => {
            setMessage(null);
          },5000);
        })
      }
    }    
  }

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}`)){
      services.deletePerson(id).then(res => {
        console.log(`Person ${id} is deleted.`);
        services.getAll().then(persons => setPerson(persons));
      })
    }
  }

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} search={search}/>
      <h2>Add a new number</h2>
      <PersonForm 
        handleSubmit={handleSubmit} handleNewName={handleNewName}
        handleNewNumber={handleNewNumber} newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons person={person} search={search} deletePerson={deletePerson} />
    </div>
  );
}

export default App;
