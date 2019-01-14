import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarCentral from '../../../../components/Appbar/AppBarCentral';
import Container from '../../../../components/Grid/Container';
import SimplePaper from '../../../../components/Paper/SimplePaper';

import CentralContext from '../../../../contexts/CentralContext';

class PlaceAddContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <div>
        <AppBarCentral />
        <Container appbarFixed>
          <SimplePaper paperTitle="Adicionar local" padding="2">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  className='width-perc-100 margin-bottom-24'
                  name='name'
                  label='Nome do local'
                  placeholder='Nome local'
                  value={this.state.name}
                  onChange={this.HandleFormChange}
                  helperText='Insira o nome do local.'
                />
              </Grid>
              <Grid item xs={12} className='txt-align-center'>
                {
                  this.props.central.addPlaceLoading &&
                  <CircularProgress className='margin-top-10' size={40} color='secondary' />
                }
                {
                  !this.props.central.addPlaceLoading &&
                  <Button
                    disabled={this.state.name===''}
                    variant='contained'
                    color='secondary'
                    className='width-perc-60 margin-top-8 border-round'
                    onClick={this.HandleAddPlace}
                  >Criar</Button>
                }
              </Grid>
            </Grid>
          </SimplePaper>
        </Container>
      </div>
    );
  }
  HandleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  HandleAddPlace = () => {
    if(window.confirm('Deseja criar local?')) {
      this.props.central.addPlace(this.state.name);
    }
  }
}

const PlaceAdd = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <PlaceAddContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default PlaceAdd;