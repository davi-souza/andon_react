import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import AndonCentralDashboard from './AndonCentralDashboard';
import AndonCentralWarnings from './AndonCentralWarnings';
import AndonCentralUsers from './AndonCentralUsers';
import AndonCentralUsersAdd from './AndonCentralUsersAdd';
import AndonCentralTeams from './AndonCentralTeams';
import AddMember from './Intermediate/AddMember';

import UserContext from '../../../contexts/UserContext';
import CentralContext from '../../../contexts/CentralContext';

import { getWarnings, resolveWarning } from "../../../fetch/andon/central/warnings/warnings";
import { getLeafUsers, getIntermediateUsers } from "../../../fetch/andon/central/users/users";

class AndonCentralIndexContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [],
      warningsLoading: true,
      getAllWarnings: () => (this.handleGetAllWarnings()),
      resolveWarning: (warningId) => {this.handleResolveWarning(warningId)},

      leafUsers: [],
      leafUsersLoading: true,

      intermediateUsers: [],
      intermediateUsersLoading: true,

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
          <Route exact path='/andon/central/dashboard' component={AndonCentralDashboard} />
          <Route exact path='/andon/central/warnings' component={AndonCentralWarnings} />
          <Route exact path='/andon/central/users' component={AndonCentralUsers} />
          <Route exact path='/andon/central/users/add' component={AndonCentralUsersAdd} />
          <Route exact path='/andon/central/teams' component={AndonCentralTeams} />
          <Route exact path='/andon/central/teams/member/add' component={AddMember} />
        </Switch>
      </CentralContext.Provider>
    )
  }

  fetchAll = () => {
    this.handleGetAllWarnings();
    this.handleGetLeafUsers();
    this.handleGetIntermediateUsers();
  }

  handleGetAllWarnings = async() => {
    this.state.handleChange('warningsLoading',true);
    let response = await getWarnings(this.props.user.projectId);
    if(response) {
      this.state.handleChange("warnings",response);
    }
    this.state.handleChange('warningsLoading',false);
  }
  
  handleResolveWarning = async (warningId) => {
    if(window.confirm("Você tem certeza que este aviso foi solucionado?")) {
      let result = await resolveWarning({userId:this.props.user.id,warningId});
      if(result) {
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
  }

  handleGetLeafUsers = async () => {
    this.state.handleChange('leafUsersLoading',true);
    try {
      let Result = await getLeafUsers(this.props.user.projectId);
      if(Result) {
        this.state.handleChange('leafUsers',Result);
      }
    } catch (e) {
      alert('Houve um erro.');
    }
    this.state.handleChange('leafUsersLoading',false);
  }

  handleGetIntermediateUsers = async () => {
    this.state.handleChange('loadingIntermediateUsers',true);
    try {
      let Result = await getIntermediateUsers(this.props.user.projectId);
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