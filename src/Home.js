import React from 'react';
import { checkStatus , json } from './utils';
import getSymbolFromCurrency from 'currency-symbol-map';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: {},
      conversionRates: {},
      conversionData: {},
      baseCurrency : 'USD',
      baseValue : 1.00,
      targetCurrency : 'EUR',
      targetValue: 0,
      exchangeRateCurrency: 'USD',
      error: '',
    }

    this.handleExchangeRateChange = this.handleExchangeRateChange.bind(this);
    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
    this.handleTargetCurrencyChange = this.handleTargetCurrencyChange.bind(this);
    this.handleBaseValueChange = this.handleBaseValueChange.bind(this);
    this.handleTargetValueChange = this.handleTargetValueChange.bind(this);
  }

  componentDidMount () {
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
        this.setState({currencyList: data})
      })
    .catch((error) => {
      this.setState({ error: error.message });
    })

    fetch('https://api.frankfurter.app/latest?from=USD')
    .then(checkStatus)
    .then(json)
    .then((data) => {
        this.setState({ conversionRates: data.rates , targetValue: data.rates[this.state.targetCurrency].toFixed(2)})
      })
    .catch((error) => {
      this.setState({ error: error.message });
    })
  }

  currencyConversion = (baseValue, baseCurrency,  targetCurrency, affectedState ) => {
    return (fetch(`https://api.frankfurter.app/latest?amount=${baseValue}&from=${baseCurrency}&to=${targetCurrency}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log([affectedState], data.rates[targetCurrency])
      this.setState({
        [affectedState]: data.rates[targetCurrency].toFixed(2)
      })
    })
    .catch((error) => {
      this.setState({ error: error.message });
    }))
  }

  handleBaseCurrencyChange(event) {
    this.setState({
      baseCurrency: event.target.value
    })
    this.currencyConversion(this.state.baseValue, event.target.value, this.state.targetCurrency, 'targetValue')
  }

  handleTargetCurrencyChange(event) {
    this.setState({
      targetCurrency: event.target.value
    })
    this.currencyConversion(this.state.baseValue, this.state.baseCurrency, event.target.value, 'targetValue')
  }

  handleBaseValueChange(event) {
    this.setState({
      baseValue: event.target.value,
    })
    this.currencyConversion(event.target.value, this.state.baseCurrency, this.state.targetCurrency, 'targetValue');
  }

  handleTargetValueChange(event) {
    this.setState({
      targetValue: event.target.value,
    })
    this.currencyConversion(event.target.value, this.state.targetCurrency, this.state.baseCurrency, 'baseValue');
  }

  handleExchangeRateChange (event) {
    this.setState({exchangeRateCurrency: event.target.value});
    fetch(`https://api.frankfurter.app/latest?from=${event.target.value}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
        this.setState({ conversionRates: data.rates})
      })
    .catch((error) => {
      this.setState({ error: error.message });
    })
  }

  render () {

    const { baseCurrency , targetCurrency, currencyList, baseValue, targetValue, conversionRates, exchangeRateCurrency } = this.state

    return (
      <>
        <div className='container currency-converter text-center mt-5 mb-5 p-3 bg-light'>
          <h2 className='mb-3'>Currency Converter</h2>
          <h4 className='mb-3 mt-3'>{baseCurrency} to {targetCurrency}</h4>
          <div className='form-container mb-3 mt-3'>
            <div className='row'>
              <div className='col-5 ps-5 pe-5'>
                <select className='p-2 mb-2 text-center currency-group' value={baseCurrency} onChange={this.handleBaseCurrencyChange}>
                  {Object.keys(currencyList).map((currency) => {
                    return <option key={currency} value={currency}>{currency} - {currencyList[currency]}</option>
                  })}
                </select>
                <div className='input-group'>
                  <div>
                    <div className='input-group-text'>{getSymbolFromCurrency(baseCurrency)}</div>
                  </div>
                  <input className='form-control text-center' type="number" value={baseValue} onChange={this.handleBaseValueChange}></input>
                </div>
              </div>
              <div className='col-2'>
                <h1> = </h1>
              </div>
              <div className='col-5'>
                <select className='p-2 mb-2 currency-group text-center' value={targetCurrency} onChange={this.handleTargetCurrencyChange}>
                  {Object.keys(currencyList).map((currency) => {
                    return <option key={currency} value={currency}>{currency} - {currencyList[currency]}</option>
                  })}
                </select>
                <div className='input-group'>
                  <div>
                    <div className='input-group-text'>{getSymbolFromCurrency(targetCurrency)}</div>
                  </div>
                  <input className='form-control text-center' type="number" value={targetValue} onChange={this.handleTargetValueChange}></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container exchange-rate text-center bg-light p-3 mb-5'>
          <h2>Exchange Rate</h2>
          <h4>Base currency: 1</h4>
          <select className='p-2 mb-3 mt-3' value={exchangeRateCurrency} onChange={this.handleExchangeRateChange}>
            {Object.keys(currencyList).map((currency) => {
              return <option key={currency} value={currency}>{currency} - {currencyList[currency]}</option>
            })}
          </select>
          <div className='exchange-rate-table p-3 align-items-left border'>
            <div className='row'>
              {Object.keys(conversionRates).map((rate) => {
                return <div key={rate} className='col-6 currency-row'>
                  <div className='row border-bottom'>
                    <div className='col-6 ps-5 pt-1 pb-1'>
                      {rate}
                    </div>
                    <div className='col-4 ps-5 pt-1 pb-1'>
                     {conversionRates[rate].toFixed(2)}
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </>
    )
  }
}


export default Home;