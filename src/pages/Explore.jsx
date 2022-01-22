import React from 'react';
import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
import { FaHome } from 'react-icons/fa'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className="exploreHeader"><FaHome size='25px' fill='#ff6039'/>
        &nbsp;
        WarmHome
        </p>
      </header>

      <main>
        {/* slider */}
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img src={rentCategoryImage} alt ="rent" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Places for rent</p>
          </Link>

          <Link to="/category/sale">
            <img src={sellCategoryImage} alt ="sale" className='exploreCategoryImg'/>
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore;
