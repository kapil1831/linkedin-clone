import React from 'react'
import '../comps_styles/InputOption.css'

const InputOption = ({ name, Icon, color, onClick }) => {
    return <div className='input__option' onClick={onClick}>
        <Icon className='input__option__icon' style={{ color: color }} />
        <p>{name} </p>
    </div>
}

export default InputOption
