import React, { Component } from 'react';
import WarningCard from './Components/WarningCard';
import Loader from '../Loader';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: []
    };
    this.getWarnings = this.getWarnings.bind(this);
    this.resolveWarning = this.resolveWarning.bind(this);
  }

  getWarnings() {
    fetch('/api/team/'+this.props.userId+'/getTeamMembers').then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          for(let member of resJson.content) {
            fetch('/api/user/getUserInfo/'+member.login).then(memberInfo => {
              if(memberInfo.ok) {
                memberInfo.json().then(memberInfoJson => {
                  for(let warning of memberInfoJson.content.myCreatedWarnings) {
                    if(warning.resolvedDate === null) {
                      let warningAux = warning;
                      warningAux.who = member.name;
                      let warningsAux = this.state.warnings;
                      warningsAux.push(warningAux);
                      this.setState({
                        warnings: warningsAux
                      });
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  resolveWarning(warningId) {
    fetch('/api/warning/resolve/'+warningId,{
      method: 'put'
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            document.getElementById('userWarningCard'+warningId).remove();
          }
        });
      }
    });
  }

  componentDidMount() {
    this.getWarnings();
  }

  render() {
    return (
      <div className='container row'>
        {this.state.warnings.length === 0 &&
          <Loader />
        }
        {this.state.warnings.map((warning,index) =>
          <WarningCard
            resolveWarning={this.resolveWarning}
            warningId={warning.id}
            warningType={warning.type}
            warningReason={warning.reason}
            warningWhere={warning.where}
            warningDate={warning.emissionDate}
            warningWho={warning.who}
            key={warning.id}/>
        )}
      </div>
    );
  }
}

export default Manager;
