import { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'




/*using useState for functions*/
const  CurrencyConvertor = () => {
  const currencies = ['BTN', 'ETH', 'USD','XRP', 'LTC', 'ADA' ]
  const [choosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
  const [choosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
  const [amount, setAmount] = useState(1)
  const [exchangeRate,setExchangeRate] = useState(0)
  const [result, setResult] = useState(0) 




/*Rapid api function*/ 
  const convert = () => {

        const options = {
  method: 'GET',
  url: 'https://alpha-vantage.p.rapidapi.com/query',
  params: {to_currency: choosenSecondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', from_currency: choosenPrimaryCurrency},
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
  }
}

axios.request(options).then((response) => {
	console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
  setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
  setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
}).catch((error) => {
	console.error(error);
});
  }




  /* formal HTML code*/

  return (
    
    <div className="currency-convertor">
        <h2>CurrencyConvertor </h2>

        <div className="input-box">
          <table>
        <tbody>
          <tr>
            <td>Prmary Currency:</td>
            <td><input type="number" name="currency-amount-1" value={amount} onChange={(e) => setAmount(e.target.value)} /></td>
            <td>
              <select
               value={choosenPrimaryCurrency} 
               name="currency-option-1"
               className="currency-options"
                onChange= {(e) => setChosenPrimaryCurrency(e.target.value)}>
                {currencies.map((currency , _index) => (<option key ={_index} > {currency}</option>))}
              </select>
            </td>
          </tr>
          <tr>
            <td>secondary Currency:</td>
            <td><input  value={result} disabled={true} /></td>
            <td>
              <select value={choosenSecondaryCurrency}
               name="currency-option-2"
                className="currency-options" 
                onChange={(e) => setChosenSecondaryCurrency(e.target.value)}>
                {currencies.map((currency , _index) => (<option key ={_index} > {currency}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button id="covert-button" onClick={convert}>Convert</button>
        </div>
      
        <ExchangeRate
            exchangeRate = {exchangeRate}
            choosenPrimaryCurrency = {choosenPrimaryCurrency}
            choosenSecondaryCurrency = {choosenSecondaryCurrency}
         />
    </div>
  )
}

export default CurrencyConvertor