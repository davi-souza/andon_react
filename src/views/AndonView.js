import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from './Andon/Home/Home';
import Login from './Andon/Home/Login';
import AndonProjectSet from './Andon/Home/AndonProjectSet';
import AndonLeaf from './Andon/Leaf/AndonLeaf';
import AndonIntermediate from './Andon/Intermediate/AndonIntermediate';
import AndonCentralIndex from './Andon/Central/AndonCentralIndex';
import AndonLogout from './Andon/Logout/AndonLogout';

import UserContext from '../contexts/UserContext';

import { getProjectId } from '../localStorage/projectId';
import session from '../fetch/andon/root/session';

class AndonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      login: null,
      firstname: null,
      lastname: null,
      jobTitle: null,
      access: null,
      projectId: null,
      teams: null,
      lastLocation: null,
      handleLogin: ({id,login,firstname,lastname,jobTitle,access,teams,projectId,lastLocation}) => {
        this.setState({
          id,
          login,
          firstname,
          lastname,
          jobTitle,
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
          firstname: null,
          lastname: null,
          jobTitle: null,
          access: null,
          teams: null,
          projectId: null,
          lastLocation: null,
        });
      },
      handleLoadingUser: (status) => {
        this.setState({
          loadingUser: status,
        });
      },
      loadingUser: true,
    };
  }
  componentWillMount() {
    this.getProjectIdFromLocalStorage();
    this.CheckSession();
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon' component={Home} />
          <Route exact path='/andon/project/set' component={AndonProjectSet} />
          <Route exact path='/andon/login' component={Login} />
          <Route exact path='/andon/logout' component={AndonLogout} />
          <Route exact path='/andon/leaf' component={AndonLeaf} />
          <Route exact path='/andon/intermediate' component={AndonIntermediate} />
          <Route path='/andon/central' component={AndonCentralIndex} />
        </Switch>
      </UserContext.Provider>
    );
  }

  // get project id from local storage
  getProjectIdFromLocalStorage = () => {
    this.setState({
      projectId: getProjectId(),
    });
  }

  // get session if it exists
  CheckSession = async () => {
    // if it's not already logged in
    if(!this.state.id) {
      let sessionData = await session();
      // if there is a session
      if(sessionData) {
        this.state.handleLogin(sessionData);
      }
    }
  }
}

export default AndonView;