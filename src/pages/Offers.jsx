import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { ReactComponent as SpinnerSVG } from '../assets/svg/spinner.svg';
import ListingItem from '../components/ListingItem';


function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams()

  useEffect(()=> {
    loadListings()
  },[])

  // pagination for loading functionality (7 at a time)
  const loadListings = async () => {
    try {

      // Get reference to the listings collection from firebase
      const listingsRef = collection(db, 'listings')

      // create a query
      let q = null
      if (lastFetchedListing !== null) {
        q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          startAfter(lastFetchedListing),
          limit(7)
        )
      } else {
        q = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(7)
        )
      }

      // Execute q to get snapshot
      const querySnap = await getDocs(q)

      // remember the last one we fetched for pagination
      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)
      
      const listings = []
      querySnap.forEach((doc) => {
          return listings.push({
          id: doc.id,
          data: doc.data()
        })
      })

      lastFetchedListing !== null ? setListings((prevState) => [...prevState, ...listings]) : setListings(listings)

      setLoading(false)
    } catch (error) {
      toast.error("Sorry, could not fetch listings")
    }
  }
    

  return <div className='category'>
    <header>
      <p className="pageHeader">
        Special Offers
      </p>
    </header>

    { loading ?       
        <div className='spinnerCenter'>
                <SpinnerSVG />
        </div> 
      : 
        listings && listings.length > 0 ? 
          <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
              ))}
            </ul>
          </main>

          <br /><br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={loadListings}>Load More</p>
          )}
          </> 
        : 
          <p>No offers to show</p>}
  </div>
}

export default Offers;
