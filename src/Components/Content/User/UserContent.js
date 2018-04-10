import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Loader from './Components/Loader';
import Manager from './Components/Manager/Manager';
import Central from './Components/Central/Central';

import './Style/User.css';

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'a',
      accessLevel: 1
    };
  }

  render() {
    return (
      <div>
        {this.state.userId === '' &&
          <Loader />
        }
        {this.state.accessLevel === 1 &&
          <Manager userId={this.state.userId} />
        }
        {this.state.accessLevel === 3 &&
          <Central />
        }
      </div>
    );
  }
}

export default UserContent;
