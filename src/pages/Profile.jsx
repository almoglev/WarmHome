import React from 'react';
import { useState, useEffect } from 'react';
import { AuthErrorCodes, getAuth } from 'firebase/auth' ;
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const auth = getAuth()

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const navigate = useNavigate();
  
  const onLogout  = () => {
    auth.signOut()
    navigate('/')
  }

  const { name, email } = formData;

  return <div className="profile">
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
      <button type="button" className="logOut" onClick={onLogout}>
        Logout
      </button>
    </header>
  </div>
}

export default Profile;
