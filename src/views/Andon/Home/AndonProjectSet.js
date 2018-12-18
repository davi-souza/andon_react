import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Container from '../../../components/Grid/Container';
import Appbar from '../../../components/Appbar/Appbar';

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
        <Appbar
          position='fixed'
          title='ANDON'
          toolbarLinks={[
            {to:'/andon',name:'Painel',icon:'dialpad'},
            {to:'/andon/login',name:'Log In',icon:'person'},
          ]}
        />
        <Container appbarFixed>
          <Paper className="padding-24">
            <Grid container className='margin-bottom-24 txt-align-center'>
              <Grid item xs={12} className="txt-align-center">
                <Typography variant="display2">ID do projeto</Typography>
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
          </Paper>
        </Container>
      </div>
    );
  }
}

export default AndonProjectSet;