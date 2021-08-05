import React from 'react'
import { getAllHeros } from '../../lib/api'

import HeroCardLeft from './HeroCardLeft'


function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)
    }
    getData()
  },[])

  console.log(heroes)

  const filteredHeroes = () => {
    let getId = Math.floor(Math.random() * 563)
    console.log(getId)
    return heroes.filter(hero =>{
      return hero.id === getId
    })
  }

  return (
    <section>
      <div className="container"> 
        <div className="columns">
          {heroes && filteredHeroes().map(hero =>{
            console.log('left card')
            return (
              <>
                <HeroCardLeft key={hero.id}
                  hero={hero}/>
              </>
            )
          })}
           {heroes && filteredHeroes().map(hero =>{
            console.log('right card')
            return (
              <>
                <HeroCardLeft key={hero.id}
                  hero={hero}/>
              </>
            )
          })}
        </div>  
      </div> 
    </section>
       
  )
 
}

export default HeroGame

