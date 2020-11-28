import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Displaycountries = (props) => {
  let amount = props.countries.length

  if (amount > 10) {
    return (
      <>too many matches ({amount}), specify another filter</>
    )
  } else if (amount === 1) {
    return (
      <DisplayInfo country={props.countries[0]} />
    )
  } else if (amount < 1) {
    return (
      <>no results</>
    )
  } else {
    return (
      props.countries.map(country =>
        <DisplayName key={props.countries.name} country={country} setNewFilter={props.setNewFilter} />
      )
    )
  }
}

const DisplayName = (props) => {
  let country = props.country

  return (
    <>
      {country.name}
      <button onClick={(()=> 
        props.setNewFilter(props.country.name))}> show </button>
      <br></br>
    </>
  )
}

const DisplayWeather = (props) => {
  const [newweather, setNewWeather] = useState({location:{}, current: {}});
  const key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${key}&query=${props.capital}`)
    .then(response => {
      console.log('promise fullfilled')
      setNewWeather(response.data)
      console.log(response.data)
    })
  }, [props.capital])

  let wind = (newweather.current.wind_speed/3.6).toFixed(1)

  return(
    <div>
      observation time: {newweather.current.observation_time} <br></br>
      temperature: {newweather.current.temperature} celcius <br></br>
      feels like: {newweather.current.feelslike} celcius <br></br>
      humidity: {newweather.current.humidity} %<br></br>
      wind: {wind} m/s direction {newweather.current.wind_dir} <br></br>
      <img src = {newweather.current.weather_icons} alt="weatherpic"/> 
    </div>
  )
}

const DisplayInfo = (props) => {

  let country = props.country

  return (
    <>
      <h2>{country.name}</h2>

      capital: {country.capital} <br></br>
      population: {country.population.toLocaleString()} <br></br>

      <h3>languages</h3>
      <ul>
        {country.languages.map(language =>
          <DisplayLanguage key={country.languages.name} language={language} />
        )}
      </ul>

      <img src={country.flag} alt={country.name} width="200" height="150" />

      <h3>Weather in {country.capital}</h3>
      <DisplayWeather capital={country.capital}/>


    </>
  )
}

const DisplayLanguage = ({ language }) => {
  return (
    <><li>{language.name} </li></>
  )
}



const DisplayFilter = (props) => {
  return (
    <form>
      find countries
      <input
        onChange={props.handleFilterChange}
      />
    </form>
  )
}

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
 

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  let filtered = countries.filter(item => item.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>

      <h2>Countries</h2>
      NOTE: Requires starting with REACT_APP_API_KEY="your weatherstack api key" npm start<br></br><br></br>
      <DisplayFilter
        handleFilterChange={handleFilterChange} />

      <Displaycountries
        countries={filtered}
        setNewFilter={setNewFilter} />

    </div>
  )
}

export default App