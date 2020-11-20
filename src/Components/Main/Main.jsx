import React, { useEffect } from 'react'
import { AddToFavouriteButton } from './AddToFavouriteButton/AddToFavouriteButton'
import { WeatherForecast } from './WeatherForecast/WeatherForecast'
import { useSelector, useDispatch } from 'react-redux'
import { Route, useLocation } from 'react-router-dom'
import { setDateThunk } from '../../Redux/Reducer'
import GoogleApiWrapper from '../Main/Map/Map'
import s from './Main.module.css'

export const Main = () => {
  let location = useLocation()
  const coord = useSelector((state) => state.weather.location)

  const dispatch = useDispatch()

  useEffect(() => {
    let data = { location, coord }
    dispatch(setDateThunk(data))
  }, [location, coord, dispatch])
  const dailyArray = []
  const tommorowArray = []
  const daylyInfo = useSelector((state) => state.weather.weather.daily)
  dailyArray.push(daylyInfo)
  const weeklyInfo = useSelector((state) => state.weather.weather.weekly)
  const tomorrowInfo = weeklyInfo.length ? weeklyInfo[1] : null
  const cityArray = useSelector((state) => state.weather.favouriteCities)
  const routerCityArray = cityArray.map((i) => `/${i}`)
  const coordinate = useSelector((state) => state.weather.location)
  const mapDataDaily = [{ ...dailyArray[0], coord: coordinate }]

  tommorowArray.push(tomorrowInfo)
  const mapDataTomrrow = [{ ...tommorowArray[0], coord: coordinate }]

  return (
    <div className={s.main}>
      <Route exact path="/">
        <GoogleApiWrapper data={mapDataDaily} />
      </Route>
      <Route path="/tomorrow">
        <GoogleApiWrapper data={mapDataTomrrow} />
      </Route>
      <Route path="/week">
        <WeatherForecast data={weeklyInfo} />
      </Route>
      <Route path={routerCityArray}>
        <WeatherForecast data={dailyArray} />
      </Route>

      <AddToFavouriteButton data={daylyInfo.name} />
    </div>
  )
}
