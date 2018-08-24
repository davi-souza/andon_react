import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import GridPage from '../../components/Grid/GridPage';
import AppBarComponent from '../../components/Appbar/AppBarComponent';
import NumberPanel from '../../components/Panel/NumberPanel';

class AndonHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberPanelValue: '',
    };
  }
  handleNumberPanelButtonClick = (n) => {
    if(this.state.numberPanelValue === '' && n === 0) {
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
  render() {
    let buttonsHeight = 5.5;
    let style = {
      loginButton: {
        width:'90%',
        height:String(buttonsHeight-1.5)+'rem',
        backgroundColor: '#4CAF50',
        letterSpacing: '0.1rem',
      },
      eraseButton: {
        width:'90%',
        height:String(buttonsHeight-1.5)+'rem',
        backgroundColor: '#f44336',
        letterSpacing: '0.1rem',
      }
    }
    return (
      <div className='ds-view' id='ds-view-test'>
        <AppBarComponent position='fixed' title='ANDON' drawerLinks={[{to:'/',name:'Sair',icon:'exit_to_app'}]}/>
        <GridPage viewContent appBarFixed>
          <div style={{height:'5rem',textAlign:'center'}}>
            <Typography variant='display3'>{this.state.numberPanelValue}</Typography>
          </div>
          <Grid container style={{margin: '0.5rem auto'}}>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Button disabled={this.state.numberPanelValue===''} variant='contained' onClick={()=>{this.props.history.push('/andon/warning/send')}} style={style.loginButton}>entrar</Button>
            </Grid>
            <Grid item xs={6} style={{textAlign:'center'}}>
              <Button disabled={this.state.numberPanelValue===''} variant='contained' onClick={this.handleEraseNumber} style={style.eraseButton}>apagar</Button>
            </Grid>
          </Grid>
          <NumberPanel buttonClick={this.handleNumberPanelButtonClick} size={buttonsHeight} color='dark'/>
        </GridPage>
      </div>
    );
  }
}

export default AndonHome;