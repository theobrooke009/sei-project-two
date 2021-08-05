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






function HeroGame() {
  const [heroes, setHeroes] = React.useState(null)
  const [heroRight, setHeroRight] = React.useState(null)
  const [heroLeft, setHeroLeft] = React.useState(null)
  const [playerChoice, setPlayerChoice] = React.useState('')
  const [powerStatsLeft, setPowerStatsLeft] = React.useState('')
  const [powerStatsRight, setPowerStatsRight] = React.useState('')



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
  
    
    compareInt()
  }

  
  console.log('the player choice is', playerChoice)
  console.log('left', powerStatsLeft.intelligence, 'right' ,powerStatsRight.intelligence)

  // if the stat on the playerChoice is greater than the stat on the other card the player wins
    
  let score = 0

  function compareInt() {
   
    if (playerChoice === heroLeft){
      if (powerStatsLeft.intelligence > powerStatsRight.intelligence){
        console.log('you win')
        score = score += 1
        console.log(score)
        
      } 
    } else if (playerChoice === heroRight){
      if (powerStatsRight.intelligence > powerStatsLeft.intelligence){
        console.log('you win')
        score = score += 1
        console.log(score)
      }
    }
  }

 



  

  // function compareInt() {
  //   const powerStatArray = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength' ]
  //   console.log('the chosen stats', powerStatArray[1])
  //   console.log('other stat', )
  // }




  return (
    <section>
      <div className="container"> 
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

