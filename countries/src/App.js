import React, {useState, useEffect} from 'react';
import './App.css'
import axios from 'axios';
const ListCountry = ({el}) => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () =>{
    setToggle(!toggle);
  }
  return (
    <div key={el.cioc}>
      <p>{el.name}</p>
      <button onClick={handleToggle}>show</button>
      <div className={toggle ? 'active' : 'hidden'}>
        <Country filterC={el}/>
      </div>
    </div>
  )
}
const Countries = ({filterC}) => {
  return(
    <div>
      {
        filterC.length > 10 ? 
        'Too many matches, specify another filter.' : 
        filterC.map(el => {
          return <ListCountry el={el}/>
        })
      }
    </div>
  )
}

const Country = ({filterC}) => {  
  const [weather, setWeather] = useState({
    temp: 0,
    wind: 0,
    icon:''
  });
  const data = filterC.capital;
  console.log(data);
  useEffect(() => {
    const capital = data;
    console.log(capital);
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then(res => {
      setWeather(() => {
        return({
          temp: weather.temp + res.data.main.temp,
          wind: weather.wind + res.data.wind.speed,
          icon: weather.icon + res.data.weather[0].icon
        });
      });
    })
  }, [])
  const arr = [filterC];
  return(
    <div>
      {
        arr.map(el => {
          return(
            <div key={el.cioc}>
              <h2>{el.name}</h2>
              <p>capital: {el.capital}</p>
              <p>population: {el.population}</p>
              <h3>languages</h3>
              <ul>
                {el.languages.map(el => <li key={el.name}>{el.name}</li>)}
              </ul>
              <img src={el.flag} alt="flag"/>        
            </div>
          )
        })
      }    
      <p>temp: {weather.temp}</p>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="icon"/>
      <p>wind speed: {weather.wind}</p>
    </div>
  )
}

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

  },[])

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilterC(countries.filter(el => el.name.toLowerCase().includes(search.toLowerCase())));
  }

  return (
    <div className="App">
      <div>find countries: <input type="search" onChange={handleSearch} value={search}/></div>
      {
        filterC.length === 1 ?
        <Country filterC={filterC[0]} /> :
        <Countries filterC={filterC} />
      }
    </div>
  );
}

export default App;
