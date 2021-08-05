import React from 'react'
import { getAllHeros } from '../../lib/api'

import HeroCardLeft from './HeroCardLeft'
import HeroCardRight from './HeroCardRight'

function getTwoHeros(heroes) {
  let firstIndex = Math.floor(Math.random() * heroes.length)
  let firstHero = heroes[firstIndex]

  while (!firstHero.id) {
    firstIndex = Math.floor(Math.random() * heroes.length)
    firstHero = heroes[firstIndex]
  }

  let secondIndex = Math.floor(Math.random() * heroes.length)
  let secondHero = heroes[secondIndex]

  while (secondIndex === firstIndex || !secondHero.id) {
    secondIndex = Math.floor(Math.random() * heroes.length)
    secondHero = heroes[secondIndex]
  }

  return [firstHero, secondHero]
}

function handleClickLeft(e) {
  // if it is left card, say is left
  console.log(e)
}




function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)
  const [heroRight, setHeroRight] = React.useState(null)
  const [heroLeft, setHeroLeft] = React.useState(null)



  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)
      const [first, second] = getTwoHeros(response.data)
      setHeroLeft(first)
      setHeroRight(second)
  
    }
  
    getData()
  },[])


  return (
    <section>
      <div onClick={handleClickLeft} className="container"> 
        <div className="columns">
          { heroLeft &&
            <HeroCardLeft 
              key={heroLeft.id}
              heroLeft = {heroLeft}
            />
          }

        </div>  
        <div className="columns">
          { heroRight &&
            <HeroCardRight
              key={heroRight.id}
              heroRight = {heroRight}
            />
          }

        </div>  
      </div>

    </section>
       
  )
 
}

export default HeroGame

