import { auth } from './firebase'; //const of firebase.js file, not the module
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Payment from './Payment';
import { useStateValue } from './StateProvider';


function App() {

  const [{}, dispatch] = useStateValue();

  //Listener -> will only run once when the app component loads
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS ->', authUser);
      
      if (authUser) {
        // the user just logged in or was logged
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  }, [])

  return (
    // BEM
    <Router>
      <div className="App">
        
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/payment">
            <Header />
            <Payment />
          </Route>

          {/* Last One, Main / */}
          <Route path="/">
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
