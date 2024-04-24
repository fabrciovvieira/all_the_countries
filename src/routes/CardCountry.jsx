import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useBorder, useFindName } from '../hooks/useBorder';
import { useParams, useNavigate } from 'react-router-dom';
import './CardCountry.css';

const CardCountry = () => {
  const { name } = useParams()
  const navigate = useNavigate();
  const [pais, setPais] = useState();
  const siglasPaises = [];
  const borderCountries = useBorder(name);
  const nomePaises = useFindName(borderCountries);
  {nomePaises.map((a) => {
    console.log(a)
  })}

  const url = `/name/${name}`;
  const { data } = useFetch(url, url);

  useEffect(() => {
    if (pais) {
      navigate(`/country/${pais}`);
    }
  }, [pais, navigate]);

  if (!data) return (<p>Carregando</p>);

  const country = data[0];
  const currencies = country.currencies;
  const idiomas = country.languages;
  const paisesAoLado = country.borders;
  const moedas = [];
  const languages = [];
  const capital = []
  const capitais = country.capital


  const handleClick = async (border) => {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
    console.log(response.data)
    const data = await response.json();
    const fullName = data[0]?.name?.common;
    setPais(fullName);
  };

  for (const [currencyCode, currencyInfo] of Object.entries(currencies || {})) {
    if (currencyInfo?.name) {
      moedas.push(currencyInfo.name);
    }
  }

  for (const [capitalCode, capitalName] of Object.entries(capitais || {})) {
    if (capitalName) {
      capital.push(capitalName);
    }
  }

  for (const [languageCode, languageName] of Object.entries(idiomas || {})) {
    if (languageName) {
      languages.push(languageName);
    }
  }
  for (const [borderCode, borderName] of Object.entries(paisesAoLado || {})) {
    if (borderName) {
      siglasPaises.push(borderName);
    }
  }


  return (
    <div className='container-cardPage'>
      <div className='info-cardPage'>
        <div
          className='flag-cardPage'
          style={{ backgroundImage: `url(${country.flags.png})` }}
        ></div>
        <div className='topics-country'>
          <div className='name-country'>
            <h1>{country.name.common}</h1>
          </div>
          <div className='others-info'>
            <div className='top-infos'>
              <ul>
                {capital.length > 0 ? (
                  <li  className='compilado'>
                    Capital:
                    <ul>
                      {capital.map((nameCapital, index) => (
                        <li key={index}>
                          {nameCapital}
                          {index !== capital.length - 1 && ','}
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li>There is no defined capital</li>
                )}
                <li>Population: {country.population}</li>
                <li className='compilado'>
                  <b>Languages: </b>
                  <ul>
                    {languages.map((lingua, index) => (
                      <li key={index}>
                        {lingua}
                        {index !== languages.length - 1 && ','}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <ul>
                <li>Region: {country.region}</li>

                <li className='compilado'>
                  Currency:
                  <ul>
                    {moedas.map((currency, index) => (
                      <li key={index}>
                        {currency}
                        {index !== moedas.length - 1 && ','}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  Localização:
                  <a
                    style={{ marginLeft: '5px' }}
                    href={country.maps.googleMaps}
                    target='_blank'
                  >
                    Ver no mapa
                  </a>
                </li>
              </ul>
            </div>
            <div className='borders'>
              {nomePaises.length > 0 ? (
                <div className='borders'>
                  <p style={{ marginBottom: '0.5rem' }}>Border Countries:</p>
                  {nomePaises.map((border) => (
                    <span key={border.alpha2Code} onClick={() => handleClick(border.alpha2Code)}>
                      {border.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p>No borders country</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-btns">
        <button className='btn' onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default CardCountry;
