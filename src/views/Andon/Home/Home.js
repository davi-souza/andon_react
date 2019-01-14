import React, {Component} from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Container from "../../../components/Grid/Container";
import Appbar from "../../../components/Appbar/Appbar";
import NumberPanel from "../../../components/Panel/NumberPanel";

import login from "../../../fetch/andon/root/login";

import UserContext from "../../../contexts/UserContext";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberPanelValue: "",
      loadingLogin: false,
      redirect: false,
    };
  }
  
  render() {
    let buttonsHeight = 5;
    return (
      <div>
        <Appbar
          position="fixed"
          title="ANDON"
          toolbarLinks={[
            {to:"/andon/login",name:"Log In",icon:"person"},
            {to:"/andon/project/set",name:"Projeto",icon:"edit",divider:true},
          ]}
        />
        <Container appbarFixed>
          <Paper className="padding-bottom-16 padding-top-16">
            <Grid container className="margin-bottom-24">
              <Grid item xs={12}>
                <div className="txt-align-center height-56">
                  <Typography variant="display3" className="txt-color-dark">{this.state.numberPanelValue}</Typography>
                </div>
              </Grid>
            </Grid>
            <UserContext.Consumer>
              {user => (
                <NumberPanel
                  color="dark"
                  buttonClick={this.handleNumberPanelButtonClick}
                  confirmClick={() => {this.handleLogin(user.handleLogin)}}
                  eraseClick={this.handleEraseNumber}
                  confirmEraseDisabled={this.state.numberPanelValue===""}
                  loading={this.state.loadingLogin}
                  size={buttonsHeight}
                />
              )}
            </UserContext.Consumer>
          </Paper>
        </Container>
      </div>
    );
  }

  handleNumberPanelButtonClick = (n) => {
    if(this.state.numberPanelValue === "" && n === 0) {
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
  handleLogin = (userHandleLogin) => {
    if(window.navigator.geolocation) {
      this.handleToggleLoading();
      window.navigator.geolocation.getCurrentPosition(async position => {
        try {
          let data = await login({
            login: this.state.numberPanelValue,
            password: "",
            location: {
              lat:position.coords.latitude,
              lng: position.coords.longitude,
            },
            hour: (new Date()).getHours(),
          });
          if(data) {
            userHandleLogin(data);
            this.props.history.push("/andon/leaf");
          }
          this.handleToggleLoading();
        } catch (error) {
          
        }
      });
    } else {
      alert("Você precisar permitir acesso a sua localização.");
    }
  }
}

export default Home;