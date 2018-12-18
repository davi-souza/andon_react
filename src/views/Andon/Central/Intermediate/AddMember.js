import React, { Component } from "react";
import Appbar from '../../../../components/Appbar/Appbar';
import Container from '../../../../components/Grid/Container';
import SelectTable from "../../../../components/Table/SelectTable";
import CentralContext from "../../../../contexts/CentralContext";

class AddMember extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Appbar
          title='Gerenciar Equipe'
          position='fixed'
          toolbarLinks={[
            {name:'Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Times',to:'/andon/central/teams',icon:'people'},
            {name:'Dashboard',to:'/andon/central/dashboard',icon:'show_chart'},
            {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
          ]}  
        />
        <Container appbarFixed>
          <CentralContext.Consumer>
            {central => (
              <SelectTable
                teamLeader={central.intermediateUsers.find(user => user.id == this.props.match.params.id)}
                leafUsers={central.leafUsers.filter(user => user.level === "leaf")}
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

export default AddMember;