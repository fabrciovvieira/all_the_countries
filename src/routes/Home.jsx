import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import apiFlags from '../axios/config'
import './Home.css'

const Home = () => {
  const { data, region } = useFetch(apiFlags, '/all')
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');

  if (!data) return ( <div className="loading"></div>)

  const filteredResults = data.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedContinent === 'All' || country.region === selectedContinent)
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };

  return (
    <div className="geral">
      <div className="container-globe">
        <div className="filter-navbar">
          <input
            type="text"
            placeholder='Search'
            value={searchTerm}
            onChange={handleSearch} />
            <div className='globe'></div>
          <select id="filter" onChange={handleContinentChange} value={selectedContinent}>
            <option value="All">All</option>
            {region.map((continent) => (
              <option key={continent} value={continent}>{continent}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container-home'>
        {filteredResults.map((country) => (
          <Link to={`/all_the_countries/country/${country.name.common}`}>
            {/*QUERO ENVIAR JUNTO COM O LINK O COUNTRY.BORDERS*/}
            <div className="card-home-country" key={country.alpha3Code}>
              <div className="flag" style={{ backgroundImage: `url(${country.flags.png})` }}></div>
              <div className='info-country' >
                <h4>{country.name.common}</h4>
                <p>Population: {country.population}</p>
                <p>Capital: {country.capital}</p>
                <p>Continent: {country.region}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
