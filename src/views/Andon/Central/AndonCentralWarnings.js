import React from 'react';

import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import GridPage from '../../../components/Grid/GridPage';

const AndonCentralWarnings = (props) => {
  return (
    <div>
      <AppBarComponent
        title='Central'
        position='fixed'
        drawerLinks={[
          {name:'Gerenciar Avisos',to:'/andon/central/warnings',icon:'warning'},
          {name:'Gerenciar Usuários',to:'/andon/central/users',icon:'person'},
          {name:'Gerenciar Times',to:'/andon/central/teams',icon:'people'},
          {to:'/andon/logout',name:'Log Out',icon:'exit_to_app',divider:true}
        ]}  
      />
      <GridPage viewContent appBarFixed>
        <h1>under construction</h1>
      </GridPage>
    </div>
  );
}

export default AndonCentralWarnings;