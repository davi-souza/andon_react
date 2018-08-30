import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import UserContext from './contexts/UserContext';

import AndonHome from './views/Andon/Home/AndonHome';
import AndonSendWarning from './views/Andon/SendWarning/AndonSendWarning';
import AndonIntermediate from './views/Andon/Intermediate/AndonIntermediate';
import TestView from './views/TestView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <UserContext.Provider value={this.state.user}>
          <Switch>
            <Route exact path='/' component={TestView} />
            <Route exact path='/andon' component={AndonHome} />
            <Route exact path='/andon/warning/send' component={AndonSendWarning} />
            <Route exact path='/andon/intermediate' component={AndonIntermediate} />
          </Switch>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
