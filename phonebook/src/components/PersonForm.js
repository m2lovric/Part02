import React from 'react';

const PersonForm = ({handleSubmit, handleNewName, handleNewNumber, newName, newNumber}) => {
  return(
    <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleNewName} value={newName} /><br/>
          number: <input onChange={handleNewNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm;