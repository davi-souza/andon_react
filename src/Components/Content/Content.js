import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomeContent from './Home/HomeContent';
import LoginContent from './Login/LoginContent';
import UserContent from './User/UserContent';

class Content extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={HomeContent} />
        <Route exact path='/login' component={LoginContent} />
        <Route exact path='/user' component={UserContent} />
      </div>
    );
  }
}

export default Content;
