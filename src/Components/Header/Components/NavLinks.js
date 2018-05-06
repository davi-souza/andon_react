import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class NavLinks extends Component {
  render() {
    return (
      <ul className='right hide-on-med-and-down'>
        <Route exact path='/' component={HomeNavLinks}></Route>
        <Route exact path='/login' component={LoginNavLinks}></Route>
        <Route exact path='/user' component={LogOutNavLink}></Route>
        <Route exact path='/admin' component={LogOutNavLink}></Route>
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

const LogOutNavLink = () => (
  <li><Link to='/'>Sair</Link></li>
);

export default NavLinks;
