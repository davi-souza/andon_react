import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogOutSideNav extends Component {
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
      <div>
        <li onClick={this.logOut}><Link to='/' className='sidenav-close'>Sair</Link></li>
        <li><div className="divider"></div></li>
      </div>
    );
  }
}

export default LogOutSideNav;
