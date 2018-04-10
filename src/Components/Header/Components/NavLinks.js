import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class NavLinks extends Component {
  render() {
    return (
      <ul className='right hide-on-med-and-down'>
        <Route exact path='/' component={HomeNavLinks}></Route>
        <Route exact path='/login' component={LoginNavLinks}></Route>
        <Route exact path='/warning/send' component={WarningNavLinks}></Route>
        <Route exact path='/user' component={UserNavLinks}></Route>
        <Route exact path='/admin' component={AdminNavLinks}></Route>
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

const WarningNavLinks = () => (
  <li><Link to='/'>Sair</Link></li>
);

const UserNavLinks = () => (
  <li><Link to='/'>Log Out</Link></li>
);

const AdminNavLinks = () => (
  <li><Link to='/'>Log Out</Link></li>
);

export default NavLinks;
