import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CountryDetail.css';

function CountryDetail() {
  const { countryName } = useParams();
  const [ country, setCountry ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setCountry(data[0]);
          } else {
            console.error(`Country not found: ${countryName}`);
            navigate('/');
          }
        })
        .catch((error) => {
          console.error('Error fetching country details:', error);
          navigate('/');
        });
  }, [ countryName, navigate ]);
  if (!country) {
    return <div>Loading...</div>;
  }
  const { name, population, region, capital, flags, nativeName, subregion, tld, currencies, languages, borders } = country || {};
  const currenciesString = currencies?.name || '';
  const languagesString = languages ? Object.values(languages).join(',') : '';
  return (
      <div className='selected-country'>
        <Link to='/'>
          <button className='back-button'>Back</button>
        </Link>
        <div className='container'>
          <div className='image flex1'>{flags?.svg && <img src={flags.svg} alt={`${name.common} Flag`}/>}</div>
          <div className='flex2'>
            <div className='upper'>
              <div className='item'>
                <h3>{name.common}</h3>
              </div>
            </div>
            <div className='lower'>
              <div className='item1'>
                <p>Native Name: {nativeName}</p>
                <p>Population: {population}</p>
                <p>SubRegion: {subregion}</p>
                <p>Capital: {capital}</p>
                <p>Region: {region}</p>
              </div>
              <div className='item2'>
                <p>Top Level Domain: {tld}</p>
                <p>Currencies: {currenciesString}</p>
                <p>Language: {languagesString}</p>
                <p> Border Countries: {borders}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
export default CountryDetail;
