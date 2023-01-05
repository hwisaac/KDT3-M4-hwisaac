import React from 'react'
import { Link } from 'react-router-dom'
import style from './UserMenu.module.css' 

const UserMenu = ({text, link}) => {
  return (
    <Link to={link} className={style.util_list}>
      {text}
    </Link>
  )
}

export default UserMenu
