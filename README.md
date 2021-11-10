# SEI Project 2 - Superhero Card Game

![]()

## Overview

This was my second project for the General Assembly Software Engineering course, undertaken 2 weeks into learning React.

This was a pair coded with another GA classmate, Holly Stratton over a 48 hour period.

## Goal and Timeframe

The goal was to pair-code a functioning React app of our own choice and design which consumes any public API, within 48 hours.

## Technologies Used

- React.js
- JavaScript
- HTML5
- Axios
- Insomnia REST Client
- react-router-dom
- Bulma CSS Framework

## Planning

After some brief, productive discussions, we settled on a superhero API which has 500+ characters from comics/films/games etc and assigns score values to different attributes commonly associated with superheroes (speed strength etc). From this we decided we could build a Magic the Gathering style card game, based on the user being presented with 2 random heroes and a comparative stat, and being asked which hero has the higher stat.

## Development/Game Flow

## Selecting random heroes & stats

With our api call set up, the first thing we needed to do was to pull two random entries out of the api. We first tried to do this by generating a random number and then matching that to the api entry id, however the first challenge we faced is that not every entry in the api has a valid id. Therefore we used the below to generate 2 random numbers (firstIndex & secondIndex) and then assign that as an array index to the heroes api:

```javascript
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
```


From here it was a case of calling this function after making an api call, and then setting those two random entries into state (setHeroLeft & setHeroRight):

```javascript
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

````

These are then passed as props to separate components, to display 2 cards on the screen.

Selecting a random stat to compare was a lot easier, consisting of just an array of values and a random number generator:

```javascript
function getPowerStat() {
  const powerStatArray = ['combat', 'durability', 'intelligence', 'power', 'speed', 'strength']
  const chosenStat = powerStatArray[Math.floor(Math.random() * 6)]
  return chosenStat
}
```

## Player Interactions & Scores

When a player clicks on either of the cards, we check to see if the player has chosen the card with the higher score. To do this, we set out a different win condition for each of the stats.

```javascript
  const isIntelligenceWin = powerStats === 'intelligence' &&
  playerChoice === heroLeft && heroLeft.powerstats.intelligence > heroRight.powerstats.intelligence ||
  playerChoice === heroRight && heroRight.powerstats.intelligence > heroLeft.powerstats.intelligence
```

This is then handled in the below function, which checks if each win condition is true, sets the player score if it is, and sets the round:

```javascript
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
```

Once the score reaches 20, the game ends and we move to the results screen, which gives you a score out of 20 and the option to play again:
 ```javascript
         {gameOver && 
          <>
            <p>The game is over, your score is {score}</p>
            <button onClick={handleReset} className="button">Play again?</button>
            <Link to="/"><button className="button"> Back to Home </button></Link> 
          </>}
 ```

## App Flow

![](https://github.com/theobrooke009/sei-project-two/blob/main/readme-images/readme-img-1.png)

![](https://github.com/theobrooke009/sei-project-two/blob/main/readme-images/readme-img-2.png)

![](https://github.com/theobrooke009/sei-project-two/blob/main/readme-images/readme-image-3.png)

![](https://github.com/theobrooke009/sei-project-two/blob/main/readme-images/readme-img-4.png)

## Challenges

Understanding the asynchronous nature of React was definitely the biggest challenge here, along with the idea of writing a program which references an external source.

State was a concept that also took a while to get my head around - making sure that state is synced up with what the player is seeing took a long time to work out.

## Wins

This was also the first time on the course that I’d worked with another person, but I think we worked together well and it was apparent on a few occasions that we had both internalised different aspects of the course and this definitely helped when it came to not just debugging and problem solving, but my own understanding of React.

The second significant win was planning out and pulling together game logic in a short period of time. I really enjoy having to take into account all of the different scenarios that game logic throws up as it means that you have to understand everything that is going on in your program.

This was also the first time that I realised the power of refactoring as a way to make your code better organised and more intuitive to read.


## Known Bugs
- Initially, when generating 2 cards sometimes they would be blank as they didn’t have an index value. This however was fixed prior to deployment.

## Future Improvements

As this was built in 48 hours in a technology I was at the time, unfamiliar with, a lot of the code is overlong and could still use some more refactoring. In particular the win states are written out for each individual comparative stat, whereas I feel that they should be referencing the random stat generated by the getPowerStat function; however any attempt to do this in the time we had available broke the game.

With this refactored, we could also then go on to apply similar improvements to the scoreCheck function.

## Key Learnings

This project really gave me a good grounding in the key principles of React and how and when to use them, as well as how to create a program which consumes an external resource. This allowed me to see future projects as part of the wider online ecosystem and not just as something which exists solely on my hard drive.

I also got my first experience of trying to create something functional at short notice and on a tight 2 day deadline. 





