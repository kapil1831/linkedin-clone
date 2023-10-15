import React from 'react'
import '../comps_styles/Button.css'

const Button = ({ name, icon, backgroundColor, onClick }) => {
    return (

        <div className='button' onClick={onClick} style={{ backgroundColor }}>{name}</div>

    )
}

export default Button;
