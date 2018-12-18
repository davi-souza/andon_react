import React, {Component} from 'react';

import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Container from '../../../components/Grid/Container';
import Appbar from '../../../components/Appbar/Appbar';
import GenericButton from "../../../components/Button/GenericButton";

import login from "../../../fetch/andon/root/login";

import UserContext from '../../../contexts/UserContext';

import accessLevel from '../../../lib/accessLevel';

class Login extends Component {
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
        <Appbar
          position='fixed'
          title='ANDON'
          toolbarLinks={[
            {to:'/andon',name:'Painel',icon:'dialpad'},
            {to:"/andon/project/set",name:"Projeto",icon:"edit",divider:true},
          ]}
        />
        <Container appbarFixed>
          <Paper className="padding-24">
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
                <UserContext.Consumer>
                  {user => (
                    <GenericButton
                      className='width-perc-50 height-rem-2 border-round'
                      disabled={!this.state.login || !this.state.password}
                      loading={this.state.loadingLogin}
                      onClick={() => { this.handleLogin(user.handleLogin) }}
                      loadingSize={50}
                    >
                      Entrar
                    </GenericButton>
                  )}
                </UserContext.Consumer>
              </Grid>
            </Grid>
          </Paper>
        </Container>
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
  handleLogin = (userHandleLogin) => {
    if(window.navigator.geolocation) {
      if(window.navigator.geolocation) {
        this.handleToggleLoading();
        window.navigator.geolocation.getCurrentPosition(async position => {
          let data = await login({
            login: this.state.login,
            password: this.state.password,
            location: {
              lat:position.coords.latitude,
              lng: position.coords.longitude,
            },
            hour: (new Date()).getHours(),
          });
          if(data) {
            userHandleLogin(data);
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

export default Login;