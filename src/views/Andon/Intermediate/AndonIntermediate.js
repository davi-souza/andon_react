import React, {Component} from 'react';

import GridPage from '../../../components/Grid/GridPage';
import AppBarComponent from '../../../components/Appbar/AppBarComponent';
import WarningsView from '../../../components/Views/Intermediate/WarningsView'

class AndonIntermediate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: [
        {id:1,type:'ALERTA',reason:'REASON I',where:'PLACE M',user:{name:'Fulano'},when:new Date(2018,8,20)},
        {id:2,type:'PARADO',reason:'REASON J',where:'PLACE N',user:{name:'Sicrano'},when:new Date(2018,8,23)},
        {id:3,type:'ALERTA',reason:'REASON J',where:'PLACE N',user:{name:'Sicrano'},when:new Date(2018,8,23)},
        {id:4,type:'PARADO',reason:'REASON J',where:'PLACE N',user:{name:'Sicrano'},when:new Date(2018,8,23)},
        {id:5,type:'ALERTA',reason:'REASON J',where:'PLACE N',user:{name:'Sicrano'},when:new Date(2018,8,23)},
        {id:6,type:'PARADO',reason:'REASON J',where:'PLACE N',user:{name:'Sicrano'},when:new Date(2018,8,23)},
      ],
    };
  }
  render() {
    return (
      <div>
        <AppBarComponent position='fixed' toolbarLinks={[{name:'Sair',to:'/andon',icon:'exit_to_app'}]}/>
        <GridPage viewContent appBarFixed>
          <WarningsView warnings={this.state.warnings} />
        </GridPage>
      </div>
    );
  }
}

export default AndonIntermediate;