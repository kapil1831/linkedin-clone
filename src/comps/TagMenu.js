import { Check, Search } from '@mui/icons-material'
import React, { useState } from 'react'
import '../comps_styles/TagMenu.css'

const TagMenu = ({ tags, handleTagOnClick, handleOutsideMenuClick }) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div id='tagsmenu' className='tag-menu-wrapper' onClick={(e) => {
            // if ((e.target.classList.contains('tag-menu-wrapper'))) {
            //     handleOutsideMenuClick();
            // }
        }}>
            <div className='search-box'>
                <label htmlFor='tag-search-input'><Search className='search-icon' /></label>
                <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} id='tag-search-input' placeholder='Filter topics' />
            </div>
            {
                tags.filter((tag) => tag.name.includes(inputValue)).map((tag, index) => {
                    return (<div key={index} className='tag' onClick={() =>
                        handleTagOnClick(tag.name)
                    } style={{ color: tag.isSelected ? 'white' : 'inherit' }} > {tag.name} <Check style={{ opacity: tag.isSelected ? 1 : 0 }} /> </div>)
                })
            }
        </div>
    )
}

export default TagMenu
