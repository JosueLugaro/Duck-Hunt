
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <nav className="nav-container">
        <div className="Logo-container">
          <NavLink to='/'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.245 26.256" width="64" height="64">
              <path d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128" fill="#da552f"/>
              <path d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595" fill="#fff"/>
            </svg>
          </NavLink>
        </div>
        <div className="nav-options-container" onMouseOver={() => setIsOpen(false)} onMouseLeave={() => setIsOpen(true)}>

            Profile Pic

            <div className="action-container" hidden={isOpen}>
              <div className="dropdown-option">
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </div>
              <div className="dropdown-option">
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </div>
              <div className="dropdown-option">
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </div>
              <div className="dropdown-option">
                <NavLink to='/users' exact={true} activeClassName='active'>
                  Users
                </NavLink>
              </div>
              <div className="dropdown-option">
                <LogoutButton />
              </div>
            </div>
        </div>
    </nav>
  );
}

export default NavBar;
