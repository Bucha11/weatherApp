import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './ChangeDateNav.module.css'
export const ChangeDateNav = () => {
  return (
    <div className={s.nav}>
      <NavLink exact to="/" activeClassName={s.active}>
        Today
      </NavLink>
      <NavLink to="/tomorrow" activeClassName={s.active}>
        Tomorrow
      </NavLink>
      <NavLink exact to="/week" activeClassName={s.active}>
        Week
      </NavLink>
    </div>
  )
}
