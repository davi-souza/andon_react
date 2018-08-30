import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import GridPage from '../components/Grid/GridPage';
import AppBarComponent from '../components/Appbar/AppBarComponent';

class TestView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='ds-view' id='ds-view-test'>
        <AppBarComponent position='static' />
        <GridPage viewContent>
          <Link to='/andon'>andon</Link>
        </GridPage>
      </div>
    );
  }
}

export default TestView;