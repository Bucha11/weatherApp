import './App.css'
import React, { useEffect } from 'react'
import { Header } from './Components/Header/Header'
import { CityList } from './Components/CityList/CityList'
import { Main } from './Components/Main/Main'

import { useDispatch } from 'react-redux'
import { setForecastThunk } from './Redux/Reducer'

function App() {
  const dispatch = useDispatch()
  const getCoord = (lat, lon) => {
    let coord = { lat, lon }

    dispatch(setForecastThunk(coord))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getCoord(position.coords.latitude, position.coords.longitude)
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <Main />
      <CityList />
    </div>
  )
}

export default App
