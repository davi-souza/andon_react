import React, {Component} from 'react';
import GridPage from '../components/Grid/GridPage';
import AppBarComponent from '../components/Appbar/AppBarComponent';
import SimpleCard from '../components/Card/SimpleCard';

class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='ds-view' id='ds-view-index'>
        <AppBarComponent
          title='Dev'
          position='static'
          drawerLinks={[{name:'Andon',to:'/andon',icon:'info'}]}
        />
        <GridPage viewContent>
          <SimpleCard rounded centered>
            hi
          </SimpleCard>
        </GridPage>
      </div>
    );
  }
}

export default IndexView;