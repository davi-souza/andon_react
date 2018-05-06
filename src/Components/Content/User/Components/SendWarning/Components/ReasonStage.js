import React, { Component } from 'react';

class ReasonStage extends Component {

  constructor(props) {
    super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(reason) {
    this.props.changeReason(reason);
    this.props.changeStage(2);
  }

  render() {
    return (
      <div className='container'>
        <button className='btn black reason-button' onClick={()=>this.buttonClick('EQUIPAMENTO')}>EQUIPAMENTO</button>
        <button className='btn brown darken-2 reason-button' onClick={()=>this.buttonClick('MATERIAL')}>MATERIAL</button>
        <button className='btn green darken-4 reason-button' onClick={()=>this.buttonClick('MÃO-DE-OBRA')}>MÃO-DE-OBRA</button>
        <button className='btn light-blue darken-4 reason-button' onClick={()=>this.buttonClick('PROJETO')}>PROJETO</button>
        <button className='btn red darken-4 reason-button' onClick={()=>this.buttonClick('SEGURANÇA')}>SEGURANÇA</button>
      </div>
    );
  }
}

export default ReasonStage;
