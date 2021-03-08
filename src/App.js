import { useState } from 'react'
import axios from 'axios'

import './App.css'
import logo from './images/swift-logo.png'

function App() {
  const [loading, setLoading] = useState(false)
  const [apiMessage, setApiMessage] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()

    setLoading(true)
    setApiMessage(null)

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/ads`)
      const { success, error } = await response.data

      setLoading(false)

      const message = success
        ? 'Spreadsheet successfully generated!'
        : 'An error has occurred. Please try again!'

      setApiMessage(message)

      if (error) console.log(error)
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
        <h2 className='description'>To generate the spreadsheet click the button below:</h2>

        <form onSubmit={handleSubmit}>
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
