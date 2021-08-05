// import { Link } from 'react-router-dom'

function HeroCard ( { hero }) {
  return (
    // <Link>
    <div key={hero.id} className="column" > 
      <div className="column is-half-desktop is-one-third-tablet">
        <div className="card">
          <div className="card-content">
            <h3>{hero.name}</h3>
          </div>
          <div className="card-image">
            <figure >
              <img src={hero.images.md}/>
            </figure>
          </div>
        </div>
      </div>
    </div>
  // </Link>
  )
}

export default HeroCard