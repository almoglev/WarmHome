import React from 'react';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth' ;
import { useNavigate, Link } from 'react-router-dom';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const navigate = useNavigate();
  
  const onLogout  = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name){
        // update display name in firebase (authentication)
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        // update display name in firestore (document in users collection)
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name: name
        })
      }

    } catch (error) {
      toast.error('Could not change profile details')
    }
  }

  const onChange = (e) => {
    setFormData((prevState)=> ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const { name, email } = formData;

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="personalDetailsText">Personal Details</p>
        <p className="changePersonalDetails" 
           onClick={ () => { changeDetails && onSubmit()
                             setChangeDetails((prevState) => !prevState) }
                   }
        >
          {changeDetails ? 'Save Changes' : 'Change Name'}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <input type="text" 
                 id="name"
                 className={!changeDetails ? 'profileName' : 'profileNameActive'}
                 disabled={!changeDetails}
                 value={name}
                 onChange={onChange}
          />

          <input type="text" 
                 id="email"
                 className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                 disabled={true}
                 value={email}
                 onChange={onChange}
          />
        </form>
      </div>
    </main>
  </div>
}

export default Profile;
