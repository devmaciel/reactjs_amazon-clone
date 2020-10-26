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

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51HgWrXLvRTUiXjK0tjmqalXtckUlbcfFjcVW6ey7iI6tSebXoIE0VCGyF8p9BQdLGE8Qg8trmy7wLD0qZqLoW7KJ00Sd7lQZpb');


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
            <Elements stripe={promise}>
              <Payment />
            </Elements>
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
