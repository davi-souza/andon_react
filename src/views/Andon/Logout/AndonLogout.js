import React from 'react';
import {Redirect} from 'react-router-dom'

import UserContext from '../../../contexts/UserContext';

const AndonLogoutContext = (props) => {
  props.user.handleLogout();
  return <Redirect to='/andon' />;
}

const AndonLogout = (props) => {
  return (
    <UserContext.Consumer>
      {user => <AndonLogoutContext user={user} {...props} />}
    </UserContext.Consumer>
  )
}

export default AndonLogout;