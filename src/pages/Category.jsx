import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { ReactComponent as SpinnerSVG } from '../assets/svg/spinner.svg';
import ListingItem from '../components/ListingItem';


function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(()=> {
    const fetchListings = async () => {
      try {
        // Get reference to the listings collection from firebase
        const listingsRef = collection(db, 'listings')

        // create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )

        // Execute q to get snapshot
        const querySnap = await getDocs(q)
        const allListings = []

        querySnap.forEach((doc) => {
          return allListings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListings(allListings)
        setLoading(false)

      } catch (error) {
        toast.error("Sorry, could not fetch listings")
      }
    }

    fetchListings()
  },[params.categoryName])

  return <div className='category'>
    <header>
      <p className="pageHeader">
        Places for {params.categoryName}
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
          </> 
        : 
          <p>No listings for {params.categoryName}</p>}
  </div>
}

export default Category;
