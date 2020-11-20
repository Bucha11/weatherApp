import React from 'react'
import { ChangeDateNav } from './ChangeDateNav/ChangeDateNav'
import { CitySearch } from './CitySearch/CitySearch'
import s from './Header.module.css'
export const Header = () => {
  return (
    <div className={s.header}>
      <ChangeDateNav />
      <CitySearch />
    </div>
  )
}
