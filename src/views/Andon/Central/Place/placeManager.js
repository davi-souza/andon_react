import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AppBarCentral from '../../../../components/Appbar/AppBarCentral';
import Container from '../../../../components/Grid/Container';
import PlaceTable from "../../../../components/Table/Andon/Central/PlaceTable";
import CentralContext from "../../../../contexts/CentralContext";

class placeManager extends Component {
  constructor(props) {
    super(props);
    super(props);
    this.state = {
      anchorEl: null,
    };
  }
  handleMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  }
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  }
  render() {
    return (
      <div>
        <AppBarCentral />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <PlaceTable
                places={central.places.sort((a,b) => {
                  if(a.id <= b.id) {
                    return -1;
                  }
                  return 1;
                })}
                {...this.props}
              />
            )}
          </CentralContext.Consumer>
        </Container>
        <Button className='corner-right-bottom' variant='fab' color='secondary' onClick={this.handleMenuOpen}>
          <i className='material-icons'>add</i>
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleMenuClose} component={Link} to='/andon/central/places/add'>Adicionar local</MenuItem>
        </Menu>
      </div>
    );
  }

}

export default placeManager;