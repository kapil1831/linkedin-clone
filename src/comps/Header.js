import React from 'react'
import '../comps_styles/Header.css'
import HeaderOption from './HeaderOption'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { SupervisorAccount, BusinessCenter, Chat, Notifications } from '@mui/icons-material';
import { auth } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

const Header = () => {

    const dispatch = useDispatch();

    const logoutApp = () => {
        dispatch(logout())
        auth.signOut();
    }
    return (
        <div className='header'>
            <div className='header__left'>
                <img src="./logo-sq.png" alt="" />
                <div className='header__search'>
                    <SearchIcon />
                    <input type='text' placeholder='Search' />
                </div>
            </div>
            <div className='header__right'>
                <HeaderOption Icon={HomeIcon} title='Home' />
                <HeaderOption Icon={SupervisorAccount} title='My Network' />
                <HeaderOption Icon={BusinessCenter} title='Jobs' />
                <HeaderOption Icon={Chat} title='Messaging' />
                <HeaderOption Icon={Notifications} title='Notifications' />
                <HeaderOption avatar={true} title='Me' onClick={logoutApp} btnDesc={'logout'} />
            </div>
        </div>
    )
}

export default Header
