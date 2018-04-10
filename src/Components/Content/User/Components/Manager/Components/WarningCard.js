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

class WarningCard extends Component {
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
    return (
      <div className='col s12 m6 l4'>
        <div className='card'>
          <div className='card-content'>
            {this.props.warningType === 'ALERTA' &&
              <span className='card-title yellow'>Aviso {this.props.warningId}</span>
            }
            {this.props.warningType === 'PARADO' &&
              <span className='card-title red white-text'>Aviso {this.props.warningId}</span>
            }
            <div className='container user-manager-warningcard-info'>
              <p><b>Tipo:</b> {this.props.warningType}</p>
              <p><b>Motivo:</b> {this.props.warningReason}</p>
              <p><b>Onde:</b> {this.props.warningWhere}</p>
              <p><b>Quem:</b> {this.props.warningWho}</p>
              <p><b>Quando:</b> {this.props.warningDate}</p>
            </div>
            <button className='btn green user-manager-resolve' onClick={this.openModal}>RESOLVER</button>
          </div>
        </div>
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
      </div>
    );
  }
}

export default WarningCard;
