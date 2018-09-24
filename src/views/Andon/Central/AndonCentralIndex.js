import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import AndonCentralWarnings from './AndonCentralWarnings';
import AndonCentralUsers from './AndonCentralUsers';
import AndonCentralUsersAdd from './AndonCentralUsersAdd';
import AndonCentralTeams from './AndonCentralTeams';
import AndonCentralTeamsAdd from './AndonCentralTeamsAdd';

import UserContext from '../../../contexts/UserContext';
import CentralContext from '../../../contexts/CentralContext';

import {
  FetchCentralUsers, FetchCentralDeleteUser, FetchCentralEditUser, FetchCentralAddUser,
  FetchCentralTeams, FetchCentralEditTeam, FetchCentralAddTeam,
  FetchCentralWarnings, FetchCentralResolveWarning } from '../../../lib/FetchAndonCentral';

class AndonCentralIndexContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingWarnings: true,
      warnings: [],
      resolveWarning: (warningId) => {this.ResolveWarning(warningId)},

      loadingUsers: true,
      users: [],
      addUser: (userObj) => {this.AddUser(userObj)},
      loadingAddUser: false,
      deleteUser: (id) => {this.DeleteUser(id)},
      editUser: (userObj) => {this.EditUser(userObj)},

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

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.id !== null) {
      this.FetchAllWarnings();
      this.FetchAllUsers();
      this.FetchAllTeams();
    }
  }

  componentDidMount() {
    if(this.props.user.id) {
      this.FetchAllWarnings();
      this.FetchAllUsers();
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

  FetchAllWarnings = () => {
    FetchCentralWarnings(this.props.user.projectId).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível carregar os avisos.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('warnings',res.data);
      this.state.handleChange('loadingWarnings',false);
    }).catch(err => {
      alert(err);
    });
  }
  ResolveWarning = (warningId) => {
    FetchCentralResolveWarning(this.props.user.id,warningId).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível resolver aviso.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('loadingWarnings',true);
      this.FetchAllWarnings();
    }).catch(err => {
      alert(err);
    });
  }

  FetchAllUsers = () => {
    FetchCentralUsers(this.props.user.projectId).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível carregar os usuários.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('users',res.data);
      this.state.handleChange('loadingUsers',false);
    }).catch(err => {
      alert(err);
    });
  }
  AddUser = (userObj) => {
    this.state.handleChange('loadingAddUser',true);
    FetchCentralAddUser({...userObj,projectId:this.props.user.projectId}).then(response => {
      if(response.status !== 201) {
        if(response.status === 400) {
          throw new Error('Matrícula já cadastrada.');
        } else {
          throw new Error('Não foi possível criar o usuário.');
        }
      }
      return response.json();
    }).then(res => {
      alert(res.msg);
      this.state.handleChange('loadingUsers',true);
      this.FetchAllUsers();
      this.state.handleChange('loadingAddUser',false);
    }).catch(err => {
      alert(err);
      this.state.handleChange('loadingAddUser',false);
    });
  }
  EditUser = (userObj) => {
    FetchCentralEditUser(userObj).then(response => {
      if(response.status !== 200) {
        if(response.status === 400) {
          throw new Error('Nova matrícula já cadastrada.');
        } else {
          throw new Error('Não foi possível editar o usuário.');
        }
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('loadingUsers',true);
      this.FetchAllUsers();
    }).catch(err => {
      this.state.handleChange('loadingUsers',true);
      this.FetchAllUsers();
      alert(err);
    });
  }
  DeleteUser = (id) => {
    FetchCentralDeleteUser(id).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível deletar o usuário.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('loadingUsers',false);
      this.FetchAllUsers();
    }).catch(err => {
      alert(err);
    });
  }

  FetchAllTeams = () => {
    FetchCentralTeams(this.props.user.projectId).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível carregar os times.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('teams',res.data);
      this.state.handleChange('loadingTeams',false);
    }).catch(err => {
      alert(err);
    });
  }
  AddTeam = (teamObj) => {
    this.state.handleChange('loadingAddTeam',true);
    FetchCentralAddTeam({...teamObj,projectId:this.props.user.projectId}).then(response => {
      if(response.status !== 201) {
        throw new Error('Não foi possível criar o time.');
      }
      return response.json();
    }).then(res => {
      alert(res.msg);
      this.state.handleChange('loadingTeams',true);
      this.FetchAllTeams();
      this.state.handleChange('loadingAddTeam',false);
    }).catch(err => {
      alert(err);
      this.state.handleChange('loadingAddTeam',false);
    });
  }
  EditTeam = (teamObj) => {
    FetchCentralEditTeam(teamObj).then(response => {
      if(response.status !== 200) {
        throw new Error('Não foi possível editar o time.');
      }
      return response.json();
    }).then(res => {
      this.state.handleChange('loadingTeams',false);
      this.FetchAllTeams();
    }).catch(err => {
      alert(err);
    });
  }
}

const AndonCentralIndex = (props) => (
  <UserContext.Consumer>
    {user => <AndonCentralIndexContext user={user} {...props} />}
  </UserContext.Consumer>
);

export default AndonCentralIndex;