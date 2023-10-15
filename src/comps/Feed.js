import React, { useEffect, useState } from 'react'
import '../comps_styles/Feed.css'
import { Avatar } from '@material-ui/core'
import Post from './Post'
import { Article, Event, Image } from '@mui/icons-material'

import InputOption from './InputOption';
import { db, storage, timestamp } from '../firebase/config';
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

import { motion } from 'framer-motion'

import MoonLoader from 'react-spinners/MoonLoader'
import Editor from './Editor'






const Feed = () => {
    const [isPostLoading, setIsPostLoading] = useState(true);
    const user = useSelector(selectUser);

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState('');

    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const calcTime = (createdAt) => {
        const diffrence = (Date.now() / 1000 - createdAt.seconds); //in seconds
        console.log(diffrence);
        return Math.floor(diffrence / 3600) > 0 ? Math.floor(diffrence / 3600) : Math.floor(diffrence / 60);
    }

    useEffect(() => {
        const unsub = db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snap => {
            const docs = [];
            snap.forEach(doc => {
                docs.push({
                    id: doc.id,
                    userId: doc.data().userId,
                    username: doc.data().user,
                    description: doc.data().description,
                    message: doc.data().message,
                    userPhotoURL: doc.data().photoURL,
                    postImage: doc.data().postImage
                    // createdAt: calcTime(doc.data().createdAt)
                });
            })
            // console.log(docs);
            setPosts(docs);
            setIsPostLoading(false);
        })

        return () => unsub();
    }, []);

    const createPost = (e, post) => {
        e.preventDefault();
        db.collection('posts').add({
            user: user.displayName,
            userId: user.uid,
            description: user.email,
            title: post.title,
            message: post.content,
            photoURL: user.photoURL,
            createdAt: timestamp()
        }).then((docRef) => {
            const storageRef = storage.ref('images/' + post.file.name);
            const uploadTask = storageRef.put(post.file);

            uploadTask.on('state_changed', (snapshot) => {
                var curprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + curprogress + '% done');
            }, error => {
                console.log(error);
            }, async () => {
                const downloadUrl = await storageRef.getDownloadURL();
                console.log(downloadUrl);

                docRef.update({ postImage: downloadUrl }).then(() =>
                    console.log("Document created with ID: ", docRef.id)
                )
            })

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });

        setInput('');

    }

    // const updatePost = (postId) =>{
    //     db.collection('posts').where('id', '==', postId).get()
    // }

    return (
        <div className='feed'>
            <div className='feed__input'>
                <form className='input__top'>
                    <Avatar src={user.photoURL} className='feed__avatar' >{user.email[0]} </Avatar>
                    <input className='input__box' type='button' value='Start a post' placeholder='Start a post' onClick={() => {
                        const body = document.querySelector('.app__body');

                        body.classList.toggle('noscroll', true);
                        setIsEditorOpen(!isEditorOpen)
                    }} />
                    {/*<value={input} onChange={(e) => setInput(e.target.value)} />*/}
                    <input type='submit' value='Send' onClick={createPost} />
                </form>
                <div className='input__bottom'>
                    <InputOption name='Media' Icon={Image} color='skyblue' />
                    <InputOption name='Event' Icon={Event} color='brown' />
                    <InputOption name='Article' Icon={Article} color='orange' />
                </div>
            </div>
            {/* editor  */}
            {isEditorOpen && <Editor id='editor' onPostSubmit={createPost} onCancel={() => setIsEditorOpen(!isEditorOpen)} />}

            {/* posts */}
            {isPostLoading ?
                (<div className='loading post-loading'>
                    <MoonLoader color='#2867b2' size='40px' />
                </div>)
                :
                <div className='post__wrapper'>
                    {posts.length === 0 && <div style={{ margin: '0 auto', padding: '20px 0', fontWeight: 'bold' }}>No posts available</div>}
                    {posts.map(post => (<Post key={post.id} post={post} />))}

                </div>}
        </div>
    )
}

export default Feed;
