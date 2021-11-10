import React from 'react'
import { getAllHeros } from '../../lib/api'

function HeroIndex () {

  const [heroes, setHeroes] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)
    }
    getData()
  }, [])

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }


  const filteredHeroes = () => {
    return heroes.filter(hero => {
      return hero.name.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  return (
    <>
      <div className="search-container">
        <input 
          className="input" 
          placeholder="Search"
          onChange={handleSearch}
        />
      </div>

      <section className="section"> 
        <div className="container">
          <div className="columns is-multiline">
            {heroes && filteredHeroes().map(hero => {
              return  <div key={hero.id}> 
                <div>
                  <div className="card">
                    <div className="card-content">
                      <h3>{hero.name}</h3>
                    </div>
                    <div className="card-image">
                      <figure >
                        <img src={hero.images.md}/>
                      </figure>
                    </div>
                    <div>
                      <p>Intelligence {hero.powerstats.intelligence}</p>
                      <p>Strength {hero.powerstats.strength}</p>
                      <p>Speed {hero.powerstats.speed}</p>
                      <p>Durability {hero.powerstats.durability}</p>
                      <p>Power {hero.powerstats.power}</p>
                      <p>Combat {hero.powerstats.combat}</p>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>  
        </div>
      </section>
    </>
  )
  
}

export default HeroIndex