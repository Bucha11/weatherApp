import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setByNameThunk } from '../../Redux/Reducer'
import s from './CityList.module.css'
export const CityList = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  function handleClick(tar) {
    history.push(`/${tar}`)
    dispatch(setByNameThunk(tar))
  }
  const cityList = useSelector((state) => state.weather.favouriteCities)
  const renderList = cityList.map((i, index) => {
    return (
      <div
        className={s.cityItem}
        key={index}
        onClick={() => {
          handleClick(i)
        }}
      >
        {i}
      </div>
    )
  })
  return (
    <div>
      <h3>Saved cities</h3>
      <div className={s.cityList}>{renderList}</div>
    </div>
  )
}
