import React, {useState} from 'react';
import './App.scss';

function App() {
  const [person, setPerson] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleInput = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(person.find(el => el.name !== newName)){
      const newPerson = {
        name: newName
      }
      setPerson(person.concat(newPerson));
      setNewName('');
    }else{
      alert(`${newName} is already added to phonebook`);
    }    
  }
  return (
    <div className="app">
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleInput} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        person.map(el => {
          return <p key={person.length + 1}>{el.name}</p>
        })
      }
    </div>
  );
}

export default App;
