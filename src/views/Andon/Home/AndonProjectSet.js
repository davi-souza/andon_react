import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import GridPage from '../../../components/Grid/GridPage';
import SimpleCard from '../../../components/Card/SimpleCard';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';

import { setProjectId } from "../../../localStorage/projectId";

class AndonProjectSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      projectId: event.target.value,
    });
  }

  handleSetProjectId = () => {
    setProjectId(this.state.projectId);
    this.props.history.push("/andon");
  }

  render() {
    return (
      <div>
        <AppBarComponent
          position='fixed'
          title='ANDON'
          drawerLinks={[
            {to:'/andon',name:'Painel',icon:'dialpad'},
            {to:'/andon/login',name:'Log In',icon:'person'},
            {to:'/andon/project/set',name:'Projeto',icon:'edit',divider:true},
          ]}
        />
        <GridPage viewContent appBarFixed>
          <SimpleCard rounded>
            <Grid container className='margin-bottom-24 txt-align-center'>
              <Grid item xs={12} className="txt-align-center">
                <Typography variant="display2">Insira o ID do seu projeto</Typography>
              </Grid>
              <Grid item xs={12} className="txt-align-center margin-top-24">
                <TextField
                  className="width-perc-80"
                  type="number"
                  label="ID do Projeto"
                  placeholder="ID do Projeto"
                  id="andon-set-project-id-input"
                  value={this.state.projectId}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} className="txt-align-center margin-top-24">
                <Button
                  className="width-perc-50 border-round"
                  color="secondary"
                  variant="contained"
                  onClick={this.handleSetProjectId}
                >Inserir</Button>
              </Grid>
            </Grid>
          </SimpleCard>
        </GridPage>
      </div>
    );
  }
}

export default AndonProjectSet;