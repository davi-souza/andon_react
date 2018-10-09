import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import AndonHome from './Andon/Home/AndonHome';
import AndonLogout from './Andon/Logout/AndonLogout';
import AndonLogin from './Andon/Home/AndonLogin';
import AndonLeaf from './Andon/Leaf/AndonLeaf';
import AndonIntermediate from './Andon/Intermediate/AndonIntermediate';
import AndonCentralIndex from './Andon/Central/AndonCentralIndex';

import UserContext from '../contexts/UserContext';

import { FetchGetSession } from '../lib/fetch/FetchAndonRoot';

class AndonView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 5,
      login: null,
      firstname: null,
      lastname: null,
      jobTitle: null,
      access: null,
      projectId: 1,
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
    this.CheckSession();
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon' component={AndonHome} />
          <Route exact path='/andon/login' component={AndonLogin} />
          <Route exact path='/andon/logout' component={AndonLogout} />
          <Route exact path='/andon/leaf' component={AndonLeaf} />
          <Route exact path='/andon/intermediate' component={AndonIntermediate} />
          <Route path='/andon/central' component={AndonCentralIndex} />
        </Switch>
      </UserContext.Provider>
    );
  }

  CheckSession = () => {
    if(!this.state.id) {
      console.log('[ANDON] Checking if there is a session.');
      FetchGetSession().then(response => response.json())
      .then(res => {
        if(res.data) {
          console.log('[ANDON] There is a session.');
          this.state.handleLogin(res.data);
        } else {
          console.log('[ANDON] There is not a session.');
        }
        this.state.handleLoadingUser(false);
      }).catch(err => {
        console.log(err);
      });
    } else {
      console.log('[ANDON] Already logged in.');
    }
  }
}

export default AndonView;