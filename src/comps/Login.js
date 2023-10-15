import React, { useState } from 'react'
import '../comps_styles/Login.css'
import { auth } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/userSlice'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picUrl, setPicUrl] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        if (email !== '' && password !== '') {
            console.log('logging in user');

            auth.signInWithEmailAndPassword(email, password).then(userCredential => {
                console.log('user signed in succesfully!!!');
                dispatch(login({
                    email: userCredential.user.email,
                    uid: userCredential.user.uid,
                    displayName: userCredential.user.displayName,
                    photoURL: userCredential.user.photoURL
                }))
            }).catch(error => {
                let code = error.code;
                if (code === 'auth/invalid-login-credentials') {
                    setError('Email or password provided are Invalid')
                } else if (code === 'auth/invalid-email') {
                    setError('Invalid Email, try something like `example@gmail.com`');
                } else if (code === 'auth/too-many-requests') {
                    setError('Too many requests, exceeded maximum allowed try again later ');
                }
                else {
                    console.log(code)
                    setError('something went wrong, try again')
                }

                console.log(error);
            })
        } else {
            console.log('please provide email and password');
        }
    }
    const register = (e) => {

        if (name !== '' && email !== '' && password !== '') {
            console.log('signing up user');

            auth.createUserWithEmailAndPassword(email, password).then(userCredential => {

                userCredential.user.updateProfile(
                    { displayName: name, photoURL: picUrl }
                ).then(() => {
                    dispatch(login({
                        email: userCredential.user.email,
                        uid: userCredential.user.uid,
                        displayName: name,
                        photoURL: picUrl
                    }))
                })
                console.log('user created succesfully!!!');
            }).catch(error => {
                let code = error.code;
                if (code === 'auth/email-already-in-use') {
                    setError('Email already in use, try something different')
                } else if (code === 'auth/invalid-email') {
                    setError('Invalid Email, try something like `example@gmail.com`');
                } else if (code === 'auth/invalid-photo-url') {
                    setError('Invalid Photo URL');
                }
                else {
                    console.log(code)
                    setError('something went wrong, try again')
                }

                //console.log(error.code, typeof error.code);
            })
        } else {
            alert('please provide name, email and password');
        }
    }

    return (
        <div className='login'>
            <img src='https://www.edigitalagency.com.au/wp-content/uploads/Linkedin-logo-png.png' alt='' />
            <form className='form-group'>
                {error && <div className='output error'>{error}</div>}
                <label htmlFor='name'></label>
                <input id='name' type='text' placeholder='Full name (required if registering)' value={name} onChange={(e) => { setName(e.target.value) }} />

                <label htmlFor='profile-pic-url'></label>
                <input id='profile-pic-url' type='text' placeholder='Profile pic URL (optional)' value={picUrl} onChange={(e) => { setPicUrl(e.target.value) }} />

                <label htmlFor='email'></label>
                <input id='email' type='email' placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor='password'></label>
                <input id='password' type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type='submit' value='Sign in' className='signin__btn' onClick={loginToApp} />
            </form>



            <p>Not a member?
                <span className='register' onClick={register}> Register Now</span>
            </p>

        </div>
    )
}

export default Login;
