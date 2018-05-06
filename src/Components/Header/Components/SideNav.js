import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

class SideNav extends Component {
  render() {
    return (
      <ul className='sidenav' id='mobile'>
        <nav className='indigo'>
          <div className='nav-wrapper'>
            <BrandLogo />
          </div>
        </nav>
        <Route exact path='/' component={HomeSideNav}></Route>
        <Route exact path='/login' component={LoginSideNav}></Route>
        <Route exact path='/user' component={LogOutSideNav}></Route>
        <Route exact path='/admin' component={LogOutSideNav}></Route>
      </ul>
    );
  }
}

const HomeSideNav = () => (
  <div>
    <li><Link to='/login' className='sidenav-close'>Log In</Link></li>
    <li><div className="divider"></div></li>
  </div>
);

const LoginSideNav = () => (
  <div>
    <li><Link to='/' className='sidenav-close'>Painel</Link></li>
    <li><div className="divider"></div></li>
  </div>
);

const LogOutSideNav = () => (
  <div>
    <li><Link to='/' className='sidenav-close'>Sair</Link></li>
    <li><div className="divider"></div></li>
  </div>
);

export default SideNav;
