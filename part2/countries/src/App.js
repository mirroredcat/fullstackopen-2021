import React, { useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({value, onChange}) => {
  return (
    <form>
      <div>
        find countries <input
          value={value}
          onChange={onChange}
        />
      </div>
    </form>
  )
}

const Show = ({name, onClick}) => {
  return (
      <li>
        {name} 
        <button onClick={onClick} >show</button>
      </li>
  )
}

const Weather = ({city}) => {
  const [weatherData, setWeatherData] = useState('default')

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => {
        setWeatherData(response.data)
    })
  }, [city])

  const directionConverter= (deg) => {
    return (0 <= deg && deg < 22.5 ? 'N' :
            22.5 <= deg && deg < 45 ?  'NNE' :
            45 <= deg && deg < 67.5 ? 'NE' :
            67.5 <= deg && deg < 90 ? 'ENE' :
            90 <= deg && deg < 112.5 ? 'E' :
            112.5 <= deg && deg < 135 ? 'ESE' :
            135 <= deg && deg < 157.5 ? 'SE' :
            157.5 <= deg && deg < 180 ? 'SSE' :
            180 <= deg && deg < 202.5 ? 'S' :
            202.5 <= deg && deg < 225 ?  'SSW' :
            225 <= deg && deg < 247.5 ? 'SW' :
            247.5 <= deg && deg < 270 ? 'WSW' :
            270 <= deg && deg < 292.5 ? 'W' :
            295.5 <= deg && deg < 315 ? 'WNW' :
            315 <= deg && deg < 337.5 ? 'NW' :
            'NNW' )
  }

  if (weatherData === 'default'){
    return (
      <div>loading...</div>
    )}
  else {
    let imgAdress = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
    return (
        <div>
          <h2>Weather in {city}</h2>
          <p><b>temperature:</b> {weatherData.main.temp} Celsius</p>
          <img src={imgAdress} alt='weather icon'/>
          <p><b>wind:</b> {weatherData.wind.speed} m/s direction {directionConverter(weatherData.wind.deg)} </p>
        </div>
      )
    }
}

const CountryInfo = ({obj}) => {
  return (
    <div>

      <h1>{obj.name.common}</h1>
      capital {obj.capital}
      <br></br>
      population {obj.population}

      <h2>Spoken languages</h2>
      <ul>
        {Object.values(obj.languages).map(lang => (
          <li key={lang}>
            {lang}
          </li>
        ))}
      </ul>
      <p>{obj.flag}</p>

    </div>
  )
}


const Countries = ({countries, filter, onClick}) => {
  if (filter.length === 0) {
    return (
      <div>
        Use the above field to search info on a country
      </div>
    )
  } else {
    const filtered = countries.filter(function(country) {
      return country.name.common.toLowerCase().includes(filter.toLowerCase())
    })
    if (filtered.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else {
      if (filtered.length < 2 && filtered.length > 0) {
        return (
          <div>
            <CountryInfo obj={filtered[0]} />
            <Weather  city={filtered[0].capital} />
          </div>
        )
      } else if (filtered.length === 0) {
        return (
          <div>
            No country matches your search.
          </div>
        )
      }
      else {
        return (
          <div>
            <ul>
            {filtered.map(country => 
                  <Show key={country.name.common} name={country.name.common + " "} onClick={()=> onClick(country.name.common)} />
            )}
            </ul>
            </div>
        )
      }
    }
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleUpdateFilter=(text) => {
    setNewFilter(text)
  }

  return (
    <div>
      <Filter value={newFilter} onChange={handleNewFilter} />
      <br></br>
      <Countries countries={countries} filter={newFilter} onClick={handleUpdateFilter} />
    </div>
  )
}



export default App;