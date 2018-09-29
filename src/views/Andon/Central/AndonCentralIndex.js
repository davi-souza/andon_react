import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import AndonCentralWarnings from './AndonCentralWarnings';
import AndonCentralUsers from './AndonCentralUsers';
import AndonCentralUsersAdd from './AndonCentralUsersAdd';
import AndonCentralTeams from './AndonCentralTeams';
import AndonCentralTeamsAdd from './AndonCentralTeamsAdd';

import UserContext from '../../../contexts/UserContext';
import CentralContext from '../../../contexts/CentralContext';

import {FetchGetWarnings,FetchResolveWarning} from '../../../lib/FetchAndonCentralWarning';
import {FetchGetUsers, FetchUpdateUser, FetchAddUser,FetchDeleteUser} from '../../../lib/FetchAndonCentralUser';
import {FetchGetTeams, FetchAddTeam, FetchEditTeam} from '../../../lib/FetchAndonCentralTeam';

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

      loadingTeams: true,
      teams: [],
      addTeam: (teamObj) => {this.AddTeam(teamObj)},
      loadingAddTeam: false,
      editTeam: (teamObj) => {this.EditTeam(teamObj)},

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
      this.GetAllWarnings();
      this.GetAllUsers();
      this.FetchAllTeams();
    }
  }

  componentDidMount() {
    if(this.props.user.id) {
      this.GetAllWarnings();
      this.GetAllUsers();
      this.FetchAllTeams();
    }
  }

  render() {
    if(!this.props.user.loadingUser && !this.props.user.id) {
      return <Redirect to='/andon/login' />
    }
    return (
      <CentralContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon/central/warnings' component={AndonCentralWarnings} />
          <Route exact path='/andon/central/users' component={AndonCentralUsers} />
          <Route exact path='/andon/central/users/add' component={AndonCentralUsersAdd} />
          <Route exact path='/andon/central/teams' component={AndonCentralTeams} />
          <Route exact path='/andon/central/teams/add' component={AndonCentralTeamsAdd} />
        </Switch>
      </CentralContext.Provider>
    )
  }

  GetAllWarnings = async() => {
    this.state.handleChange('loadingWarnings',true);
    let Result = await FetchGetWarnings(this.props.user.teams[0]);
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
          warning.userThatResolved = `${this.props.user.firstname} ${this.props.user.lastname}`;
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

  FetchAllTeams = async () => {
    this.state.handleChange('loadingTeams',true);
    try {
      let Result = await FetchGetTeams(this.props.user.projectId);
      if(Result) {
        this.state.handleChange('teams',Result);
      }
    } catch (error) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingTeams',false);
  }
  AddTeam = async (teamObj) => {
    this.state.handleChange('loadingAddTeam',true);
    try {
      let Result = await FetchAddTeam({...teamObj,projectId:this.props.user.projectId});
      if(Result) {
        let newTeams = this.state.teams;
        newTeams.push(Result);
        this.state.handleChange('teams',newTeams)
      }
    } catch (error) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingAddTeam',false);
  }
  EditTeam = async (teamObj) => {
    this.state.handleChange('loadingTeams',true);
    try {
      let Result = await FetchEditTeam(teamObj);
      if(Result) {
        let newTeams = this.state.teams.map(team => {
          if(team.id === teamObj.id) {
            return teamObj;
          }
          return team;
        });
        this.state.handleChange('teams',newTeams);
      }
    } catch (error) {
      alert("Houve um erro.");
    }
    this.state.handleChange('loadingTeams',false);
  }
}

const AndonCentralIndex = (props) => (
  <UserContext.Consumer>
    {user => <AndonCentralIndexContext user={user} {...props} />}
  </UserContext.Consumer>
);

export default AndonCentralIndex;