import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SpinnerSVG } from '../assets/svg/spinner.svg';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Slider() {
    const [loading, setLoading] = useState(true)
    const [listings, setlistings] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings')
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(3))
            const qSnapshot = await getDocs(q)
    
            let listings = []
    
            qSnapshot.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })            
            setlistings(listings)
            setLoading(false)
        }

        fetchListings()
    }, [])

    if (loading) {
        return (
            <div className='spinnerCenter'>
              <SpinnerSVG />
            </div>
        )
    }
    
    const getPriceWithComma = (price) => {
        return price.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

  return listings && (
      <>
        <p className='exploreHeading'>Latest Listings</p>
        <Swiper slidesPerView={1} pagination={{clickable: true}}>
            {listings.map(({data,id}) => (
                <SwiperSlide key={id} onClick={()=> navigate(`/category/${data.type}/${id}`)}>
                    <div style={{
                            background: `url(${data.imageUrls[0]}) center no-repeat`,
                            backgroundSize: 'cover',
                        }}
                        className="swiperSlideDiv"
                    >
                        <p className="swiperSlideText">{data.name}</p>
                        <p className="swiperSlidePrice">
                            ${data.offer ? getPriceWithComma(data.discountedPrice) : getPriceWithComma(data.regularPrice)}
                            {data.type === 'rent' && ' / Month'}
                        </p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </>
  )
}

export default Slider;
