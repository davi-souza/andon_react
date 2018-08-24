import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
// import texts from './texts/texts.json';

import UserContext from './contexts/UserContext';
import LanguageContext from './contexts/LanguageContext';

import AndonHome from './views/Andon/AndonHome';
import AndonSendWarning from './views/Andon/AndonSendWarning';
import TestView from './views/TestView';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <LanguageContext.Provider value={this.state.language}>
          <UserContext.Provider value={this.state.user}>
            <Switch>
              <Route exact path='/' component={TestView} />
              <Route exact path='/andon' component={AndonHome} />
              <Route exact path='/andon/warning/send' component={AndonSendWarning} />
            </Switch>
          </UserContext.Provider>
        </LanguageContext.Provider>
      </div>
    );
  }
}

export default App;
