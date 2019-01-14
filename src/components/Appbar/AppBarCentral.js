import React from 'react';
import AppBarComponent from './AppBarComponent';

export default (props) => (
  <AppBarComponent
    title={props.title}
    position='fixed'
    drawerLinks={[
      {name:'Histórico de Avisos',to:'/andon/central/warnings/all',icon:'warning'},
      {name:'Avisos correntes',to:'/andon/central/warnings',icon:'warning'},
      {name:'Usuários',to:'/andon/central/users',icon:'person'},
      {name:'Times',to:'/andon/central/teams',icon:'people'},
      {name:'Locais',to:'/andon/central/places',icon:'place'},
      {name:'Dashboard',to:'/andon/central/dashboard',icon:'show_chart'},
      {name:'Log Out',to:'/andon/logout',icon:'exit_to_app',divider:true}
    ]}  
  />
);