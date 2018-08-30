import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import StepZero from '../../../components/Views/SendWarning/StepZero';
import StepOne from '../../../components/Views/SendWarning/StepOne';
import StepTwo from '../../../components/Views/SendWarning/StepTwo';
import SimpleCard from '../../../components/Card/SimpleCard';

let countdown;

class AndonSendWarning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: ['motivo1','motivo2','motivo3',],
      places: ['lugar1','lugar2','lugar3',],

      type: null,
      reason: null,
      where: '',
      who: {},
      step: 0,

      numberPanelValue: '',
      secondsToSend: 8,

      sendLoading: false,
      sendSuccess: null,
    }
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
        this.handleSendWarning();
        window.clearInterval(countdown);
      }
    },1000);
  }
  handleCancelSendWarning = () => {
    window.clearInterval(countdown);
    this.props.history.push('/andon');
  }
  handleSendWarning = () => {
    this.setState({
      sendLoading: true,
    });
    setTimeout(()=>{
      this.setState({
        sendLoading: false,
        sendSuccess: false,
      });
    },2000);
  }
  render() {
    return (
      <div>
        <AppBarComponent position='fixed' title='ANDON' toolbarLinks={[{name:'Sair',to:'/andon',icon:'exit_to_app'}]} />
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
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Autor:</span> {this.state.who.name}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Tipo:</span> {this.state.type}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Razão:</span> {this.state.reason}</Typography>
                <Typography variant='headline' className='ds-andon-send-warning-step-4-info'><span>Local:</span> {this.state.where}</Typography>
                <Grid container>
                  <Grid item xs={12} className='ds-andon-send-warning-step-4-grid-item-countdown'>
                    <span id='ds-andon-send-warning-step-4-countdown'>O aviso será enviado em {this.state.secondsToSend} segundos.</span>
                  </Grid>
                  <Grid item xs={12} className='ds-andon-send-warning-step-4-grid-item-cancel'>
                    {
                      !this.state.sendLoading && <Button variant='contained' disabled={this.state.sendLoading} onClick={this.handleCancelSendWarning}>Cancelar</Button>
                    }
                    {
                      this.state.sendLoading && <CircularProgress size={50} id='ds-andon-send-warning-step-4-button-cancel-loading' />
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
                    this.state.sendSuccess && <i className='material-icons success'>check_circle</i>
                  }
                  {
                    !this.state.sendSuccess && <i className='material-icons fail'>cancel</i>
                  }
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
}

export default AndonSendWarning;