import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralTeamsAddAddContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <div>
        <AppBarComponent
          title='Central - Times - Adicionar'
          position='fixed'
          drawerLinks={[
            {name:'Gerenciar Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Gerenciar Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Gerenciar Times',to:'/andon/central/teams',icon:'people'},
            {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
          ]}  
        />
        <GridPage viewContent appBarFixed>
          <SimpleCard rounded>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  className='w-100 margin-bottom-20'
                  name='name'
                  label='Nome do time'
                  placeholder='Nome do time'
                  value={this.state.name}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12} className='txt-align-center'>
                {
                  this.props.central.loadingAddUser &&
                  <CircularProgress className='margin-top-10' size={40} color='secondary' />
                }
                {
                  !this.props.central.loadingAddUser && 
                  <Button
                    disabled={this.state.name===''}
                    variant='contained'
                    color='secondary'
                    className='w-60 margin-top-10 border-round'
                    onClick={this.HandleAddTeam}
                  >Criar</Button>
                }
              </Grid>
            </Grid>
          </SimpleCard>
        </GridPage>
      </div>
    );
  }
  HandleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  HandleAddTeam = () => {
    if(window.confirm('Deseja criar time?')) {
      this.props.central.addTeam(this.state);
      this.props.history.push('/andon/central/teams');
    }
  }
}

const AndonCentralTeamsAddAdd = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralTeamsAddAddContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default AndonCentralTeamsAddAdd;