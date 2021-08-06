import { useHistory } from 'react-router'

function Home(){

  const history = useHistory()

  function handleClick(){
    history.push('/game')
  }

  return (
    <section className="section">
      <div className="container">
        <h1> Choose your fighter </h1>
        <h3>Put your nerd knowledge to the test!</h3>
        <p>On the next screen you will see two heroes and an ability</p>
        <p>Choose the hero you think is better..</p> 
        <button onClick={handleClick} className="button">Play</button>
      </div>
    </section> 

  ) 

}

export default Home