import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import  { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import  { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import  { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';


function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        return route === location.pathname
    }

    return <footer className='navbar'>
        <div className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#ff6a1a': '#8f8f8f'} width="36px" height="36px" />
                    <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/offers')}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? '#ff6a1a': '#8f8f8f'} width="36px" height="36px" />
                    <p className={pathMatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
                </li>
                <li className="navbarListItem" onClick={() => navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#ff6a1a': '#8f8f8f'} width="36px" height="36px" />
                    <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </div>
    </footer>;
}

export default NavBar;
