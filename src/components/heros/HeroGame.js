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


function getPowerStat() {
  const powerStatArray = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength']
  let chosenStat = powerStatArray[Math.floor(Math.random() * 6)]
  return chosenStat
}

console.log(getPowerStat())



function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)
  const [heroRight, setHeroRight] = React.useState(null)
  const [heroLeft, setHeroLeft] = React.useState(null)
  const [powerStats, setPowerStats] = React.useState('')
  const [playerChoice, setPlayerChoice] = React.useState('')
  const [powerStatsLeft, setPowerStatsLeft] = React.useState('')
  const [powerStatsRight, setPowerStatsRight] = React.useState('')


  const isWin = playerChoice === heroLeft && powerStatsLeft.intelligence > powerStatsRight.intelligence ||
                playerChoice === heroRight && powerStatsRight.intelligence > powerStatsLeft.intelligence

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)
      const [first, second] = getTwoHeros(response.data)
      setHeroLeft(first)
      setHeroRight(second)
      setPowerStats(getPowerStat()) 
    }
  
    getData()
  },[])

  console.log('the stat', powerStats)

  function handleClick(e) {
    // setting the power stats for each card
    setPowerStatsLeft(heroLeft.powerstats)
    setPowerStatsRight(heroRight.powerstats)
    if (e.currentTarget.innerText === heroLeft.name) {
      // setting the player choice
      setPlayerChoice(heroLeft)  
    } else {
      setPlayerChoice(heroRight) 
    }
  }


  return (
    <section>
      <div className="container"> 
        {playerChoice && isWin && <p>You win</p>}
        {playerChoice && !isWin && <p>You lose</p>}
        <div onClick={handleClick} className="columns">
          { heroLeft &&
            <HeroCardLeft 
              key={heroLeft.id}
              heroLeft = {heroLeft}
            />
          }
        </div>  
        <div onClick={handleClick} className="columns">
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

