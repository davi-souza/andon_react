import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import WarningsView from '../../../components/Views/Intermediate/WarningsView';

import UserContext from '../../../contexts/UserContext';

class AndonIntermediateContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [],
      loadingWarnings: true,
    };
  }
  componentDidMount () {
    console.log(this.props.user);
    for(let team of this.props.user.teams) {
      fetch(`/api/warning/team/${team}`,{
        method: 'get',
        credentials: 'same-origin',
      }).then(response => {
        if(response.status !== 200) {
          throw new Error("Houve um erro.");
        } else {
          return response.json();
        }
      }).then(res => {
        console.log(res);
        let oldWarningsState = this.state.warnings;
        this.setState({
          warnings: oldWarningsState.concat(res.data),
          loadingWarnings: false,
        });
      }).catch(err => {
        alert(err);
      });
    }
  }
  handleResolveWarning = (warningId) => {
    if(window.confirm('Tem certeza que o aviso foi resolvido?')) {
      fetch('/api/warning/resolve',{
        method: 'put',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          warningId,
          userId: this.props.user.id,
        }),
      }).then(response => {
        if(response.status !== 200) {
          throw new Error("Houve um erro.");
        } else {
          return response.json();
        }
      }).then(res => {
        let newWarnings = this.state.warnings.filter(w => w.id===warningId?null:w);
        this.setState({
          warnings: newWarnings,
        });
      }).catch(err => {
        alert(err);
      });
    }
  }
  render() {
    if(this.props.user.id === null) {
      return <Redirect to='/andon/login' />;
    }
    return (
      <div className='ds-view' id='ds-view-andon-intermediate'>
        <AppBarComponent position='fixed' toolbarLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]}/>
        <GridPage viewContent appBarFixed>
          {
            this.state.loadingWarnings && 
            <div className='ds-circular-progress-centered'>
              <CircularProgress size={80} color='secondary' />
            </div>
          }
          {
            !this.state.loadingWarnings && <WarningsView handleResolveWarning={this.handleResolveWarning} warnings={this.state.warnings} />
          }
        </GridPage>
      </div>
    );
  }
}

const AndonIntermediate = (props) => {
  return (
    <UserContext.Consumer>
      {user => <AndonIntermediateContext user={user} {...props} />}
    </UserContext.Consumer>
  )
}

export default AndonIntermediate;