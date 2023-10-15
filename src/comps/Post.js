
import React, { forwardRef, useState } from 'react'
import '../comps_styles/Post.css'
import { Avatar } from '@material-ui/core'
import { Article, BrowseGallery, Event, Image, ThumbUp, Chat, Loop, Send, MoreHoriz } from '@mui/icons-material'

import InputOption from './InputOption';
import { motion } from 'framer-motion';
import { db } from '../firebase/config';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const ReactionBtn = InputOption;

const Post = ({ post }) => {
    const [likes, setLikes] = useState(1);
    const [isLiked, setIsLiked] = useState(false);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!post) return;
        db.collection('likes').where('postId', '==', post.id ? post.id : 'a').onSnapshot(snap => {
            let count = 0;
            snap.forEach(value => count = count + 1);
            // console.log('likes :', snap.length, count, snap);

            setLikes(count);
        });
        db.collection('likes').where('postId', '==', post.id).where('userId', '==', user.uid).onSnapshot(snap => {
            let count = 0;
            snap.forEach(doc => {
                count = count + 1
                // console.log(doc);

            });
            // console.log('istrue :', snap, count);

            if (count >= 1) {
                setIsLiked(true);
            }
        })
    }, [post])


    const handleLikeReaction = async ({ postId, userId, userName }) => {


        if (isLiked === false) {
            setLikes(likes + 1);
            await db.collection('likes').add({
                userId,
                postId,
                userName
            });
            console.log('like added');
        } else {
            setLikes(likes - 1);
            await db.collection('likes').where('postId', '==', postId).where('userId', '==', userId).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                        .then(() => {
                            console.log('Document successfully deleted.');
                        })
                        .catch((error) => {
                            console.error('Error deleting document:', error);
                        });
                });
            });
            console.log('like removed');
        }

        setIsLiked(!isLiked);
    }

    return (
        <motion.div layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className='post'>
            <div className='post__reaction'></div>
            <div className='post__header'>
                <Avatar className='post__header__avatar' src={post ? post.userPhotoURL : ''} >{post ? post.username[0] : ""}</Avatar>
                <div className='post__header__details'>
                    <div className='post__ownername'>
                        <h2 className='ownername'> {post ? post.username : 'Username'} </h2>
                        <span>.</span>
                        <p>{(user && user.following) ? 'Following' : '3rd+'}</p>
                    </div>
                    <div className='owner__shortdescription'>
                        {post ? post.description : 'Student at NITB '}
                    </div>
                    <div className='post__timeline'>
                        {/* 4hr ago */}
                        {/* {post.createdAt}  */}
                    </div>
                </div>
                <div className='post__header__morebtn'>
                    <MoreHoriz className='btn' />
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.message }} className='post__text'>
                {/* {post && post.message} */}
            </div>
            <div className='post__img'>
                {/* 'https://media.licdn.com/dms/image/sync/D5627AQGeNY52t9r42w/articleshare-shrink_1280_800/0/1696078934207?e=1696744800&v=beta&t=FySiST47dzN-5kNs-TfjLtkssvRjiHXqd1owuRKFzgM' */}
                <img src={post && post.postImage} alt='' />
            </div>

            <div className='post__footer'>
                <div className='post__stats'>
                    <div className='stats__left'>
                        {/* icons */}
                        {likes} likes
                    </div>
                    <div className='stats__right'>
                        16 comments <span className='dot'>.</span> 14 reposts
                    </div>
                </div>
                <div className='post__reaction__btns'>
                    <ReactionBtn name='Like' Icon={ThumbUp} onClick={() => handleLikeReaction({ userId: user.uid, postId: post.id, userName: user.displayName })} color={isLiked ? '#2867b2' : 'gray'} />
                    <ReactionBtn name='Comment' Icon={Chat} color='gray' />
                    <ReactionBtn name='Repost' Icon={Loop} color='gray' />
                    <ReactionBtn name='Send' Icon={Send} color='gray' />
                </div>
            </div>
        </motion.div>
    )
}


export default Post
