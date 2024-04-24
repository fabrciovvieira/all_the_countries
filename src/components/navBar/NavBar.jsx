import React from 'react'
import { Link } from 'react-router-dom'
import { Toggle } from '../toggle/Toggle'
import './NavBar.css'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'

const NavBar = ({ isDark, setIsDark }) => {
  return (
    <div className='navbar-container'>
      <Link to="/">
        <h2>ALL THE COUNTRIES</h2>
      </Link>
      <div className="container-toggle">
        {isDark ? <FaRegSun className="icones" /> : <FaRegMoon className="icones" />}
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      </div>
    </div>
  )
}

export default NavBar