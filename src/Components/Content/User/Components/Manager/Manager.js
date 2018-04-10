import React, { Component } from 'react';
import WarningCard from './Components/WarningCard';
import Loader from '../Loader';

class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: []
    };
    this.getWarnings = this.getWarnings.bind(this);
    this.resolveWarning = this.resolveWarning.bind(this);
  }

  getWarnings() {
    fetch('/warning').then(res => {
      console.log(res);
    });
  }

  resolveWarning(warningId) {
    console.log(warningId);
  }

  componentDidMount() {
    this.getWarnings();
  }

  render() {
    return (
      <div className='container row'>
        {this.state.warnings.length === 0 &&
          <Loader />
        }
        {this.state.warnings.map((warning,index) =>
          <WarningCard
            resolveWarning={this.resolveWarning}
            warningId={warning.id}
            warningType={warning.type}
            warningReason={warning.reason}
            warningWhere={warning.where}
            warningDate={warning.date}
            warningWho={warning.who}
            key={warning.id}/>
        )}
      </div>
    );
  }
}

export default Manager;
