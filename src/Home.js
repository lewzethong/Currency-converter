import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import ExchangeRates from './ExchangeRates';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  
  render () {

    return (
      <>
        <CurrencyConverter/>
        <ExchangeRates/>
      </>
    )
  }
}


export default Home;