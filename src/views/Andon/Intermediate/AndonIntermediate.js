import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import WarningCard from '../../../components/Views/Intermediate/WarningCard';

import {FetchIntermediateGetWarning,FetchIntermediateResolveWarning} from '../../../lib/fetch/FetchAndonIntermediate';

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
    // if(!this.props.user.loadingUser && this.props.user.id === null) {
    //   return <Redirect to='/andon/login' />;
    // }
    return (
      <div>
        <AppBarComponent
          title={this.props.user.firstname || 'ANDON'}
          position='fixed'
          drawerLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]}
        />
        <GridPage viewContent appBarFixed>
          {
            this.state.loadingWarnings ? 
            <div className='txt-align-center'>
              <CircularProgress size={80} color='secondary' />
            </div>
            :
            <Grid container spacing={8}>
              {this.state.warnings.sort((a,b) => {
                if(a.createdDate > b.createdDate) {
                  return 1;
                } else if(a.createdDate < b.createdDate) {
                  return -1;
                }
                return 0;
              }).filter(warning => warning.userThatCreated || false).map(warning => (
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
      try {
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
      } catch (error) {
        alert('Houve um erro');
      }
      this.setState({
        loadingResolveWarning: false,
      });
    }
  }

  HandleGetWarnings = async () => {
    this.setState({loadingWarnings: true});
    try {
      let Response = await FetchIntermediateGetWarning(this.props.user.id);
      if(Response) {
        this.setState({
          warnings: Response,
        });
      }
    } catch (err) {
      alert('Houve um erro.');
    }
    this.setState({loadingWarnings: false});
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