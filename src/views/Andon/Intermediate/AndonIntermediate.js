import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import WarningCard from '../../../components/Views/Intermediate/WarningCard';

import {FetchIntermediateGetWarning,FetchIntermediateResolveWarning} from '../../../lib/FetchAndonIntermediate';

import UserContext from '../../../contexts/UserContext';

class AndonIntermediateContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [],
      loadingWarnings: true,
      loadingResolveWarning: false,
    };
  }
  // componentWillReceiveProps(nextProps) {
  //   if(this.props.user.id === null && nextProps.user.id !== null) {
  //     this.HandleGetWarnings();
  //   }
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.user.id === null && this.props.user.id !== null) {
      this.HandleGetWarnings();
    }
  }

  componentDidMount() {
    if(this.props.user.id) {
      this.HandleGetWarnings();
    }
  }
  render() {
    if(!this.props.user.loadingUser && this.props.user.id === null) {
      return <Redirect to='/andon/login' />;
    }
    return (
      <div className='ds-view' id='ds-view-andon-intermediate'>
        <AppBarComponent
          title={this.props.user.firstname || 'ANDON'}
          position='fixed'
          drawerLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]}
        />
        <GridPage viewContent appBarFixed>
          {
            this.state.loadingWarnings ? 
            <div className='ds-circular-progress-centered'>
              <CircularProgress size={80} color='secondary' />
            </div>
            :
            <Grid container spacing={8}>
              {this.state.warnings.filter(warning => warning.resolvedDate === null).map(warning => (
                <WarningCard
                  key={warning.id}
                  warning={warning}
                  handleResolveWarning={this.handleResolveWarning}
                  loadingResolveWarning={this.state.loadingResolveWarning}
                />
              ))}
            </Grid>
          }
        </GridPage>
      </div>
    );
  }
  handleResolveWarning = async (warningId) => {
    if(window.confirm('Tem certeza que o aviso foi resolvido?')) {
      this.setState({
        loadingResolveWarning: true,
      });
      let Result = await FetchIntermediateResolveWarning({
        warningId,
        userId: this.props.user.id,
      });
      if(Result) {
        let newWarnings = this.state.warnings.filter(warning => (warning.id !== warningId));
        this.setState({
          warnings: newWarnings,
        });
      }
      this.setState({
        loadingResolveWarning: false,
      });
    }
  }

  HandleGetWarnings = async () => {
    if(!this.props.user.teams) {
      return;
    }
    for(let team of this.props.user.teams) {
      let Warnings = await FetchIntermediateGetWarning(team);
      let oldWarnings = this.state.warnings;
      this.setState({
        warnings: oldWarnings.concat(Warnings),
      });
    }
    this.setState({
      loadingWarnings: false,
    });
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