import { Info, FiberManualRecord } from '@mui/icons-material';
import React from 'react'
import '../comps_styles/Widgets.css'


const Widgets = () => {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets__article'>
            <div className='widgets__articleLeft'>
                <FiberManualRecord />
            </div>

            <div className='widgets__articleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    );

    return (
        <div className='widgets'>
            <div className='widgets__header'>
                <h2>LinkedIn News</h2>
                <Info />
            </div>
            {newsArticle('Im done', 'this is all i got')}
            {newsArticle('Is redux good?', 'all you need to know about redux')}
            {newsArticle('How React makes it easy?', 'React is super cool why? bcz it can.')}
            {newsArticle('Neeraj Chopra bags Gold at Asian Games', 'Star javeline thrower again on podium with tricolor')}
        </div>
    )
}

export default Widgets;
