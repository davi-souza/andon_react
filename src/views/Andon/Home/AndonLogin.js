import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';

import {FetchLogin} from '../../../lib/fetch/FetchAndonHome';

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
            <Grid container>
              <Grid item xs={12} className='txt-align-center margin-bottom-16'>
                <Typography variant='display1'>Log In</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='margin-bottom-24'
                  type='text'
                  value={this.state.login}
                  onChange={this.handleChange}
                  name='login'
                  fullWidth
                  label='Matrícula'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='margin-bottom-24'
                  type='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  name='password'
                  fullWidth
                  label='Senha'
                />
              </Grid>
              <Grid item xs={12} className='txt-align-center'>
                {
                  this.state.loadingLogin ?
                  <CircularProgress size={50} color='secondary' />
                  :
                  <Button
                    className='width-perc-50 height-rem-2 border-round'
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
      if(window.navigator.geolocation) {
        this.handleToggleLoading();
        window.navigator.geolocation.getCurrentPosition(async position => {
          let data = await FetchLogin({
            login: this.state.login,
            password: this.state.password,
            location: {
              lat:position.coords.latitude,
              lng: position.coords.longitude,
            },
            hour: (new Date()).getHours(),
          });
          console.log(data);
          if(data) {
            this.props.user.handleLogin(data);
            if(data.access === accessLevel.central) {
              this.props.history.push('/andon/central/warnings');
            } else if(data.access === accessLevel.intermediate) {
              this.props.history.push('/andon/intermediate');
            } else if(data.access === accessLevel.leaf) {
              this.props.history.push('/andon/leaf');
            }
          }
          this.handleToggleLoading();
        });
      } else {
        alert('Você precisar permitir acesso a sua localização.');
      }
    } else {
      alert('Você precisar habilitar a localização');
    }
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