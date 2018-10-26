import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import AndonCentralWarnings from './AndonCentralWarnings';
import AndonCentralUsers from './AndonCentralUsers';
import AndonCentralUsersAdd from './AndonCentralUsersAdd';
import AndonCentralTeams from './AndonCentralTeams';

import UserContext from '../../../contexts/UserContext';
import CentralContext from '../../../contexts/CentralContext';

import {FetchGetWarnings,FetchResolveWarning} from '../../../lib/fetch/FetchAndonCentralWarning';
import {FetchGetUsers, FetchUpdateUser, FetchAddUser,FetchDeleteUser} from '../../../lib/fetch/FetchAndonCentralUser';
import {FetchIntermediateUsers} from '../../../lib/fetch/FetchAndonCentralTeam';

class AndonCentralIndexContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingWarnings: true,
      warnings: [],
      getAllWarnings: () => (this.GetAllWarnings()),
      resolveWarning: (warningId) => {this.ResolveWarning(warningId)},

      loadingUsers: true,
      users: [],
      addUser: (userObj) => {this.AddUser(userObj)},
      loadingAddUser: false,
      deleteUser: (id) => {this.DeleteUser(id)},
      updateUser: (userObj) => {this.UpdateUser(userObj)},

      loadingIntermediateUsers: true,
      intermediateUsers: [],

      handleChange: (key,value) => {
        if(key === 'handleChange') {
          return;
        }
        this.setState({
          [key]: value
        });
      },
    }
  }

  componentDidUpdate(prevProps,prevState,snapshot) {
    if(prevProps.user.id === null && this.props.user.id !== null) {
      this.fetchAll();
    }
  }

  componentDidMount() {
    if(this.props.user.id) {
      this.fetchAll();
    }
  }

  render() {
    // if(!this.props.user.loadingUser && !this.props.user.id) {
    //   return <Redirect to='/andon/login' />
    // }
    return (
      <CentralContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon/central/warnings' component={AndonCentralWarnings} />
          <Route exact path='/andon/central/users' component={AndonCentralUsers} />
          <Route exact path='/andon/central/users/add' component={AndonCentralUsersAdd} />
          <Route exact path='/andon/central/teams' component={AndonCentralTeams} />
        </Switch>
      </CentralContext.Provider>
    )
  }

  fetchAll = () => {
    this.GetAllWarnings();
    this.GetAllUsers();
    this.FetchAllIntermediates();
  }

  GetAllWarnings = async() => {
    this.state.handleChange('loadingWarnings',true);
    let Result = await FetchGetWarnings(this.props.user.projectId);this
    if(Result) {
      this.setState({
        warnings: Result,
      });
    }
    this.state.handleChange('loadingWarnings',false);
  }
  ResolveWarning = async (warningId) => {
    let Result = await FetchResolveWarning({userId:this.props.user.id,warningId});
    if(Result) {
      let newWarnings = this.state.warnings.map(warning => {
        if(warning.id===warningId) {
          warning.userThatResolved = this.props.user;
          warning.resolvedDate = Date.now();
        }
        return warning;
      });
      this.setState({
        warnings: newWarnings,
      });
    } else {
      // ... nothing
    }
  }

  GetAllUsers = async () => {
    this.state.handleChange('loadingUsers',true);
    try {
      let Result = await FetchGetUsers(this.props.user.projectId);
      if(Result) {
        this.state.handleChange('users',Result);
      }
    } catch (e) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingUsers',false);
  }

  AddUser = async (userObj) => {
    this.state.handleChange('loadingAddUser',true);
    try {
      let Result = await FetchAddUser({...userObj,projectId:this.props.user.projectId});
      if(Result) {
        let newUsers = this.state.users;
        newUsers.push({
          id: Result.id,
          teams: [],
          name: `${userObj.firstname} ${userObj.lastname}`,
          login: userObj.login,
          jobTitle: userObj.jobTitle,
          password: userObj.password,
        });
        this.state.handleChange('users',newUsers);
      }
    } catch(e) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingAddUser',false);
  }
  UpdateUser = async (userObj) => {
    this.state.handleChange('loadingUsers',true);
    try {
      let oldUser = this.state.users.filter(user => {
        if(user.id === userObj.id) {
          return true;
        }
        return false
      })[0];
      let Result = await FetchUpdateUser(oldUser,userObj);
      if(Result) {
        let newUsers = this.state.users.map(user => {
          if(user.id === userObj.id) {
            return userObj;
          } else {
            return user;
          }
        });
        this.state.handleChange('users',newUsers);
      }
    } catch (e) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingUsers',false);
  }
  DeleteUser = async (id) => {
    try {
      let Result = await FetchDeleteUser(id);
      if(Result) {
        let newUsers = this.state.users.filter(user => {
          if(user.id === id) {
            return false;
          } else {
            return true;
          }
        });
        this.state.handleChange('users',newUsers);
      }
    } catch (e) {
      alert('Houve um erro.');
    }
  }

  FetchAllIntermediates = async () => {
    this.state.handleChange('loadingIntermediateUsers',true);
    try {
      let Result = await FetchIntermediateUsers(this.props.user.projectId);
      if(Result) {
        this.state.handleChange('intermediateUsers',Result);
      }
    } catch (error) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingIntermediateUsers',false);
  }
}

const AndonCentralIndex = (props) => (
  <UserContext.Consumer>
    {user => <AndonCentralIndexContext user={user} {...props} />}
  </UserContext.Consumer>
);

export default AndonCentralIndex;