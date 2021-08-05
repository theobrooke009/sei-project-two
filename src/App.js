import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'

import Home from './components/common/Home'
import HeroGame from './components/heros/HeroGame'
import Results from './components/heros/Results'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <HeroGame />
        </Route>
        <Route path="/result">
          <Results />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
