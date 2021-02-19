import { useState } from 'react'
import axios from 'axios'

import './App.css'
import logo from './images/swift-logo.png'

function App() {
  const [limit, setLimit] = useState(10)
  const [datePreset, setDatePreset] = useState('today')
  const [loading, setLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState(null)

  const handleDatePreset = e => {
    setDatePreset(e.target.value)
  }

  const handleLimit = e => {
    setLimit(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)
    setApiMessage(null)

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/ads?date_preset=${datePreset}&limit=${limit}`
      )
      const { success, error } = await response.data

      setLoading(false)

      const message = success
        ? 'Spreadsheet successfully generated!'
        : 'An error has occurred. Please try again!'

      setApiMessage(message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='app'>
      <header>
        <img src={logo} alt='Swift Disability Services' className='logo' />
      </header>

      <div className='container'>
        <h2 className='description'>To generate the spreadsheet select the options below:</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor='date_preset'>Date Preset</label>
          <select name='date_preset' id='date_preset' onChange={handleDatePreset}>
            <option value='today'>today</option>
            <option value='yesterday'>yesterday</option>
            <option value='this_month'>this_month</option>
            <option value='last_month'>last_month</option>
            <option value='this_quarter'>this_quarter</option>
            <option value='lifetime'>lifetime</option>
            <option value='last_3d'>last_3d</option>
            <option value='last_7d'>last_7d</option>
            <option value='last_14d'>last_14d</option>
            <option value='last_28d'>last_28d</option>
            <option value='last_30d'>last_30d</option>
            <option value='last_90d'>last_90d</option>
            <option value='last_week_mon_sun'>last_week_mon_sun</option>
            <option value='last_week_sun_sat'>last_week_sun_sat</option>
            <option value='last_quarter'>last_quarter</option>
            <option value='last_year'>last_year</option>
            <option value='this_week_mon_today'>this_week_mon_today</option>
            <option value='this_week_sun_today'>this_week_sun_today</option>
            <option value='this_year'>this_year</option>
          </select>

          <label htmlFor='limit'>Limit</label>
          <select onChange={handleLimit} name='limit' id='limit'>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
            <option value='150'>150</option>
            <option value='200'>200</option>
            <option value='250'>250</option>
            <option value='300'>300</option>
            <option value='350'>350</option>
            <option value='400'>400</option>
            <option value='450'>450</option>
            <option value='500'>500</option>
            <option value='1000'>1000</option>
          </select>

          <button type='submit' disabled={loading ? true : null}>
            Generate Spreadsheet
          </button>

          {loading && <div className='loader'></div>}

          {apiMessage && <div className='api-message'>{apiMessage}</div>}
        </form>
      </div>
    </div>
  )
}

export default App
