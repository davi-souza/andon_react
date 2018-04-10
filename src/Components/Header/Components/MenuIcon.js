import React, { Component } from 'react';

class MenuIcon extends Component {
  render() {
    return (
      <a data-target='mobile' className='sidenav-trigger'>
        <i className='material-icons'>menu</i>
      </a>
    );
  }
}

export default MenuIcon;
