import React, {Component} from 'react';
import {Redirect,Link} from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import StepZero from '../../../components/Views/Leaf/StepZero';
import StepOne from '../../../components/Views/Leaf/StepOne';
import StepTwo from '../../../components/Views/Leaf/StepTwo';
import SimpleCard from '../../../components/Card/SimpleCard';

import {FetchSendWarning} from '../../../lib/FetchAndonLeaf';

import UserContext from '../../../contexts/UserContext';

let countdown;

class AndonLeafContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: [],
      places: [],
      type: null,
      reasonName: null,
      placeName: '',
      step: 0,

      numberPanelValue: '',
      secondsToSend: 5,

      sendLoading: false,
      sendSuccess: null,
    }
  }
  
  componentWillMount() {
    fetch('/api/reason?filter='+JSON.stringify({projectId:this.props.user.projectId}),{
      method: 'get',
      credentials: 'same-origin',
    }).then(response => response.json())
    .then(res => {
      this.setState({
        reasons: res.data,
      });
    }).catch(err => {
      console.log('Um erro ocorreu.');
    });
    fetch('/api/place?filter='+JSON.stringify({projectId:this.props.user.projectId}),{
      method: 'get',
      credentials: 'same-origin',
    }).then(response => response.json())
    .then(res => {
      this.setState({
        places: res.data,
      });
    }).catch(err => {
      console.log('Um erro ocorreu.');
    });
  }

  
  render() {
    if(this.props.user.loadingUser && this.props.user.id === null) {
      return <Redirect to='/andon' />
    }
    return (
      <div className='ds-view' id='ds-view-andon-sendwarning'>
        <AppBarComponent position='fixed' title={this.props.user.firstname} toolbarLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]} />
        <GridPage viewContent appBarFixed>
          {
            this.state.step===0 &&
            <StepZero handleInfoClick={this.handleInfoClick} step={0} />
          }
          {
            this.state.step===1 &&
            <StepOne reasons={this.state.reasons} handleInfoClick={this.handleInfoClick} step={1}/>
          }
          {
            this.state.step===2 &&
            <StepTwo places={this.state.places} handleInfoClick={this.handleInfoClick} step={2}  />
          }
          {
            this.state.step===3 && this.state.sendSuccess===null &&
            <div className='ds-andon-send-warning-step-4'>
              <SimpleCard rounded>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Autor:</span> {this.props.user.firstname} {this.props.user.lastname}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Tipo:</span> {this.state.type}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Razão:</span> {this.state.reasonName}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Local:</span> {this.state.placeName}</Typography>
                <Grid container>
                  <Grid item xs={12} className='ds-andon-send-warning-step-4-grid-item-countdown'>
                    <span id='ds-andon-send-warning-step-4-countdown'>O aviso será enviado em {this.state.secondsToSend} segundos.</span>
                  </Grid>
                  <Grid item xs={12} className='ds-andon-send-warning-step-4-grid-item-cancel'>
                    {
                      !this.state.sendLoading && <Button variant='contained' disabled={this.state.sendLoading} onClick={this.handleCancelSendWarning}>Cancelar</Button>
                    }
                    {
                      this.state.sendLoading && <CircularProgress color='secondary' size={50} id='ds-andon-send-warning-step-4-button-cancel-loading' />
                    }
                  </Grid>
                </Grid>
              </SimpleCard>
            </div>
          }
          {
            this.state.step===3 && this.state.sendSuccess!==null && 
            <div className='ds-andon-send-warning-step-4 ds-andon-send-warning-step-4-sent-warning-result'>
              <SimpleCard rounded>
                <div className='ds-andon-send-warning-step-4-result-div'>
                  {
                    this.state.sendSuccess && 
                    <div>
                      <i className='material-icons success'>check_circle</i>
                      <Typography variant='headline'>Aviso enviado com sucesso.</Typography>
                      <Typography variant='headline'>Em breve um encarregado virá ajudar.</Typography>
                    </div>
                  }
                  {
                    !this.state.sendSuccess && 
                    <div>
                      <i className='material-icons fail'>cancel</i>
                      <Typography variant='headline'>Não foi enviado.</Typography>
                      <Typography variant='headline'>Entre em contato com um encarregado.</Typography>
                    </div>
                  }
                  <Button variant='contained' color='secondary' component={Link} to={'/andon/logout'}>Sair</Button>
                </div>
              </SimpleCard>
            </div>
          }
          {
            this.state.step <=2 &&
            <div id='ds-andon-send-warning-mobile-stepper'>
              <MobileStepper backButton={
                <Button onClick={this.handleStepperBackButtonClick}>
                  <i className='material-icons'>navigate_before</i>
                </Button>
              } nextButton={
                <Button onClick={this.handleStepperBackButtonClick} disabled>
                  <i className='material-icons'>navigate_next</i>
                </Button>
              } steps={3} activeStep={this.state.step} variant='progress'/>
            </div>
          }
        </GridPage>
      </div>
    )
  }
  handleInfoClick = (key,value,nextStep) => {
    this.setState({
      [key]:value,
      step: nextStep,
    });
    if(nextStep === 3) {
      this.handleSendWarningCountdown();
    }
  }
  handleNumberPanelButtonClick = (n) => {
    if(this.state.numberPanelValue === '' && n === 0) {
      // ... nothing ...
      return;
    }
    else {
      this.setState((prevState,props) => ({
        numberPanelValue: String(prevState.numberPanelValue) + String(n),
      }));
    }
  }
  handleStepperBackButtonClick = () => {
    if(this.state.step === 0) {
      return;
    }
    else {
      this.setState((prevState,props) => ({
        step: prevState.step-1,
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
  handleSendWarningCountdown = () => {
    let countdownStart = this.state.secondsToSend-1;
    countdown = setInterval(()=>{
      if(countdownStart >= 0) {
        document.getElementById('ds-andon-send-warning-step-4-countdown').innerHTML = 'O aviso será enviado em '+countdownStart+' segundos.';
        countdownStart--;
      }
      else {
        this.HandleSendWarning();
        window.clearInterval(countdown);
      }
    },1000);
  }
  handleCancelSendWarning = () => {
    window.clearInterval(countdown);
    this.props.history.push('/andon');
  }
  HandleSendWarning = async () => {
    this.setState({
      sendLoading: true,
    });
    let Result = await FetchSendWarning({
      projectId: this.props.user.projectId,
      createdBy: this.props.user.id,
      type: this.state.type,
      reasonName: this.state.reasonName,
      placeName: this.state.placeName,
      createdDate: Date.now(),
    });
    if(Result) {
      this.setState({
        sendLoading: true,
        sendSuccess: true,
      });
    } else {
      this.setState({
        sendLoading: true,
        sendSuccess: false,
      });
    }
  }
}

const AndonLeaf = (props) => {
  return (
    <UserContext.Consumer>
      {user => <AndonLeafContext user={user} {...props} />}
    </UserContext.Consumer>
  )
}

export default AndonLeaf;