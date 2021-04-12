import './App.css';
import Login from './components/Login/Login'
import Kite from './components/Kite/Kite'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/login'>
              <Login/>
            </Route>
            <Route exact path='/kite'>
              <Kite/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
