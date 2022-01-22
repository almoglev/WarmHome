import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg'

function GoogleOAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if the user already exists in users collection is firebase
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // if the user doesn't exist, add user to the users collection
      if(!docSnap.exists()){
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      } else {
        toast.error('This user is already registered with Google')
      }
      navigate('/')
    } catch (error) {
      toast.error('Sorry, could not authorize with Google')
    }
  }
  
  return <div className='socialLogin'>
    <p>
      Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img src={googleIcon} alt="Google" className='socialIconImg'></img>
      </button>
  </div>;
}

export default GoogleOAuth;
