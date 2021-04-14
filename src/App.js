import './App.css';
import Login from './components/Login/Login'
import Kite from './components/Kite/Kite'
import Register from './components/Register/Register'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Redirect to={{pathname: "/register"}}/>
            </Route>
            <Route exact path='/register'>
              <Register/>
            </Route>
            <Route exact path='/login'>
              <Login/>
            </Route>
            <Route path="/kite" render={(props) => <Kite {...props}/>}/>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
