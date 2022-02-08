import React from 'react'
import { Link } from 'react-router-dom'

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
  const chosenStat = powerStatArray[Math.floor(Math.random() * 6)]
  return chosenStat
}



function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)
  const [heroRight, setHeroRight] = React.useState(null)
  const [heroLeft, setHeroLeft] = React.useState(null)
  const [powerStats, setPowerStats] = React.useState('')
  const [playerChoice, setPlayerChoice] = React.useState('')
  const [hasPlayed, setHasPlayed] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [round, setRound] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)
  


  const isIntelligenceWin = powerStats === 'intelligence' &&
  playerChoice === heroLeft && heroLeft.powerstats.intelligence > heroRight.powerstats.intelligence ||
  playerChoice === heroRight && heroRight.powerstats.intelligence > heroLeft.powerstats.intelligence

  const isSpeedWin = powerStats === 'speed' &&
  playerChoice === heroLeft && heroLeft.powerstats.speed > heroRight.powerstats.speed ||
  playerChoice === heroRight && heroRight.powerstats.speed > heroLeft.powerstats.speed 
                    
  const isCombatWin = powerStats === 'combat' &&
  playerChoice === heroLeft && heroLeft.powerstats.combat > heroRight.powerstats.combat ||
  playerChoice === heroRight && heroRight.powerstats.combat > heroLeft.powerstats.combat

  const isDurabilityWin = powerStats === 'durability' &&
  playerChoice === heroLeft && heroLeft.powerstats.durability > heroRight.powerstats.durability ||
  playerChoice === heroRight && heroRight.powerstats.durability > heroLeft.powerstats.durability

  const isPowerWin = powerStats === 'power' &&
  playerChoice === heroLeft && heroLeft.powerstats.power > heroRight.powerstats.power ||
  playerChoice === heroRight && heroRight.powerstats.power  > heroLeft.powerstats.power 

  const isStrengthWin = powerStats === 'strength' &&
  playerChoice === heroLeft && heroLeft.powerstats.strength > heroRight.powerstats.strength ||
  playerChoice === heroRight && heroRight.powerstats.strength  > heroLeft.powerstats.strength

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)
      const [first, second] = getTwoHeros(response.data)
      setHeroLeft(first)
      setHeroRight(second)
      setPowerStats(getPowerStat())  
      scoreCheck()
      setTheRound()
    }
    getData()   
  
  },[hasPlayed])


  function handleClick(e) {
    if (e.currentTarget.innerText === heroLeft.name) {
      setPlayerChoice(heroLeft)  
    } else {
      setPlayerChoice(heroRight) 
    }
   
    setTimeout(() => {
      setHasPlayed(!hasPlayed)
    }, 1000)
    console.log('round', round)
  }

  function handleReset() {
    setHeroRight(heroes[Math.floor(Math.random() * 563)])
    setHeroLeft(heroes[Math.floor(Math.random() * 563)])
    setPowerStats(getPowerStat())
    setPlayerChoice('')
    setHasPlayed(false)
    setScore(0)
    setRound(1)

    setGameOver(false) 
  }
 
 

  function scoreCheck() {
    setRound(round + 1)
    if (isIntelligenceWin){
      return setScore(score + 1)
    } else if (isPowerWin) {
      return setScore(score + 1)
    } else if (isSpeedWin) {   
      return setScore(score + 1)
    } else if (isStrengthWin) {
      return setScore(score + 1)
    } else if (isDurabilityWin){
      return setScore(score + 1)
    } else if (isCombatWin) {
      return setScore(score + 1)
    }
  }

  function setTheRound(){
    setRound(round + 1)
    if (round === 10){
      setGameOver(true)
    }
  }



    
  return (
    <section className="hero is-fullheight">
      <div className="container is-fluid text-centered"> 

        <div className="columns">

          <div onClick={handleClick} className="column is-one-third">
            { !gameOver && heroLeft &&
            <HeroCardLeft 
              key={heroLeft.id}
              heroLeft = {heroLeft}
            />
            }
          </div>  
          <div className="middle-div column is-one-third">
            {(round <= 10) && <h3 className="text-is-centered">ROUND {round}/10</h3>}
            { !gameOver && powerStats === 'intelligence' && <p className="text-is-centered">Who is smarter?</p>}
            { !gameOver && powerStats === 'speed' && <p className="text-is-centered">Who is faster?</p>}
            { !gameOver && powerStats === 'combat' && <p className="text-is-centered">Who is better in a brawl?</p>}
            { !gameOver && powerStats === 'durability' && <p className="text-is-centered">Who can go the distance?</p>}
            { !gameOver && powerStats === 'power' && <p className="text-is-centered">Who is more powerful?</p>}
            { !gameOver && powerStats === 'strength' && <p className="text-is-centered">Who is stronger?</p>}

            {gameOver && 
          <>
            <p className="ending-text">The game is over, your score is {score}</p>
            <div className="reset-buttons">
              <button onClick={handleReset} className="button">Play again?</button>
              <Link to="/"><button className="button"> Back to Home </button></Link> 
            </div>
          </>}
          </div>
          <div onClick={handleClick} className="column is-one-third">
            { !gameOver && heroRight &&
            <HeroCardRight
              key={heroRight.id}
              heroRight = {heroRight}
            />
            }
          </div>  
        </div>
      </div>
    </section>     
  )
}

export default HeroGame

