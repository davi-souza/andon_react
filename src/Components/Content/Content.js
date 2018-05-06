import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomeContent from './Home/HomeContent';
import LoginContent from './Login/LoginContent';
import UserContent from './User/UserContent';
import AdminContent from './Admin/AdminContent';

class Content extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={HomeContent} />
        <Route exact path='/login' component={LoginContent} />
        <Route exact path='/user' component={UserContent} />
        <Route exact path='/admin' component={AdminContent} />
      </div>
    );
  }
}

export default Content;
