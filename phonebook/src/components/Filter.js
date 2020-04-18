import React from 'react';

const Filter = ({handleSearch, search}) => {
  return(
    <div>
      search: <input type="search" onChange={handleSearch} value={search}/>
    </div>
  )
}

export default Filter;

