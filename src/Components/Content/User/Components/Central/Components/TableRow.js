import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class TableRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.confirmResolveWarning = this.confirmResolveWarning.bind(this);
    this.cancelResolveWarning = this.cancelResolveWarning.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  confirmResolveWarning() {
    this.props.resolveWarning(this.props.warningId);
    this.setState({
      modalIsOpen: false
    });
  }

  cancelResolveWarning() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    let d1 = new Date(String(this.props.warningDate))
    let utc1 = d1.getTime() + (d1.getTimezoneOffset()*60000)
    let nd1 = new Date(utc1 + 3600000*(-6))

    let d2;
    let utc2;
    let nd2;
    if(this.props.warningResolved !== null) {
      d2 = new Date(String(this.props.warningResolved));
      utc2 = d2.getTime() + (d2.getTimezoneOffset()*60000);
      nd2 = new Date(utc2 + 3600000*(-6));
    }

    var typeField;
    if(this.props.warningResolved === null) {
      if(this.props.warningType === 'ALERTA') {
        typeField = <td className='yellow lighten-3'><b>ALERTA</b></td>;
      }
      else if(this.props.warningType === 'PARADO') {
        typeField = <td className='red lighten-3'><b>PARADO</b></td>
      }
    }
    else{
      typeField = <td className='green lighten-3'><b>{this.props.warningType}</b></td>
    }

    let idName = 'centralWarningRow'+this.props.warningId;

    return (
      <tr id={idName}>
        {typeField}
        <td>{this.props.warningReason}</td>
        <td>{this.props.warningWhere}</td>
        <td>{nd1.toLocaleString('pt-BR',{timeZone:'UTC'})}</td>
        <td>{this.props.warningWho}</td>
        {this.props.warningResolved === null &&
          <td></td>
        }
        {this.props.warningResolved === null &&
          <td><button className='btn green' onClick={this.openModal}>
            <i className='material-icons'>done</i>
          </button></td>
        }
        {this.props.warningResolved !== null &&
          <td>{nd2.toLocaleString('pt-BR',{timeZone:'UTC'})}</td>
        }
        {this.props.warningResolved !== null &&
          <td></td>
        }
        <Modal isOpen={this.state.modalIsOpen} contentLabel='Test' style={customStyles}>
          <nav className='indigo'>
            <div className='nav-wrapper'>
              <a className='brand-logo center'>AVISO {this.props.warningId}</a>
            </div>
          </nav>
          <div className='container'>
            <div className='row'>
              <div className='col s12'>
                <h5>Por favor, confirmar que aviso foi resolvido com sucesso!</h5>
              </div>
            </div>
            <div className='row'>
              <div className='col s6'>
                <button className='btn green' onClick={this.confirmResolveWarning}>RESOLVER</button>
              </div>
              <div className='col s6'>
                <button className='btn red' onClick={this.cancelResolveWarning}>CANCELAR</button>
              </div>
            </div>
          </div>
        </Modal>
      </tr>
    );
  }
}

export default TableRow;
