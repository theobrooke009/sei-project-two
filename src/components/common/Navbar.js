import { Link } from 'react-router-dom'
import React from 'react'

function Navbar() {

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Home
          </Link>
          <Link to="/index" className="navbar-item">
            Index
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar