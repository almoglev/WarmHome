import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth' ;
import { useNavigate } from 'react-router-dom';
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from '../assets/svg/homeIcon.svg';
import { ReactComponent as SpinnerSVG } from '../assets/svg/spinner.svg';
import ListingItem from '../components/ListingItem';

function Profile() {
  const auth = getAuth()
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
      const qSnapshot = await getDocs(q)

      let listings = []

      qSnapshot.forEach((doc) => {
        return listings.push({
        id: doc.id,
        data: doc.data()
        })
      })

      setListings(listings)
      setLoading(false)
  }

    fetchUserListings()
  }, [auth.currentUser.uid])
  
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
        toast.success('Profile details updated successfully')
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

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you want to delete?')) {
      // delete listing from firebase
      await deleteDoc(doc(db, 'listings', listingId))
      
      // delete listing from the UI
      const updateListings = listings.filter((listing)=> listing.id !== listingId)
      setListings(updateListings)
      toast.success('Successfully deleted listing')
    }
  }
 
  const onEdit = async (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }

  if (loading) {
    return (
        <div className='spinnerCenter'>
          <SpinnerSVG />
        </div>
    )
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
      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>Sell or rent your home</p>
        <img src={arrowRight} alt="arrow right" />
      </Link>

      {!loading && listings?.length > 0 && (
        <>
        <p className="listingText">Your Listings</p>
          <ul className="listingsList">
            {listings.map((listing) => (
              <ListingItem
               key={listing.id} 
               listing={listing.data} 
               id={listing.id} 
               onDelete={() => onDelete(listing.id)} 
               onEdit={() => onEdit(listing.id)}/>
            ))}
          </ul>
        </>
      )}
    </main>
  </div>
}

export default Profile;
