import React, { Component } from 'react';

class SendStage extends Component {

  constructor(props) {
    super(props);
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    let interval = null;
    let seconds = 5;
    interval = setInterval(() => {
      seconds = seconds - 1;
      if(seconds === -1) {
        this.props.sendWarning();
        clearInterval(interval);
      }
      else{
        document.getElementById('warning-sendstage-timer').innerText = seconds.toString();
      }
    },1000);
  }

  componentDidMount() {
    let existingScript = document.getElementById('collapsible');
    if(typeof(existingScript) !== 'undefined' && existingScript !== null) {
      document.body.removeChild(existingScript);
    }
    this.countDown();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <h4><b>Informações do Aviso</b></h4>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <div className='text-align-left'>
              <h5><b>Tipo:</b> {this.props.state.type}</h5>
              <h5><b>Motivo:</b> {this.props.state.reason}</h5>
              <h5><b>Onde:</b> {this.props.state.where}</h5>
              <h5><b>Quem:</b> {this.props.state.who.name} ({this.props.state.who.id})</h5>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <h6>Aviso será enviado em <b id='warning-sendstage-timer'>5</b> segundos</h6>
          </div>
        </div>
    </div>
    );
  }
}

export default SendStage;
