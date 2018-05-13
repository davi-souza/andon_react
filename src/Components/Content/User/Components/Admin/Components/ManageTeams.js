import React, { Component } from 'react';
import Loader from './Loader';
import TeamListTable from './ManageTeamsComponents/TeamListTable';
import { ToastContainer,toast } from 'react-toastify';;

class ManageTeams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamsArrayLoaded: false,
      teamsArray: [],
      // 0 - All teams
      // 1 - When one team is clicked, open it
      stage: 0
    }
  }

  getAllTeams = () => {
    this.setState({
      teamsArrayLoaded: false,
      teamsArray: [],
      // 0 - All teams
      // 1 - When one team is clicked, open it
      stage: 0
    });
    fetch('/team/AllTeams',{
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            this.setState({
              teamsArrayLoaded: true,
              teamsArray: resJson.content
            });
          }
        });
      }
    });
  }

  toastOfMemberAdded = (tj) => {
    if(tj.type === 'success'){
      toast.success(tj.msg,{
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true
      });
    }
    else if(tj.type === 'error') {
      toast.error(tj.msg,{
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true
      });
    }
  }

  componentDidMount() {
    this.getAllTeams();
  }

  render() {
    return (
      <div>
        {this.state.teamsArrayLoaded === false &&
          <Loader />
        }
        {this.state.teamsArrayLoaded === true &&
          <TeamListTable teams={this.state.teamsArray} loadTeams={this.getAllTeams} toast={this.toastOfMemberAdded} />
        }
        <ToastContainer />
      </div>
    );
  }
}

export default ManageTeams;
