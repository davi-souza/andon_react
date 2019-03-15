import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import NumberPanel from '../../../components/Panel/NumberPanel';

import { stepOne } from "../../../fetch/andon/leaf/warningSetup";

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
            {to:'/andon/project/set',name:'Projeto',icon:'edit',divider:true},
          ]}
        />
        <GridPage viewContent appBarFixed>
          <SimpleCard rounded>
            <Grid container className='margin-bottom-24'>
              <Grid item xs={12}>
                <div className='txt-align-center height-56'>
                  <Typography variant='display3' className='txt-color-dark'>{this.state.numberPanelValue}</Typography>
                </div>
              </Grid>
            </Grid>
            <NumberPanel color='dark'
              buttonClick={this.handleNumberPanelButtonClick}
              confirmClick={this.HandleStartWarningSetup}
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

  HandleStartWarningSetup = () => {
    if(window.navigator.geolocation) {
      this.handleToggleLoading();
      window.navigator.geolocation.getCurrentPosition(async position => {
        let data = await stepOne({
          login: this.state.numberPanelValue,
          location: {
            lat:position.coords.latitude,
            lng: position.coords.longitude,
          },
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
