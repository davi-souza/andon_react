import React, {Component} from 'react';
import {Switch,Route, Redirect} from 'react-router-dom';

import AndonCentralDashboard from './AndonCentralDashboard';
import AndonCentralAllWarnings from './AndonCentralAllWarnings';
import AndonCentralWarnings from './AndonCentralWarnings';
import AndonCentralUsers from './AndonCentralUsers';
import UserAdd from './User/UserAdd';
import AndonCentralTeams from './AndonCentralTeams';
import teamManager from './Intermediate/teamManager';
import placeManager from './Place/placeManager';
import PlaceAdd from './Place/placeAdd';
import placeUpdate from './Place/placeUpdate';

import UserContext from '../../../contexts/UserContext';
import CentralContext from '../../../contexts/CentralContext';

import { getWarnings, resolveWarning } from "../../../fetch/andon/central/warnings/warnings";
import { getLeafUsers, getIntermediateUsers, addTeamMember, removeTeamMember, addUser } from "../../../fetch/andon/central/users/users";
import { getPlaces, addPlace, addSubPlace, removeSubPlace } from '../../../fetch/andon/central/places';

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

      addUser: (userInfo) => { this.handleAddUser(userInfo) },
      loadingAddUser: false,

      intermediateUsers: [],
      intermediateUsersLoading: true,
      addTeamMember: (intermediateId,leafId) => { this.handleAddTeamMember(intermediateId,leafId) },
      removeTeamMember: (intermediateId,leafId) => { this.handleRemoveTeamMember(intermediateId,leafId) },
      loadingTeamUpdate: false,

      places: [],
      placesLoading: true,
      addSubPlace: (placeId,subPlaceId) => { this.handleAddSubPlace(placeId,subPlaceId) },
      removeSubPlace: (placeId,subPlaceId) => { this.handleRemoveSubPlace(placeId,subPlaceId) },
      updatePlaceLoading: false,
      addPlace: (placeName) => { this.handleAddPlace(placeName) },
      addPlaceLoading: false,

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
    if(!this.props.user.loadingUser && !this.props.user.id) {
      return <Redirect to='/andon/login' />
    }
    return (
      <CentralContext.Provider value={this.state}>
        <Switch>
          <Route exact path='/andon/central/dashboard' component={AndonCentralDashboard} />
          <Route exact path='/andon/central/warnings' component={AndonCentralWarnings} />
          <Route exact path='/andon/central/warnings/all' component={AndonCentralAllWarnings} />
          <Route exact path='/andon/central/users' component={AndonCentralUsers} />
          <Route exact path='/andon/central/users/add' component={UserAdd} />
          <Route exact path='/andon/central/teams' component={AndonCentralTeams} />
          <Route exact path='/andon/central/teams/:id' component={teamManager} />
          <Route exact path='/andon/central/places' component={placeManager} />
          <Route exact path='/andon/central/places/add' component={PlaceAdd} />
          <Route exact path='/andon/central/places/:id' component={placeUpdate} />
        </Switch>
      </CentralContext.Provider>
    )
  }

  fetchAll = () => {
    this.handleGetAllWarnings();
    this.handleGetLeafUsers();
    this.handleGetIntermediateUsers();
    this.handleGetAllPlaces();
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

  handleAddUser = async (userInfo) => {
    this.state.handleChange('loadingAddUser',true);
    try {
      let result = await addUser(userInfo);
      if(result) {
        let users = this.state.leafUsers;
        users = users.concat([
          result,
        ]);
        this.state.handleChange('leafUsers', users);
      }
    } catch (err) {
      alert('Houve um erro.');
    }
    this.state.handleChange('loadingAddUser',false);
    this.props.history.push('/andon/central/users');
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

  handleAddTeamMember = async (intermediateId, leafId) => {
    try {
      this.state.handleChange("loadingTeamUpdate",true);
      let result = await addTeamMember(intermediateId, leafId);
      if(result) {
        let intermediateUsers = this.state.intermediateUsers;
        intermediateUsers = intermediateUsers.map(intermediate => {
          if(intermediate.id === intermediateId) {
            intermediate.teamMembers.push(this.state.leafUsers.find(leaf => leaf.id === leafId));
          }
          return intermediate;
        });
        this.state.handleChange("intermediateUsers",intermediateUsers);
        this.state.handleChange("loadingTeamUpdate",false);
      }
    } catch (err) {
      this.state.handleChange("loadingTeamUpdate",false);
      alert('Houve um erro.');
    }
  }

  handleRemoveTeamMember = async (intermediateId, leafId) => {
    try {
      this.state.handleChange("loadingTeamUpdate",true);
      let result = await removeTeamMember(intermediateId, leafId);
      if(result) {
        let intermediateUsers = this.state.intermediateUsers;
        intermediateUsers = intermediateUsers.map(intermediate => {
          if(intermediate.id === intermediateId) {
            intermediate.teamMembers = intermediate.teamMembers.filter(member => member.id !== leafId);
          }
          return intermediate;
        });
        this.state.handleChange("intermediateUsers",intermediateUsers);
        this.state.handleChange("loadingTeamUpdate",false);
      }
    } catch (err) {
      this.state.handleChange("loadingTeamUpdate",false);
      alert('Houve um erro.');
    }
  }

  handleGetAllPlaces = async () => {
    try {
      this.state.handleChange('placesLoading',true);
      let result = await getPlaces();
      if(result) {
        this.state.handleChange('places',result);
      }
    } catch (err) {
      // ...
    }
    this.state.handleChange('placesLoading',false);
  }

  handleAddSubPlace = async (placeId, subPlaceId) => {
    this.state.handleChange('updatePlaceLoading',true);
    try {
      let result = await addSubPlace(placeId, subPlaceId);
      if(result) {
        let places = this.state.places;
        places = places.map(place => {
          if(place.id === placeId) {
            place.subPlaces = place.subPlaces.concat([
              places.find(sp => sp.id === subPlaceId)
            ]);
          }
          return place;
        });
        this.handleChange('places',places);
      }
    } catch (err) {
      // ...
    }
    this.state.handleChange('updatePlaceLoading',false);
  }

  handleRemoveSubPlace = async (placeId, subPlaceId) => {
    this.state.handleChange('updatePlaceLoading',true);
    try {
      let result = await removeSubPlace(placeId, subPlaceId);
      if(result) {
        let places = this.state.places;
        places = places.map(place => {
          if(place.id === placeId) {
            place.subPlaces = place.subPlaces.filter(sp => sp.id !== subPlaceId);
          }
          return place;
        });
        this.handleChange('places',places);
      }
    } catch (err) {
      // ...
    }
    this.state.handleChange('updatePlaceLoading',false);
  }

  handleAddPlace = async (placeName) => {
    this.state.handleChange('placesLoading',true);
    try {
      let result = await addPlace(placeName);
      if(result) {
        let places = this.state.places;
        places = places.concat([result]);
        this.handleChange('places',places);
      }
    } catch (err) {
      // ...
    }
    this.state.handleChange('placesLoading',false);
    this.props.history.push('/andon/central/places');
  }
}

const AndonCentralIndex = (props) => (
  <UserContext.Consumer>
    {user => <AndonCentralIndexContext user={user} {...props} />}
  </UserContext.Consumer>
);

export default AndonCentralIndex;