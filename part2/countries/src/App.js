import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState({})
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect run, country is now', country)

    if (country) {
      console.log('fetching country data...')
      console.log(value)
      axios
        .get(`https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flag`)
        .then(response => {
          setCountryData(response.data.countryData)
        })
        console.log(countryData)
      }
  }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountry(value)
  }

  return (
    <div>
        find countries <input value={value} onChange={handleChange} />
      <pre>
        {JSON.stringify(countryData, null, 2)}
      </pre>
    </div>
  )
}

export default App