// CurrencyConverter.js
import React from 'react';
import currencies from './utils/currencies.js';
import { checkStatus, json } from './utils/fetchUtils';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search)

    this.state = {
      rate: 0,
      baseCurrency: params.get('base') || 'USD',
      baseValue: 1,
      quoteCurrency: params.get('quote') || 'JPY',
      quoteValue: 0,
      loading: false,
    };

  }

  componentDidMount () {
    const { baseCurrency, quoteCurrency } = this.state;
    this.getRate(baseCurrency, quoteCurrency);
  }

  getRate = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://api.frankfurter.app/latest?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const rate = data.rates[quote];
        this.setState({
          rate,
          quoteValue: Number((this.state.baseValue * rate).toFixed(3)),
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toQuote(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }

  changebaseCurrency = (event) => {
    const baseCurrency = event.target.value;
    this.setState({ baseCurrency });
    this.getRate(baseCurrency, this.state.quoteCurrency);
  }

  changeBaseValue = (event) => {
    const quoteValue = this.convert(event.target.value, this.state.rate, this.toQuote);
    this.setState({
      baseValue: event.target.value,
      quoteValue,
    });
  }

  changequoteCurrency = (event) => {
    const quoteCurrency = event.target.value;
    this.setState({ quoteCurrency: event.target.value });
    this.getRate(this.state.baseCurrency, quoteCurrency);
  }

  changeQuoteValue = (event) => {
    const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
    this.setState({
      quoteValue: event.target.value,
      baseValue,
    });
  }

  render() {
    const { rate, baseCurrency, baseValue, quoteCurrency, quoteValue, loading } = this.state;

    const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym} - {currencies[currencyAcronym].name}</option>);

    return (
      <>
        <div className='container currency-converter text-center mt-5 mb-5 p-3 bg-light'>
          <h2 className='mb-3'>Currency Converter</h2>
          <h4 className='mb-3 mt-3'>{baseCurrency} to {quoteCurrency}</h4>
          <div className='form-container mb-3 mt-3'>
            <div className='row'>
              <div className='col-5 ps-5 pe-5'>
                <select className='p-2 mb-2 text-center currency-group' value={baseCurrency} onChange={this.changebaseCurrency}>
                  {currencyOptions}
                </select>
                <div className='input-group'>
                  <div>
                    <div className='input-group-text'>{currencies[baseCurrency].symbol}</div>
                  </div>
                  <input className='form-control text-center' type="number" value={baseValue} onChange={this.changeBaseValue}></input>
                </div>
              </div>
              <div className='col-2'>
                <h1> = </h1>
              </div>
              <div className='col-5'>
                <select className='p-2 mb-2 currency-group text-center' value={quoteCurrency} onChange={this.changequoteCurrency}>
                  {currencyOptions}
                </select>
                <div className='input-group'>
                  <div>
                    <div className='input-group-text'>{currencies[quoteCurrency].symbol}</div>
                  </div>
                  <input className='form-control text-center' type="number" value={quoteValue} onChange={this.changeQuoteValue}></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CurrencyConverter;