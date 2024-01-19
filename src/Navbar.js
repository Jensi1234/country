// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ onDarkModeToggle }) => {
  return (
      <nav className='navbar'>
        <div className='nav-item'>
          <FontAwesomeIcon icon={faGlobe}/>
          <p>Where is the world?</p>
        </div>
        <div className='nav-item dark-mode-toggle' onClick={onDarkModeToggle}>
          <div className='moon'>
            <FontAwesomeIcon icon={faMoon}/>
            <p1>Dark Mode</p1>
          </div>
        </div>
      </nav>
  );
};
export default Navbar;
