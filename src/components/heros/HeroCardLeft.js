import React from 'react'

function HeroCard ( { heroLeft }) {

  return (
    <div key={heroLeft.id}> 
      <div className="hero-cards">
        <div className="card">
          <div className="card-content">
            <h3>{heroLeft.name}</h3>
          </div>
          <div className="card-image">
            <figure >
              <img src={heroLeft.images.md}/>
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroCard