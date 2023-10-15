import { Avatar } from '@mui/material'
import React from 'react'
import '../comps_styles/SideBar.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const SideBar = () => {
    const user = useSelector(selectUser);

    const recentItem = (topic) => {
        return <div className='sidebar__recentitem'>
            <span className='sidebar__hash'>#</span>
            <p>{topic}</p>
        </div>
    }

    return (
        <div className='sidebar'>
            <div className='sidebar__top'>
                <img src='https://static.licdn.com/aero-v1/sc/h/eb2snh0c2ji8vzcnh9lw1us0u' alt='' />
                <Avatar className='sidebar__avatar' src={user.photoURL}>{user.email[0]} </Avatar>
                <h2>{user.displayName}</h2>
                <h4>NITB|JS|React|Node|DSA</h4>

                <div className='sidebar__stats'>

                    <div className='sidebar__stat'>
                        <p>Profile views</p>
                        <p className='statNumber'>342</p>
                    </div>
                    <div className='sidebar__stat'>
                        <p>View all analytics</p>
                        <p className='statNumber'>123</p>
                    </div>
                </div>
            </div>
            <div className='sidebar__bottom'>
                <p>Recent</p>
                <div>
                    {recentItem('reactjs')}
                    {recentItem('javascript')}
                    {recentItem('softwareengineering')}
                    {recentItem('programming')}
                    {recentItem('machinelearning')}
                </div>
            </div>
        </div>
    )
}

export default SideBar
