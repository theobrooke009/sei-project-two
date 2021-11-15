import { useHistory } from 'react-router'
import React from 'react'
import { getAllHeros } from '../../lib/api'

// function getRandom(heroes) {
//   const randomNumber = Math.floor(Math.random() * 563)
//   return randomNumber
// }


function Home(){

  const history = useHistory()
  const [heroes, setHeroes] = React.useState(null)
  const [rand, setRand] = React.useState(0)


  function getGridRefs() {
    function gridRefs() {
      const randomNumber = Math.floor(Math.random() * 563)
      return randomNumber
    }
    return gridRefs() 
  }

  React.useEffect(() => {
    window.setInterval(() => {
      setRand(getGridRefs())
      console.log('here', getGridRefs())
    },7000)
  },[])
  

  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllHeros()
      setHeroes(response.data)    
    }
    getData()

  },[])
  // console.log('hi there',number)

  function handleClick(){
    history.push('/game')
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body ">
        <div className="columns">
          <div className="container column intro-screen is-half-desktop">
            <h1> Choose your fighter </h1>
            <h3>Put your nerd knowledge to the test!</h3>
            <p>On the next screen you will see two heroes and an ability</p>
            <p>Choose the hero you think is better..</p> 
            <button onClick={handleClick} className="button is-medium is-fullwidth">Play</button>
          </div>
          <div className="container heroes-grid column is-half-desktop">
            { heroes &&
            <>             
              <img className="grid-images" src={heroes[rand].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>
              <img className="grid-images" src={heroes[getGridRefs()].images.md}/>  
            </>
            }
          </div>
        </div>
      </div>
    </section>
  ) 
}

export default Home

