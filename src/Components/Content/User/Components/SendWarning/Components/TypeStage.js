import React, { Component } from 'react';

class TypeStage extends Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(type) {
    this.props.changeType(type);
    this.props.changeStage(1);
  }

  render() {
    return (
      <div className='container'>
        <button className='btn yellow type-button' onClick={()=>this.buttonClick('ALERTA')}>ALERTA</button>
        <button className='btn red type-button' onClick={()=>this.buttonClick('PARADO')}>PARADO</button>
      </div>
    );
  }
}

export default TypeStage;
