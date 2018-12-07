import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import AppBarComponent from '../../../../components/Appbar/AppBarComponent';
import SimpleCard from "../../../../components/Card/SimpleCard";
import FullGridPage from '../../../../components/Grid/FullGridPage';
import SelectTable from "../../../../components/Table/SelectTable";

import UserContext from "../../../../contexts/UserContext";
import CentralContext from "../../../../contexts/CentralContext";

class AddMember extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let name = "Intermediate One";
    return (
      <div>
        <AppBarComponent
          title='Central - Times'
          position='fixed'
          drawerLinks={[
            {name:'Gerenciar Avisos',to:'/andon/central/warnings',icon:'warning'},
            {name:'Gerenciar Usuários',to:'/andon/central/users',icon:'person'},
            {name:'Gerenciar Times',to:'/andon/central/teams',icon:'people'},
            {name:'Painel de Controle',to:'/andon/central/dashboard',icon:'show_chart'},
            {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
          ]}  
        />
        <FullGridPage viewContent appBarFixed>
          <CentralContext.Consumer>
            {central => (
              <SelectTable
                // tableHead={}
                data={central.leafUsers.filter(user => user.level === "leaf")}
              />
            )}
          </CentralContext.Consumer>
        </FullGridPage>
      </div>
    );
  }

  nadaAVer = (leafusers) => {
    console.log(leafusers);
  }
}

export default AddMember;