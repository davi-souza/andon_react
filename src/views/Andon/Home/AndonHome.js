import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import NumberPanel from '../../../components/Panel/NumberPanel';

import {FetchLogin} from '../../../lib/FetchAndonHome';

import UserContext from '../../../contexts/UserContext';

class AndonHomeContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberPanelValue: '',
      loadingLogin: false,
      redirect: false,
    };
  }
  
  render() {
    let buttonsHeight = 6;
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
              <Grid item xs={12}>
                <div style={{height:'5rem',textAlign:'center'}}>
                  <Typography variant='display3'>{this.state.numberPanelValue}</Typography>
                </div>
              </Grid>
            </Grid>
            <NumberPanel color='dark'
              buttonClick={this.handleNumberPanelButtonClick}
              confirmClick={this.HandleLogin}
              eraseClick={this.handleEraseNumber}
              confirmEraseDisabled={this.state.numberPanelValue===''}
              loading={this.state.loadingLogin}
              size={buttonsHeight}
            />
          </SimpleCard>
        </GridPage>
      </div>
    );
  }

  handleNumberPanelButtonClick = (n) => {
    if(this.state.numberPanelValue === '' && n === 0) {
      // ... nothing ...
    }
    else if(this.state.numberPanelValue.length === 11) {
      // ... nothing ...
    }
    else {
      this.setState((prevState,props) => ({
        numberPanelValue: String(prevState.numberPanelValue) + String(n),
      }));
    }
  }
  handleEraseNumber = () => {
    let aux = this.state.numberPanelValue;
    if(aux.length !== 0) {
      aux = aux.substring(0,aux.length-1);
    }
    this.setState({
      numberPanelValue: aux,
    });
  }
  handleToggleLoading = () => {
    this.setState((prevState,props) => {
      return {loadingLogin: !prevState.loadingLogin};
    });
  }
  HandleLogin = () => {
    if(window.navigator.geolocation) {
      this.handleToggleLoading();
      window.navigator.geolocation.getCurrentPosition(async position => {
        let data = await FetchLogin({
          login: this.state.numberPanelValue,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          hour: (new Date()).getHours(),
        });
        if(data) {
          this.props.user.handleLogin(data);
          this.props.history.push('/andon/leaf');
        }
        this.handleToggleLoading();
      });
    } else {
      alert('Você precisar permitir acesso a sua localização.');
    }
  }
}

const AndonHome = (props) => (
  <UserContext.Consumer>
    {
      user => <AndonHomeContext user={user} {...props} />
    }
  </UserContext.Consumer>
);

export default AndonHome;