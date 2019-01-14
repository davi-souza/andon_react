import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarCentral from '../../../../components/Appbar/AppBarCentral';
import Container from '../../../../components/Grid/Container';
import SimplePaper from '../../../../components/Paper/SimplePaper';

import CentralContext from '../../../../contexts/CentralContext';

class UserAddContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      firstname: '',
      lastname: '',
      jobTitle: '',
      level: 'leaf',
      password: ''
    };
  }
  render() {
    return (
      <div>
        <AppBarCentral />
        <Container appbarFixed>
          <SimplePaper paperTitle="Adicionar usuário" padding="2">
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  required
                  className='width-perc-100 margin-bottom-24'
                  name='login'
                  label='Matrícula'
                  placeholder='Matrícula'
                  value={this.state.login}
                  onChange={this.HandleFormChange}
                  helperText='Deve ser numérica'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  className='width-perc-100 margin-bottom-24'
                  name='firstname'
                  label='Primeiro nome'
                  placeholder='Primeiro nome'
                  value={this.state.name}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  className='width-perc-100 margin-bottom-24'
                  name='lastname'
                  label='Sobrenome'
                  placeholder='Sobrenome'
                  value={this.state.name}
                  onChange={this.HandleFormChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  select
                  className='width-perc-100 margin-bottom-24'
                  name='level'
                  label='Nível de Acesso'
                  placeholder='Nível de Acesso'
                  value={this.state.level}
                  onChange={this.HandleFormChange}
                >
                  <option value={'leaf'}>0 - Envia avisos</option>
                  <option value={'intermediate'}>1 - Recebe avisos</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='width-perc-100 margin-bottom-24'
                  name='password'
                  label='Senha'
                  placeholder='Senha'
                  value={this.state.password}
                  onChange={this.HandleFormChange}
                  disabled={this.state.level==='leaf'}
                  helperText='Deixe este campo vazio se este usuário apenas enviará avisos'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className='width-perc-100 margin-bottom-24'
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
                    className='width-perc-60 margin-top-8 border-round'
                    onClick={this.HandleAddUser}
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
  HandleAddUser = () => {
    if(this.state.level === 'leaf' && this.state.password !== '') {
      this.setState({
        password: '',
      });
    }
    if(window.confirm('Deseja criar usuário?')) {
      this.props.central.addUser(this.state);
    }
  }
}

const UserAdd = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <UserAddContext central={central} {...props} />}
    </CentralContext.Consumer>
  );
}

export default UserAdd;