import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Layout from './Layout'
import Home from './Home';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';


import './App.css';


const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/currencyconverter" component={CurrencyConverter}/>
          <Route path="/exchangerates" component={ExchangeRates}/>
          <Route render={()=> <h1>404 Not Found</h1>} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
