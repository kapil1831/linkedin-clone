import React from 'react'
import '../comps_styles/HeaderOption.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'


const HeaderOption = ({ avatar, Icon, title, onClick, btnDesc }) => {

  const user = useSelector(selectUser);
  return (
    <div className='headerOption' title={btnDesc ? btnDesc : ''}>
      {Icon && <Icon className='headerOption__icon' />}
      {avatar && < Avatar className='headerOption__icon' src={user?.photoURL} onClick={onClick} >{user?.email[0]} </Avatar>}
      <h3 className='headerOption__title'>{title}</h3>
    </div>
  )
}

export default HeaderOption
