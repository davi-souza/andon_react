import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralUsersAddContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      firstname: '',
      lastname: '',
      jobTitle: '',
      password: ''
    };
  }
  render() {
    return (
      <div>
        <AppBarComponent
          title='Central - Usuários - Adicionar'
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
                  name='login'
                  label='Matrícula'
                  placeholder='Matrícula'
                  value={this.state.login}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  className='w-100 margin-bottom-20'
                  name='firstname'
                  label='Primeiro Nome'
                  placeholder='Primeiro Nome'
                  value={this.state.firstname}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  className='w-100 margin-bottom-20'
                  name='lastname'
                  label='Sobrenome'
                  placeholder='Sobrenome'
                  value={this.state.lastname}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='w-100 margin-bottom-20'
                  name='password'
                  label='Senha'
                  placeholder='Senha'
                  value={this.state.password}
                  onChange={this.HandleFormChange}
                  helperText='Deixe este campo vazio se este usuário apenas enviará avisos'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='w-100 margin-bottom-20'
                  name='jobTitle'
                  label='Título'
                  placeholder='Título'
                  value={this.state.jobTitle}
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
                    disabled={this.state.login==='' || this.state.firstname==='' || this.state.lastname===''}
                    variant='contained'
                    color='secondary'
                    className='w-60 margin-top-10 border-round'
                    onClick={this.HandleAddUser}
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
  HandleAddUser = () => {
    if(window.confirm('Deseja criar usuário?')) {
      this.props.central.addUser(this.state);
      this.props.history.push('/andon/central/users');
    }
  }
}

const AndonCentralUsersAdd = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralUsersAddContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default AndonCentralUsersAdd;