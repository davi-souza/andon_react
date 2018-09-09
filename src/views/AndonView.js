import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import AndonHome from './Andon/Home/AndonHome';
import AndonLogout from './Andon/Logout/AndonLogout';
import AndonLogin from './Andon/Home/AndonLogin';
import AndonSendWarning from './Andon/SendWarning/AndonSendWarning';
import AndonIntermediate from './Andon/Intermediate/AndonIntermediate';

import UserContext from '../contexts/UserContext';

class AndonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      login: null,
      name: null,
      title: null,
      access: null,
      projectId: null,
      teams: null,
      lastLocation: null,
      handleLogin: ({id,login,name,title,access,teams,projectId,lastLocation}) => {
        this.setState({
          id,
          login,
          name,
          title,
          access,
          teams,
          projectId,
          lastLocation,
        });
      },
      handleLogout: () => {
        this.setState({
          id: null,
          login: null,
          name: null,
          title: null,
          access: null,
          teams: null,
          projectId: null,
          lastLocation: null,
        });
      }
    };
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon' component={AndonHome} />
          <Route exact path='/andon/login' component={AndonLogin} />
          <Route exact path='/andon/logout' component={AndonLogout} />
          <Route exact path='/andon/warning/send' component={AndonSendWarning} />
          <Route exact path='/andon/intermediate' component={AndonIntermediate} />
        </Switch>
      </UserContext.Provider>
    );
  }
}

export default AndonView;