import React from 'react'
import { useDispatch } from 'react-redux'
import { addCityToFavouriteThunk } from '../../../Redux/Reducer'
import s from "./AddToFavouriteButton.module.css"
export const AddToFavouriteButton = (props) => {
  const dispatch = useDispatch()
  const city = props.data.split(' ')

  return (

    <div className={s.buttonContainer} >

      <button onClick={() => { dispatch(addCityToFavouriteThunk(city[0])) }}>+</button>
    </div>
  );
}