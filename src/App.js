import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import IndexView from './views/IndexView';
import AndonView from './views/AndonView';

import "./bundle.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={IndexView} />
          <Route path='/andon' component={AndonView} />
        </Switch>
      </div>
    );
  }
}

export default App;
