import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import AndonHome from './Andon/Home/AndonHome';
import AndonLogin from './Andon/Home/AndonLogin';
import AndonProjectSet from './Andon/Home/AndonProjectSet';
import AndonLeaf from './Andon/Leaf/AndonLeaf';
import AndonIntermediate from './Andon/Intermediate/AndonIntermediate';
import AndonCentralIndex from './Andon/Central/AndonCentralIndex';
import AndonLogout from './Andon/Logout/AndonLogout';

import UserContext from '../contexts/UserContext';

import { getProjectId } from '../localStorage/projectId';

class AndonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastLocation: null,
      token: null,
      loadingUser: true,
      handleLoadingUser: (status) => {
        this.setState({
          loadingUser: status,
        });
      },
      handleLogin: ({token,lastLocation}) => {
        this.setState({
          token,
          lastLocation,
        });
      },
      handleLogout: () => {
        this.setState({
          token: null,
          lastLocation: null,
        });
      },
    };
  }

  componentWillMount() {
    this.getProjectIdFromLocalStorage();
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon' component={AndonHome} />
          <Route exact path='/andon/project/set' component={AndonProjectSet} />
          <Route exact path='/andon/login' component={AndonLogin} />
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
}

export default AndonView;
