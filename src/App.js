import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home';

function App() {
  return (
    // BEM
    <Router>
      <div className="App">
        <Header />
        
        <Switch>

          <Route path="/checkout">
            <Checkout />
          </Route>

          {/* Last One, Main / */}
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
