import React, { Component } from 'react';
import BrandLogo from './Components/BrandLogo';
import MenuIcon from './Components/MenuIcon';
import NavLinks from './Components/NavLinks';
import SideNav from './Components/SideNav';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className='indigo'>
          <div className='nav-wrapper'>
            <BrandLogo />
            <MenuIcon />
            <NavLinks />
          </div>
        </nav>
        <SideNav />
      </div>
    );
  }
}

export default Header;
