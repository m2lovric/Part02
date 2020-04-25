import React from 'react';

const Persons = ({ person, search, deletePerson }) => {
  return(
    <div>
      {
        person.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(el => {
          return (
            <article key={el.id} className="person">
              <p>{el.name}: {el.number}</p>
              <button onClick={() => deletePerson(el.id, el.name)}>delete</button>
            </article>
          )
        })
      }
    </div>
  )
}

export default Persons;