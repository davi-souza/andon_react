import React, { Component } from 'react';
import BreadCrumb from './Components/BreadCrumb';
import TypeStage from './Components/TypeStage';
import ReasonStage from './Components/ReasonStage';
import WhereStage from './Components/WhereStage';
import SendStage from './Components/SendStage';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import './Style/Warning.css';

class SendWarning extends Component {
  constructor(props) {
    super(props);
    // stage 0: type
    // stage 1: reason
    // stage 2: where
    // stage 3: review and send
    // stage 4: after trying to send
    this.state = {
      stage: 0,
      type: "",
      reason: "",
      where: "",
      who: {
        id: this.props.userId,
        name: this.props.userName
      },
      sendWarningMessages: []
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
    fetch('/api/warning/createWarning',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        type: this.state.type,
        reason: this.state.reason,
        where: this.state.where,
        login: this.state.who.id
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            toast.success("Aviso enviado!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
            this.setState({
              sendWarningMessages: [
                'Aviso enviado com sucesso!',
                'Em breve seu problema será resolvido.'
              ]
            });
          }
          else {
            toast.error("Aviso não enviado!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
            this.setState({
              sendWarningMessages: [
                'Aviso não enviado!',
                'Tente novamente ou entre em contato com um responsável.'
              ]
            });
          }
          this.setState({
            stage: 4
          });
        });
      }
    }).catch(err => {
      toast.error("Erro!",{
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true
      });
      this.setState({
        sendWarningMessages: [
          'Erro!',
          'Tente novamente ou entre em contato com um responsável.'
        ]
      });
      this.setState({
        stage: 4
      });
    });
  }

  render() {
    var finalStageStyle = {
      textAlign: 'center'
    }
    return (
      <div>
        {this.state.stage < 4 &&
          <BreadCrumb warningStage={this.state.stage} changeStage={this.changeStage} />
        }
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
        {this.state.stage === 4 &&
          <div style={finalStageStyle}>
            <h2>{this.state.sendWarningMessages[0]}</h2>
            <h3>{this.state.sendWarningMessages[1]}</h3>
            <Link to='/logout' className='btn green'>VOLTAR</Link>
          </div>
        }
        <ToastContainer />
      </div>
    );
  }
}

export default SendWarning;
