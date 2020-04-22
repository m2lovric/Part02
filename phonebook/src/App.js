import React, {useState, useEffect} from 'react';
import './App.scss';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3002/persons')
      .then(res => {
        setPerson(res.data);
      })
  })

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
    if(person.find(el => el.name !== newName)){
      const newPerson = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3002/persons', newPerson)
        .then(res => {
          setPerson(person.concat(res.data));
          setNewName('');
          setNewNumber('');
        })      
    }else{
      alert(`${newName} is already added to phonebook`);
    }    
  }
  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search}/>
      <h2>Add a new number</h2>
      <PersonForm 
        handleSubmit={handleSubmit} handleNewName={handleNewName}
        handleNewNumber={handleNewNumber} newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons person={person} search={search} />
    </div>
  );
}

export default App;
