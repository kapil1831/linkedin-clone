import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './comps/Header';
import SideBar from './comps/SideBar';
import Feed from './comps/Feed';
import Login from './comps/Login';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase/config';
import Widgets from './comps/Widgets';
import { MoonLoader } from 'react-spinners';

function App() {
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(userCredential => {
      if (userCredential) {
        //user is login
        dispatch(login({
          email: userCredential.email,
          uid: userCredential.uid,
          displayName: userCredential.displayName,
          photoURL: userCredential.photoURL
        }));
      } else {
        //use logged out
        dispatch(logout());
      }
      setLoading(false);
    }
    )
  }, []);

  return (
    <div className="app">
      {loading
        ?
        (<div className='loading'>
          <MoonLoader color='#2867b2' />
        </div>)
        :

        (<div>
          {/* Header */}
          <Header />
          {/* app body */}

          {
            !user ? <Login /> :

              <div className='app__body' >
                {/* left sidebar */}
                <SideBar />
                {/* feed */}
                <Feed />
                {/* right sidebar */}
                <Widgets />
              </div>
          }
        </div>)
      }

    </div>
  );
}

export default App;
