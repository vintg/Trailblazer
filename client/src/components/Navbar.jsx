import React from "react";


const Navbar = ({ tents, current, updateState }) => (
  <div className='nav__container'>
    <div className='nav__navRefer-container'>
      <div className='nav__navRefer'>
        <ul>
          <li>SHOP REI</li>
          <li>REI OUTLET</li>
          <li>USED GEAR</li>
          <li>REI ADVENTURES</li>
          <li>CLASSES & EVENTS</li>
          <li>EXPERT ADVICE</li>
          <li>CO-OP JOURNAL</li>
          <li>GET OUTSIDE</li>
        </ul>
      </div>
    </div>
    <div className='nav__navShop-container'>
      <div className='nav__navShop'>
        <div className='nav__navShop-logo'>
          <img src='https://satchel.rei.com/media/img/header/rei-co-op-logo-white.svg' alt='rei logo' />
        </div>
        <div className='nav__navShop-data'>
          <div className='nav__navShop__top'>
            <div className='nav__navShop-search'>
              <form>
                <input type='text' placeholder='Search for great gear & clothing' />
                <button><i className="fa fa-search"></i></button>
              </form>
            </div>
            <div className='nav__navShop-account'>
              <ul>
                <li>SIGN IN<i className="fa fa-user"></i></li>
                <li>STORES<i className="fa fa-map-marker"></i></li>
                <li>CART<i className="fa fa-shopping-cart"></i></li>
              </ul>
            </div>
          </div>
          <div className='nav__navShop__middle'>
          </div>
          <div className='nav__navShop__bottom'>
            <div className='nav__navShop-links'>
              <ul>
                <li>Camp & Hike</li>
                <li>Climb</li>
                <li>Cycle</li>
                <li>Paddle</li>
                <li>Run</li>
                <li>Snow</li>
                <li>Travel</li>
                <li>Men</li>
                <li>Women</li>
                <li>Kids</li>
                <li>Gifts</li>
                <li>Deals</li>
                <li>More</li>
                <li>REI OUTLET</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;