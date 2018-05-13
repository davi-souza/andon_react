import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LogOutNav from './LogOutNav';

class NavLinks extends Component {
  render() {
    return (
      <ul className='right hide-on-med-and-down'>
        <Route exact path='/' component={HomeNavLinks}></Route>
        <Route exact path='/login' component={LoginNavLinks}></Route>
        <Route exact path='/user' component={LogOutNav}></Route>
        <Route exact path='/admin' component={LogOutNav}></Route>
      </ul>
    );
  }
}

const HomeNavLinks = () => (
  <li><Link to='/login'>Log In</Link></li>
);

const LoginNavLinks = () => (
  <li><Link to='/'>Painel</Link></li>
);

export default NavLinks;
