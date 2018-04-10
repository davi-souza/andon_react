import React, { Component } from 'react';
import BreadCrumb from './Components/BreadCrumb';
import TypeStage from './Components/TypeStage';
import ReasonStage from './Components/ReasonStage';
import WhereStage from './Components/WhereStage';
import SendStage from './Components/SendStage';

import './Style/Warning.css';

class WarningContent extends Component {
  constructor(props) {
    super(props);
    // stage 0: type
    // stage 1: reason
    // stage 2: where
    // stage 3: review and send
    this.state = {
      stage: 0,
      type: "",
      reason: "",
      where: "",
      who: ""
    };
    this.changeStage = this.changeStage.bind(this);
    this.changeType = this.changeType.bind(this);
    this.changeReason = this.changeReason.bind(this);
    this.changeWhere = this.changeWhere.bind(this);
    this.sendWarning = this.sendWarning.bind(this);
  }

  changeStage(nextStage) {
    this.setState({
      stage: nextStage
    });
  }

  changeType(nextType) {
    this.setState({
      type: nextType
    });
  }

  changeReason(nextReason) {
    this.setState({
      reason: nextReason
    });
  }

  changeWhere(nextWhere) {
    this.setState({
      where: nextWhere
    });
  }

  changeWho(nextWho) {
    this.setState({
      who: nextWho
    });
  }

  sendWarning() {
    alert('SEND WARNING');
  }

  render() {
    return (
      <div>
        <BreadCrumb warningStage={this.state.stage} changeStage={this.changeStage} />
        {this.state.stage === 0 &&
          <TypeStage changeType={this.changeType} changeStage={this.changeStage} />
        }
        {this.state.stage === 1 &&
          <ReasonStage changeReason={this.changeReason} changeStage={this.changeStage} />
        }
        {this.state.stage === 2 &&
          <WhereStage changeWhere={this.changeWhere} changeStage={this.changeStage} />
        }
        {this.state.stage === 3 &&
          <SendStage state={this.state} sendWarning={this.sendWarning} />
        }
      </div>
    );
  }
}

export default WarningContent;
