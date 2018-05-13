import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogOutNav extends Component {
  logOut = () => {
    fetch('/logout',{
      credentials: 'same-origin',
    }).then(res => {
      if(res.ok){
        // ...
      }
    });
  }
  render() {
    return (
      <li><Link to='/'>Sair</Link></li>
    );
  }
}

export default LogOutNav;
