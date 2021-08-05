// import { Link } from 'react-router-dom'

import React from 'react'


function HeroCard ( { heroRight }) {

  

  const handleClick = () => {

  }
  
  return (
    // <Link>
    <div onClick={handleClick} key={heroRight.id} className="column" > 
      <div className="column is-half-desktop is-one-third-tablet">
        <div className="card">
          <div className="card-content">
              <h3>{heroRight.name}</h3>
          </div>
          <div className="card-image">
            <figure >
              <img src={heroRight.images.md}/>
            </figure>
          </div>
        </div>
      </div>
    </div>



      
  // </Link>
  )
}

export default HeroCard