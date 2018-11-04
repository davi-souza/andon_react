import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import FullGridPage from '../../../components/Grid/FullGridPage';
import WarningTable from '../../../components/Views/Central/WarningTable';

import CentralContext from '../../../contexts/CentralContext';

class AndonCentralWarningsContext extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldToFilter: 'type',
      filterValue: '',
      createdDateInit: '',
      createdDateEnd: '',
    }
  }
  render() {
    let filterRegex = new RegExp(`[a-zA-Z0-9 ]*${this.state.filterValue.toLowerCase()}[a-zA-Z0-9 ]*`);
    return (
      <div>
        <AppBarComponent
          title='Central - Avisos'
          position='fixed'
          drawerLinks={[
            {name:'Gerenciar Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Gerenciar Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Gerenciar Times',to:'/andon/central/teams',icon:'people'},
            {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
          ]}  
        />
        <FullGridPage viewContent appBarFixed>
          <Paper className='margin-bottom-8 padding-top-8 padding-bottom-8'>
            <Grid container>
              <Grid item xs={12} md={6} className='txt-align-center margin-bottom-8'>
                <TextField
                  name='createdDateInit'
                  className='width-perc-60'
                  label="Criado em (inicío)"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.createdDateInit}
                  onChange={this.HandleDateChange}
                />
              </Grid>
              <Grid item xs={12} md={6} className='txt-align-center margin-bottom-8'>
                <TextField
                  name='createdDateEnd'
                  className='width-perc-60'
                  label="Criado em (fim)"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={this.state.createdDateEnd}
                  onChange={this.HandleDateChange}
                />
              </Grid>
              <Grid item xs={4} className='txt-align-center margin-bottom-8'>
                  <TextField
                    className='width-perc-90'
                    select
                    label='Campo'
                    placeholder='Campo'
                    value={this.state.fieldToFilter}
                    onChange={this.HandleFieldFilterChange}
                  >
                    <option value='type'>Tipo</option>
                    <option value='reasonName'>Motivo</option>
                    <option value='placeName'>Local</option>
                    <option value='userThatCreated'>Autor</option>
                  </TextField>
              </Grid>
              <Grid item xs={8} className='txt-align-center margin-bottom-8'>
                  <TextField
                    className='width-perc-90'
                    label='Filtro'
                    placeholder='Filtro'
                    value={this.state.filterValue}
                    onChange={this.HandleFilterValue}
                  />
              </Grid>
            </Grid>
          </Paper>
          {
            this.props.central.loadingWarnings && 
            <div className='txt-align-center'>
              <CircularProgress color='secondary' size={60} />
            </div>
          }
          {
            !this.props.central.loadingWarnings &&
            <WarningTable
              data={this.props.central.warnings.sort(this.sortWarnings).filter(this.filterWarningsByDate).filter(this.filterWarningByField)}
              resolveWarning={this.props.central.resolveWarning}
            />
          }
        </FullGridPage>
      </div>
    );
  }

  sortWarnings = (a,b) => (a,b) => {
    if(a.createdDate > b.createdDate) {
      return -1;
    } else if (a.createdDate < b.createdDate) {
      return 1;
    }
    return 0;
  }
  
  filterWarningsByDate = warning => {
    let initFilterDate = null;
    let initDate = null
    if(this.state.createdDateInit!=='') {
      initFilterDate = this.state.createdDateInit.split("-");
      initDate = new Date(parseInt(initFilterDate[0],10),parseInt(initFilterDate[1],10)-1,parseInt(initFilterDate[2],10),0,0,0,0);
    }
    let endFilterDate = null;
    let endDate = null;
    if(this.state.createdDateEnd!=='') {
      endFilterDate = this.state.createdDateEnd.split("-");
      endDate = new Date(parseInt(endFilterDate[0],10),parseInt(endFilterDate[1],10)-1,parseInt(endFilterDate[2],10),23,59,59,999);
    }
    if(initDate && endDate) {
      let createdDate = new Date(warning.createdDate);
      if(createdDate.getTime() < initDate.getTime()) {
        return false;
      }
      if(createdDate.getTime() > endDate.getTime()) {
        return false;
      }
    }
    return true;
  }

  filterWarningByField = warning => {
    // let filterRegex = //
    if (this.state.fieldToFilter === '') {
      return true;
    } else {
      if(this.state.fieldToFilter === 'reasonName') {
        return filterRegex.test(warning.reason.name.toLowerCase());
      } else if(this.state.fieldToFilter === 'placeName') {
        return filterRegex.test(warning.place.name.toLowerCase());
      } else if(this.state.fieldToFilter === 'userThatCreated') {
        return filterRegex.test(`${warning.userThatCreated.firstname} ${warning.userThatCreated.lastname}`.toLowerCase());
      } else  {
        return filterRegex.test(warning.type.toLowerCase());
      }
    }
  }

  HandleFieldFilterChange = (event) => {
    this.setState({
      fieldToFilter: event.target.value,
    });
  }
  HandleFilterValue = (event) => {
    this.setState({
      filterValue: event.target.value,
    });
  }
  HandleDateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
}

const AndonCentralWarnings = (props) => {
  return (
    <CentralContext.Consumer>
      {central => <AndonCentralWarningsContext central={central} {...props} />}
    </CentralContext.Consumer>
  )
}

export default AndonCentralWarnings;