import React, { useState } from 'react'
import '../comps_styles/LinkInput.css'

const LinkInput = ({ onSubmit }) => {
    const [input, setInput] = useState('');
    return (
        <div className='link-input'>
            <input type='text' placeholder='Enter Link' value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={(e) => onSubmit(e, input)}>Ok</button>
        </div>
    )
}

export default LinkInput
