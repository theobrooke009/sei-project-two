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


function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)
  const [heroRight, setHeroRight] = React.useState(null)
  const [heroLeft, setHeroLeft] = React.useState(null)
  const [powerStats, setPowerStats] = React.useState('')

  const [playerChoice, setPlayerChoice] = React.useState('')
  const [powerStatsLeft, setPowerStatsLeft] = React.useState('')
  const [powerStatsRight, setPowerStatsRight] = React.useState('')
  
  const isIntelligenceWin = powerStats === 'intelligence' &&
  playerChoice === heroLeft && powerStatsLeft.intelligence > powerStatsRight.intelligence ||
  playerChoice === heroRight && powerStatsRight.intelligence > powerStatsLeft.intelligence



  const isSpeedWin = powerStats === 'speed' &&
  playerChoice === heroLeft && powerStatsLeft.speed > powerStatsRight.speed ||
  playerChoice === heroRight && powerStatsRight.speed > powerStatsLeft.speed
                         
  const isCombatWin = powerStats === 'combat' &&
  playerChoice === heroLeft && powerStatsLeft.combat > powerStatsRight.combat ||
  playerChoice === heroRight && powerStatsRight.combat > powerStatsLeft.combat

  const isDurabilityWin = powerStats === 'durability' &&
  playerChoice === heroLeft && powerStatsLeft.durability > powerStatsRight.durability ||
  playerChoice === heroRight && powerStatsRight.durability > powerStatsLeft.durability

  const isPowerWin = powerStats === 'power' &&
  playerChoice === heroLeft && powerStatsLeft.power > powerStatsRight.power ||
  playerChoice === heroRight && powerStatsRight.power > powerStatsLeft.power

  const isStrengthWin = powerStats === 'strength' &&
  playerChoice === heroLeft && powerStatsLeft.strength > powerStatsRight.strength  ||
  playerChoice === heroRight && powerStatsRight.strength  > powerStatsLeft.strength 


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

  console.log('power stats new', powerStats)

  // if the powerStat string we have set up is the same as the hero.powerstat 
  // set that as the powerstat to match win states

  console.log(heroes)


 
  


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

    const winPowerState = () => {
      return heroes.filter(hero =>{
        if (heroLeft.powerstats === powerStats){
          console.log('match')
        }
      })
    }
  
    winPowerState()

  }

  return (
    <section>
      <div className="container"> 
        
        {playerChoice && isIntelligenceWin && <p>You int win</p>}
        
        {playerChoice && isSpeedWin && <p>You speed win</p>}
        
        {playerChoice && isCombatWin && <p>You combat win</p>}
        
        {playerChoice && isDurabilityWin && <p>You dur win</p>}
        
        {playerChoice && isPowerWin && <p>You power win</p>}
      
        {playerChoice && isStrengthWin && <p>You strength win</p>}

    
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

