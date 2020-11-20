import React from 'react'
import Autocomplete from 'react-google-autocomplete'
import { setByNameThunk } from '../../../Redux/Reducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import s from './CitySearch.module.css'

export const CitySearch = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  function handleClick() {
    history.push('/')
  }
  return (
    <div className={s.input}>
      <Autocomplete
        style={{ width: '90%', border: '1px solid grey' }}
        onPlaceSelected={(place) => {
          handleClick()
          dispatch(setByNameThunk(place.formatted_address))
        }}
        types={['(cities)']}
      />
    </div>
  )
}
