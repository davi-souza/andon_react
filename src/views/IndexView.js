import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className='ds-view' id='ds-view-index'>
        <Redirect to='/andon' />
      </div>
    );
  }
}

export default IndexView;
