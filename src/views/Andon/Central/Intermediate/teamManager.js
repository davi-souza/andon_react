import React, { Component } from "react";
import AppBarComponent from '../../../../components/Appbar/AppBarComponent';
import Container from '../../../../components/Grid/Container';
import SelectTable from "../../../../components/Table/SelectTable";
import CentralContext from "../../../../contexts/CentralContext";

class teamManager extends Component {
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
            {name:'Avisos correntes',to:'/andon/central/warnings',icon:'warning'},
            {name:'Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Times',to:'/andon/central/teams',icon:'people'},
            {name:'Dashboard',to:'/andon/central/dashboard',icon:'show_chart'},
            {name:'Log Out',to:'/andon/logout',icon:'exit_to_app',divider:true}
          ]}  
        />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <SelectTable
                teamLeader={central.intermediateUsers.find(user => user.id === parseInt(this.props.match.params.id,10))}
                leafUsers={central.leafUsers.filter(user => user.level === "leaf")}
                loadingTeamUpdate={central.loadingTeamUpdate}
                addTeamMember={central.addTeamMember}
                removeTeamMember={central.removeTeamMember}
              />
            )}
          </CentralContext.Consumer>
        </Container>
      </div>
    );
  }

  nadaAVer = (leafusers) => {
    console.log(leafusers);
  }
}

export default teamManager;