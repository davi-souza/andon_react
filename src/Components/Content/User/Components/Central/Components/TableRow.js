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
    var typeField;
    if(this.props.warningResolved === '') {
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
    return (
      <tr>
        {typeField}
        <td>{this.props.warningReason}</td>
        <td>{this.props.warningWhere}</td>
        <td>{this.props.warningDate}</td>
        <td>{this.props.warningWho}</td>
        {this.props.warningResolved === '' &&
          <td></td>
        }
        {this.props.warningResolved === '' &&
          <td><button className='btn green' onClick={this.openModal}>
            <i className='material-icons'>done</i>
          </button></td>
        }
        {this.props.warningResolved !== '' &&
          <td>{this.props.warningResolved}</td>
        }
        {this.props.warningResolved !== '' &&
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
