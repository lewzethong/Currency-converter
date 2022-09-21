import React from 'react';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency1: '',
      currency2: '',
      currency1Value: 0,
      currency2Value: 0,
    }
  }

  render () {
    const { value } = this.props
    return (
      <>
        {Object.keys(this.props).map((currency) => {
          return <option key={currency} value={currency}>{currency} - {this.props[currency]}</option>
        })}
      </>
    )
  }
}

export default CurrencyConverter;