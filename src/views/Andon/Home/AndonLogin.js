import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';

import UserContext from '../../../contexts/UserContext';

import accessLevel from '../../../lib/accessLevel';

class AndonLoginContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      loadingLogin: false,
    };
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleToggleLoading = () => {
    this.setState((prevState,props) => {
      return {loadingLogin: !prevState.loadingLogin};
    });
  }
  handleLogin = () => {
    if(window.navigator.geolocation) {
      this.handleToggleLoading();
      window.navigator.geolocation.getCurrentPosition(position => {
        fetch('/api/user/login',{
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            login: this.state.login,
            password: this.state.password,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        })
        .then(response => response.json())
        .then(res => {
          this.props.user.handleLogin({
            id: res.data.id,
            login: res.data.login,
            name: res.data.name,
            title: res.data.title,
            projectId: res.data.projectId,
            teams: res.data.teams,
            access: res.data.access,
            lastLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          if(res.data.access === accessLevel.central) {
            this.props.history.push('/andon/central/warnings');
          } else if(res.data.access === accessLevel.intermediate) {
            this.props.history.push('/andon/intermediate');
          }
          this.handleToggleLoading();
        })
        .catch(err => {
          console.log(err);
          this.handleToggleLoading();
        });
      });
    } else {
      alert('Você precisar habilitar a localização');
    }
  }
  render() {
    return (
      <div>
        <AppBarComponent
          position='fixed'
          title='ANDON'
          drawerLinks={[
            {to:'/andon',name:'Painel',icon:'dialpad'},
            {to:'/andon/login',name:'Log In',icon:'person'},
            {to:'/',name:'Sair',icon:'exit_to_app',divider:true}
          ]}
        />
        <GridPage viewContent appBarFixed>
          <SimpleCard rounded>
            <Grid container style={{margin: '0.5rem auto'}}>
              <Grid item xs={12} className='ds-andon-login-grid'>
                <Typography variant='display1'>Log In</Typography>
              </Grid>
              <Grid item xs={12} className='ds-andon-login-grid'>
                <TextField
                  className='ds-andon-login-input'
                  type='text'
                  value={this.state.login}
                  onChange={this.handleChange}
                  name='login'
                  fullWidth
                  label='Matrícula'
                />
              </Grid>
              <Grid item xs={12} className='ds-andon-login-grid'>
                <TextField
                  className='ds-andon-login-input'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  name='password'
                  fullWidth
                  label='Senha'
                />
              </Grid>
              <Grid item xs={12} className='ds-andon-login-grid-last'>
                {
                  this.state.loadingLogin ?
                  <CircularProgress size={50} color='secondary' />
                  :
                  <Button
                    className='ds-andon-login-button'
                    color='secondary'
                    variant='contained'
                    onClick={this.handleLogin}
                    disabled={this.state.login===''||this.state.password===''||this.state.loadingLogin}
                  >Entrar</Button>
                }
              </Grid>
            </Grid>
          </SimpleCard>
        </GridPage>
      </div>
    );
  }
}

const AndonLogin = (props) => {
  return (
    <UserContext.Consumer>
      { user => <AndonLoginContext user={user} {...props} />}
    </UserContext.Consumer>
  )
}

export default AndonLogin;