import React from 'react'
import '../comps_styles/ImageWrapper.css'
import { Close } from '@mui/icons-material'

const ImageWrapper = ({ postImage, clearImage }) => {
    return (
        <div className='image-wrapper'>
            <Close className='remove-image' titleAccess='remove image' onClick={() => clearImage()} />
            {postImage && <img src={postImage} alt='' />}
            <span className='preview-text'>Preview</span>
        </div>
    )
}

export default ImageWrapper
