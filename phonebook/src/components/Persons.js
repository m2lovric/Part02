import React from 'react';

const Persons = ({person, search}) => {
  return(
    <div>
      {
        person.filter(el => el.name.toLowerCase().includes(search.toLowerCase())).map(el => {
          return <p key={el.name}>{el.name}: {el.number}</p>
        })
      }
    </div>
  )
}

export default Persons;