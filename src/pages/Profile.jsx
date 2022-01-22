import React from 'react';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth' ;

function Profile() {
  const auth = getAuth()
  const [user, setUser] = useState(null)
  
  useEffect (()=> {
    setUser(auth.currentUser)
  }, [])
  return user ? <h1>{user.displayName}</h1> : 'Not Logged In'
}

export default Profile;
