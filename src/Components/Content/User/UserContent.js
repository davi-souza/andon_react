import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Loader from './Components/Loader';
import Manager from './Components/Manager/Manager';
import Central from './Components/Central/Central';
import SendWarning from './Components/SendWarning/SendWarning';
import queryString from 'query-string';

import './Style/User.css';

class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      accessLevel: null
    };
  }

  componentWillMount() {
    let search = queryString.parse(this.props.location.search);
    if(!search.login) {
      this.props.history.push('/');
    }
    let login = search.login;
    fetch('/api/user/getUserInfo/'+login).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            this.setState({
              userId: resJson.content.login,
              name: resJson.content.name,
              accessLevel: resJson.content.access_level,
            })
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.userId === '' &&
          <Loader />
        }
        {this.state.accessLevel === 0 &&
          <SendWarning userId={this.state.userId} userName={this.state.name} />
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
