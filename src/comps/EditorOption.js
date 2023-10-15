import React from 'react'
import '../comps_styles/EditorOption.css'

const EditorOption = ({ type, Icon, onClick }) => {
    return (
        <div className='option' title={type} onClick={onClick}>
            {Icon && <Icon className='option-icon' />}
        </div>
    )
}

export default EditorOption
