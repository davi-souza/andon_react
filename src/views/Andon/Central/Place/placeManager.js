import React, { Component } from "react";
import AppBarComponent from '../../../../components/Appbar/AppBarComponent';
import Container from '../../../../components/Grid/Container';
import PlaceTable from "../../../../components/Table/Andon/Central/PlaceTable";
import CentralContext from "../../../../contexts/CentralContext";

class placeManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBarComponent
          title='ANDON'
          position='fixed'
          drawerLinks={[
            {name:'Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Times',to:'/andon/central/teams',icon:'people'},
            {name:'Dashboard',to:'/andon/central/dashboard',icon:'show_chart'},
            {name:'Log Out',to:'/andon/logout',icon:'exit_to_app',divider:true}
          ]}  
        />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <PlaceTable
                places={central.places}
              />
            )}
          </CentralContext.Consumer>
        </Container>
      </div>
    );
  }

}

export default placeManager;