import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import CountryDetail from './CountryDetail';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './App.css';

function App() {
  const [ myData, setMyData ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ selectedRegion, setSelectedRegion ] = useState('');
  const [ darkMode, setDarkMode ] = useState(false);
  const [ buttonClicked, setButtonClicked ] = useState(false);

  useEffect(() => {
    AOS.init();
    axios
        .get('https://restcountries.com/v3.1/all')
        .then((res) => setMyData(res.data))
        .catch((error) => console.error('Error fetching data:', error));
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };
  const handleButtonClick = () => {
    setButtonClicked(true);
  };
  const filteredData = myData.filter(
      (country) =>
          country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedRegion === '' || country.region === selectedRegion)
  );
  return (
      <Router>
        <div className={`App${darkMode ? ' dark-mode' : ''}`}>
          <Navbar darkMode={darkMode} onDarkModeToggle={toggleDarkMode}/>

          <div className='sbar'>
            <div className='search-bar'>
              <input
                  type='text'
                  placeholder='Search for a country...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className='region-filter'>
              <label htmlFor='region'>Filter by Region:</label>
              <select id='region' value={selectedRegion} onChange={handleRegionChange}>
                <option value=''>All</option>
                <option value='Africa'>Africa</option>
                <option value='Americas'>Americas</option>
                <option value='Asia'>Asia</option>
                <option value='Europe'>Europe</option>
                <option value='Oceania'>Oceania</option>
              </select>
            </div>
          </div>
          <Routes>
            <Route path='/' element={<CountryList filteredData={filteredData} onButtonClick={handleButtonClick} darkMode={darkMode} />} />
            <Route path='/country/:countryName' element={<CountryDetail />} />
          </Routes>

        </div>
      </Router>
  );
}
function CountryList({ filteredData, onButtonClick, darkMode }) {
  return (
      <div className='country'>
        {filteredData.map((country) => {
          const { name, population, region, capital, flags } = country;
          const flagUrl = flags?.svg || '';
          const countryName = name?.common || '';
          return (
              <div className={`card${darkMode ? ' black' : ''}`} key={countryName}>
                <div className='main1'>
                  <div className='sub1'>
                    <Link to={`/country/${countryName}`} onClick={onButtonClick}>
                      {flagUrl && <img src={flagUrl} alt={`${countryName} flag`}/>}
                    </Link>
                  </div>
                  <div className={` sub2 ${darkMode ? 'black' : ''}`}>
                    <h2>{countryName}</h2>
                    <p>Population: {population}</p>
                    <p>Region: {region}</p>
                    <p>Capital: {capital}</p>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
  );
}

export default App;