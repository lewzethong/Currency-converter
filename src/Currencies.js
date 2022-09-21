import React from 'react';
import { checkStatus , json } from './utils'

class CurrencyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount () {
    fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => {
        this.setState({data})
      })
    .catch((error) => {
      this.setState({ error: error.message });
    })
  }

  render () {
    {console.log('render', this.state.data)}
    return (
    <>
      {Object.keys(this.state.data).map((currency) => {
        return <option key={currency} value={currency}>{currency} - {this.state.data[currency]}</option>
      })}
    </>
    )
  }
  
}

export default CurrencyList;
