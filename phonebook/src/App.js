import React, {useState} from 'react';
import './App.scss';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
  const [person, setPerson] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

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
      setPerson(person.concat(newPerson));
      setNewName('');
      setNewNumber('');
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
