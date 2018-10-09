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

import {FetchSendWarning, FetchGetReasons, FetchGetPlaces} from '../../../lib/fetch/FetchAndonLeaf';

import UserContext from '../../../contexts/UserContext';

let countdown;

class AndonLeafContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasons: [],
      places: [],

      type: null,
      reason: null,
      place: null,

      step: 0,

      numberPanelValue: '',
      secondsToSend: 5,

      sendLoading: false,
      sendSuccess: null,
    }
  }
  
  componentWillMount() {
    this.handleGetReasons();
    this.handleGetPlaces();
  }

  
  render() {
    // if(this.props.user.loadingUser && this.props.user.id === null) {
    //   return <Redirect to='/andon' />
    // }
    return (
      <div className='ds-view' id='ds-view-andon-sendwarning'>
        <AppBarComponent position='fixed' title={this.props.user.firstname} drawerLinks={[{name:'Sair',to:'/andon/logout',icon:'exit_to_app'}]} />
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
                <Typography variant='headline' className='margin-bottom-16'>Autor: {`${this.props.user.firstname} ${this.props.user.lastname}`}</Typography>
                <Typography variant='headline' className='margin-bottom-16'>Tipo: {this.state.type}</Typography>
                <Typography variant='headline' className='margin-bottom-16'>Razão: {this.state.reason.name}</Typography>
                <Typography variant='headline' className='margin-bottom-24'>Local: {this.state.place.name}</Typography>
                <Grid container>
                  <Grid item xs={12} className='margin-bottom-24'>
                    <span id='countdown-time'>O aviso será enviado em {this.state.secondsToSend} segundos.</span>
                  </Grid>
                  <Grid item xs={12} className='txt-align-center'>
                    {
                      !this.state.sendLoading &&
                      <Button
                        className='bg-color-red txt-color-white width-perc-50 border-round'
                        variant='contained' disabled={this.state.sendLoading}
                        onClick={this.handleCancelSendWarning}>Cancelar</Button>
                    }
                    {
                      this.state.sendLoading && <CircularProgress color='secondary' size={50} id='' />
                    }
                  </Grid>
                </Grid>
              </SimpleCard>
            </div>
          }
          {
            this.state.step===3 && this.state.sendSuccess!==null && 
            <div className=''>
              <SimpleCard rounded>
                <div className='txt-align-center'>
                  {
                    this.state.sendSuccess && 
                    <div className='txt-align-center margin-bottom-16'>
                      <i className='material-icons height-rem-8 width-perc-100 txt-size-rem-10 txt-color-green'>check_circle</i>
                      <Typography variant='headline' className='margin-bottom-8'>Aviso enviado com sucesso.</Typography>
                      <Typography variant='headline'>Em breve um encarregado virá ajudar.</Typography>
                    </div>
                  }
                  {
                    !this.state.sendSuccess && 
                    <div className='txt-align-center margin-bottom-16'>
                      <i className='material-icons height-rem-8 width-perc-100 txt-size-rem-10 txt-color-red'>cancel</i>
                      <Typography variant='headline' className='margin-bottom-8'>Não foi enviado.</Typography>
                      <Typography variant='headline'>Entre em contato com um encarregado.</Typography>
                    </div>
                  }
                  <Button
                    className='heigh-rem-3 border-round width-perc-50'
                    variant='contained'
                    color='secondary'
                    component={Link} to={'/andon/logout'}>Sair</Button>
                </div>
              </SimpleCard>
            </div>
          }
          {
            this.state.step <=2 &&
            <div id=''>
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
  handleGetReasons = async () => {
    try {
      let Response = await FetchGetReasons(this.props.user.projectId);
      if(Response) {
        this.setState({
          reasons: Response
        });
      }
    } catch (err) {
      alert("Houve um erro em carregar os motivos.");
    }
  }
  handleGetPlaces = async () => {
    try {
      let Response = await FetchGetPlaces(this.props.user.projectId);
      if(Response) {
        this.setState({
          places: Response
        });
        // console.log(Response);
      }
    } catch (err) {
      alert("Houve um erro em carregar os locais.");
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
        document.getElementById('countdown-time').innerHTML = 'O aviso será enviado em '+countdownStart+' segundos.';
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
    try {
      let Result = await FetchSendWarning({
        projectId: this.props.user.projectId,
        createdBy: this.props.user.id,
        type: this.state.type,
        reasonId: this.state.reason.id,
        placeId: this.state.place.id,
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
    } catch (err) {
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