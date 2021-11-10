import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './components/common/Home'
import HeroGame from './components/heros/HeroGame'
import Results from './components/heros/Results'
import HeroIndex from './components/heros/HeroIndex'
import Navbar from './components/common/Navbar'

function App() {
  return (
    <BrowserRouter>  
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
        </Route>
        <Route path="/game">
          <HeroGame />
        </Route>
        <Route path="/index">
          <Navbar />
          <HeroIndex />
        </Route>
        <Route path="/result">
          <Navbar />
          <Results />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
