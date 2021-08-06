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

  // comparing each powerstat individually
  // intelligence win, intelligence loss, intelligence draw

  // render a statement for each win, loss or draw 

    
  const isIntelligenceWin = powerStats === 'intelligence' &&
  playerChoice === heroLeft && heroLeft.powerstats.intelligence > heroRight.powerstats.intelligence ||
  playerChoice === heroRight && heroRight.powerstats.intelligence > heroLeft.powerstats.intelligence

  const isIntelligenceLose = powerStats === 'intelligence' &&
  playerChoice === heroLeft && heroLeft.powerstats.intelligence < heroRight.powerstats.intelligence ||
  playerChoice === heroRight && heroRight.powerstats.intelligence < heroLeft.powerstats.intelligence

  const isIntelligenceDraw = powerStats === 'intelligence' && 
  playerChoice === heroLeft && heroLeft.powerstats.intelligence === heroRight.powerstats.intelligence || 
  playerChoice === heroRight && heroRight.powerstats.intelligence === heroLeft.powerstats.intelligence

  const isSpeedWin = powerStats === 'speed' &&
  playerChoice === heroLeft && heroLeft.powerstats.speed > heroRight.powerstats.speed ||
  playerChoice === heroRight && heroRight.powerstats.speed > heroLeft.powerstats.speed 
  
  const isSpeedLose = powerStats === 'speed' &&
  playerChoice === heroLeft && heroLeft.powerstats.speed < heroRight.powerstats.speed ||
  playerChoice === heroRight && heroRight.powerstats.speed < heroLeft.powerstats.speed

  const isSpeedDraw = powerStats === 'speed' && 
  playerChoice === heroLeft && heroLeft.powerstats.speed === heroRight.powerstats.speed || 
  playerChoice === heroRight && heroRight.powerstats.speed === heroLeft.powerstats.speed
                      
  const isCombatWin = powerStats === 'combat' &&
  playerChoice === heroLeft && heroLeft.powerstats.combat > heroRight.powerstats.combat ||
  playerChoice === heroRight && heroRight.powerstats.combat > heroLeft.powerstats.combat

  const isCombatLose = powerStats === 'combat' &&
  playerChoice === heroLeft && heroLeft.powerstats.combat < heroRight.powerstats.combat ||
  playerChoice === heroRight && heroRight.powerstats.combat < heroLeft.powerstats.combat

  const isCombatDraw = powerStats === 'combat' && 
  playerChoice === heroLeft && heroLeft.powerstats.combat === heroRight.powerstats.combat || 
  playerChoice === heroRight && heroRight.powerstats.combat === heroLeft.powerstats.combat

  const isDurabilityWin = powerStats === 'durability' &&
  playerChoice === heroLeft && heroLeft.powerstats.durability > heroRight.powerstats.durability ||
  playerChoice === heroRight && heroRight.powerstats.durability > heroLeft.powerstats.durability

  const isDurabilityLose = powerStats === 'durability' &&
  playerChoice === heroLeft && heroLeft.powerstats.durability < heroRight.powerstats.durability ||
  playerChoice === heroRight && heroRight.powerstats.durability < heroLeft.powerstats.durability

  const isDurabilityDraw = powerStats === 'durability' &&
  playerChoice === heroLeft && heroLeft.powerstats.durability === heroRight.powerstats.durability ||
  playerChoice === heroRight && heroRight.powerstats.durability === heroLeft.powerstats.durability

  const isPowerWin = powerStats === 'power' &&
  playerChoice === heroLeft && heroLeft.powerstats.power > heroRight.powerstats.power ||
  playerChoice === heroRight && heroRight.powerstats.power  > heroLeft.powerstats.power 

  const isPowerLose = powerStats === 'power' &&
  playerChoice === heroLeft && heroLeft.powerstats.power < heroRight.powerstats.power ||
  playerChoice === heroRight && heroRight.powerstats.power  < heroLeft.powerstats.power 

  const isPowerDraw = powerStats === 'power' &&
  playerChoice === heroLeft && heroLeft.powerstats.power === heroRight.powerstats.power ||
  playerChoice === heroRight && heroRight.powerstats.power  === heroLeft.powerstats.power 

  const isStrengthWin = powerStats === 'strength' &&
  playerChoice === heroLeft && heroLeft.powerstats.strength > heroRight.powerstats.strength ||
  playerChoice === heroRight && heroRight.powerstats.strength  > heroLeft.powerstats.strength

  const isStrengthLose = powerStats === 'strength' &&
  playerChoice === heroLeft && heroLeft.powerstats.strength < heroRight.powerstats.strength ||
  playerChoice === heroRight && heroRight.powerstats.strength  < heroLeft.powerstats.strength

  const isStrengthDraw = powerStats === 'strength' &&
  playerChoice === heroLeft && heroLeft.powerstats.strength === heroRight.powerstats.strength ||
  playerChoice === heroRight && heroRight.powerstats.strength  === heroLeft.powerstats.strength

  
  
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
 
  function handleClick(e) {
    // setting the power stats for each card
    if (e.currentTarget.innerText === heroLeft.name) {
      // setting the player choice
      setPlayerChoice(heroLeft)  
    } else {
      setPlayerChoice(heroRight) 
    }
    console.log('power stats new', powerStats)
    console.log('hero left stats', heroLeft.powerstats)
    console.log('hero right stats', heroRight.powerstats)
  }

  return (
    <section>
      <div className="container"> 
        
        {playerChoice && powerStats === 'intelligence' && isIntelligenceWin && <p>You int win</p>}

        {playerChoice &&  powerStats === 'intelligence' && isIntelligenceLose && <p>You int lose</p>}

        {playerChoice && powerStats === 'intelligence' &&  isIntelligenceDraw && <p>You int draw</p>}

        {playerChoice && powerStats === 'speed' && isSpeedWin && <p>You speed win</p>}

        {playerChoice &&  powerStats === 'speed' && isSpeedLose && <p>You speed lose</p>}

        {playerChoice && powerStats === 'speed' && isSpeedDraw && <p>You speed draw</p>}

        {playerChoice && powerStats === 'combat' && isCombatWin && <p>You combat win</p>}

        {playerChoice &&  powerStats === 'combat' && isCombatLose  && <p>You combat lose</p>}

        {playerChoice && powerStats === 'combat' && isCombatDraw && <p>You combat draw</p>}

        {playerChoice && powerStats === 'durability' && isDurabilityWin && <p>You durability win</p>}

        {playerChoice &&  powerStats === 'durability' && isDurabilityLose  && <p>You durability lose</p>}

        {playerChoice && powerStats === 'durability' && isDurabilityDraw && <p>You durability draw</p>}

        {playerChoice && powerStats === 'power' && isPowerWin && <p>You power win</p>}

        {playerChoice &&  powerStats === 'power' && isPowerLose  && <p>You power lose</p>}

        {playerChoice && powerStats === 'power' && isPowerDraw && <p>You power draw</p>}

        {playerChoice && powerStats === 'strength' && isStrengthWin && <p>You strength win</p>}

        {playerChoice &&  powerStats === 'strength' && isStrengthLose  && <p>You strength lose</p>}

        {playerChoice && powerStats === 'strength' && isStrengthDraw && <p>You strength draw</p>}
        
        

     

    
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

