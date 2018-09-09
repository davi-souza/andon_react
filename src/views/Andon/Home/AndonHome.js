import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import NumberPanel from '../../../components/Panel/NumberPanel';

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
            login: this.state.numberPanelValue,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        })
        .then(response => {
          if(response.status !== 200) {
            throw new Error("Houve um erro.");
          }
          return response.json();
        })
        .then(res => {
          console.log(res.data);
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
          this.props.history.push('/andon/warning/send');
          this.handleToggleLoading();
        })
        .catch(err => {
          alert(err);
          this.handleToggleLoading();
        });
      });
    } else {
      alert('Você precisar habilitar a localização');
    }
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
            {to:'/',name:'Sair',icon:'exit_to_app'}
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
              confirmClick={this.handleLogin}
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
}

const AndonHome = (props) => (
  <UserContext.Consumer>
    {
      user => <AndonHomeContext user={user} {...props} />
    }
  </UserContext.Consumer>
);

export default AndonHome;