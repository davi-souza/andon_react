import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';

import Container from '../../../components/Grid/Container';
import Appbar from '../../../components/Appbar/Appbar';
import Warnings from "../../../components/Views/Intermediate/Warnings";

import warnings from "../../../fetch/andon/intermediate/warnings";
import resolveWarning from '../../../fetch/andon/intermediate/resolveWarning';

import UserContext from '../../../contexts/UserContext';
import IntermediateContext from '../../../contexts/IntermediateContext';

class AndonIntermediateContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [],
      warningsLoading: true,
      resolveLoading: false,

      resolve: this.handleResolveWarning,

      handleChange: (key,value) => {
        this.setState({
          [key]: value,
        })
      },
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.user.id === null && this.props.user.id !== null) {
      this.handleGetWarnings();
    }
  }

  componentDidMount() {
    if(this.props.user.id) {
      this.handleGetWarnings();
    }
  }
  render() {
    // if(!this.props.user.loadingUser && this.props.user.id === null) {
    //   return <Redirect to='/andon/login' />;
    // }
    return (
      <IntermediateContext.Provider value={this.state}>
        <Appbar
          title={this.props.user.firstname || 'ANDON'}
          position='fixed'
          toolbarLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]}
        />
        <Container appbarFixed>
          {
            this.state.warningsLoading ? 
            <div className='txt-align-center'>
              <CircularProgress size={80} color='secondary' />
            </div>
            :
            <Warnings />
          }
        </Container>
      </IntermediateContext.Provider>
    );
  }
  handleResolveWarning = async (warningId) => {
    if(window.confirm('Tem certeza que o aviso foi resolvido?')) {
      this.state.handleChange("resolveLoading", true);

      try {
        let response = await resolveWarning(this.props.user.id,warningId);
  
        if(response) {
          let newWarnings = this.state.warnings.filter(warning => warning.id!==warningId);
          this.state.handleChange("warnings",newWarnings);
        }

      } catch (err) {
        alert("Houve um erro.")
      }

      this.state.handleChange("resolveLoading", false);
    }
  }

  handleGetWarnings = async () => {
    this.state.handleChange("warningsLoading",true);
    try {
      let response = await warnings(this.props.user.id);
      if(response) {
        this.state.handleChange("warnings",response);
      }
    } catch (err) {
      alert("Houve um erro.");
    }
    this.state.handleChange("warningsLoading",false);
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