import React, {useState, useEffect} from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filterC, setFilterC] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      })
  })

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilterC(countries.filter(el => el.name.toLowerCase().includes(search.toLowerCase())));
  }

  return (
    <div className="App">
      <div>find countries: <input type="search" onChange={handleSearch} value={search}/></div>
      {
        filterC.length > 10 ? 
        'Too many matches, specify another filter.' : 
        filterC.map(el => {
          return <p>{el.name}</p>
        })
      }
      {
        filterC.length == 1 ? 
        filterC.map(el => {
          return(
            <div>
              <h2>{el.name}</h2>
              <p>capital: {el.capital}</p>
              <p>population: {el.population}</p>
              <h3>languages</h3>
              <ul>
                {el.languages.map(el => <li>{el.name}</li>)}
              </ul>
              <img src={el.flag} alt="flag"/>
            </div>
          )
        }) : ''
      }
    </div>
  );
}

export default App;
