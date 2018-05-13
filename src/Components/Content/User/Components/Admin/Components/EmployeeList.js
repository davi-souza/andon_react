import React, { Component } from 'react';
import Loader from './Loader';
import Modal from 'react-modal';
import { ToastContainer,toast } from 'react-toastify';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    // height                : '90vh',
    width                 : '90vw',
  }
};

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesArrayLoaded: false,
      employeesArray: [],
      employeeToDelete: {},
      modalIsOpen: false,
    };
  }

  getEmployeesArray = () => {
    fetch('/user/getAllUsers',{
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1){
            this.setState({
              employeesArrayLoaded: true,
            });
            this.handleEmployeesArray(resJson.content)
          }
        });
      }
    });
  }

  handleEmployeesArray = (employeesArray) => {
    this.setState({
      employeesArray: employeesArray
    });
  }

  handleEmployeeDelete = (employee) => {
    if(employee.access_level >= 4) {
      toast.error("Não é possível deletar esta matrícula!",{
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true
      });
    }
    else {
      this.setState({
        employeeToDelete: employee,
        modalIsOpen: true,
      });
    }
  }

  confirmDeleteEmployee = () => {
    console.log(this.state.employeeToDelete.login);

    fetch('/user/deleteUser',{
      method: 'delete',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        filter: {
          login: this.state.employeeToDelete.login
        }
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            toast.success("Funcionário deletado com sucesso!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
            this.setState({
              employeesArrayLoaded: false,
              employeesArray: [],
              employeeToDelete: {},
              modalIsOpen: false,
            });
            this.getEmployeesArray();
          }
          else {
            toast.error("Funcionário não deletado!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
        });
      }
    });
  }

  cancelDeleteEmployee = () => {
    this.setState({
      employeeToDelete: {},
      modalIsOpen: false,
    });
  }

  componentWillMount() {
    this.getEmployeesArray();
  }

  render() {
    return (
      <div>
        {!this.state.employeesArrayLoaded &&
          <Loader />
        }
        {this.state.employeesArrayLoaded &&
          <table className='centered responsive-table highlight striped'>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Nível de Acesso</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeesArray.map(employee => (
                <tr key={employee.login}>
                  <td>{employee.login}</td>
                  <td>{employee.name}</td>
                  <td>{employee.job_title}</td>
                  <td>{employee.access_level}</td>
                  <td>
                    {employee.access_level >= 3 &&
                      <button className='btn red disabled' onClick={()=>this.handleEmployeeDelete(employee)}>
                        <i className='material-icons'>close</i>
                      </button>
                    }
                    {employee.access_level < 3 &&
                      <button className='btn red' onClick={()=>this.handleEmployeeDelete(employee)}>
                        <i className='material-icons'>close</i>
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        <Modal isOpen={this.state.modalIsOpen} contentLabel='Test' style={customStyles}>
          <nav className='indigo'>
            <div className='nav-wrapper'>
              <a className='brand-logo center'>AVISO</a>
            </div>
          </nav>
          <div className='container'>
            <div className='row'>
              <div className='col s12'>
                <h5>Tem certeza que deseja deletar?</h5>
              </div>
            </div>
            <div className='row'>
              <div className='col s12'>
                <p><b>Nome:</b> {this.state.employeeToDelete.name}</p>
              </div>
              <div className='col s12'>
                <p><b>Matrícula:</b> {this.state.employeeToDelete.login}</p>
              </div>
            </div>
            <div className='row' style={{textAlign:'center'}}>
              <div className='col s6'>
                <button className='btn green' onClick={this.confirmDeleteEmployee}>
                  <i className='material-icons'>check</i>
                </button>
              </div>
              <div className='col s6'>
                <button className='btn red' onClick={this.cancelDeleteEmployee}>
                  <i className='material-icons'>close</i>
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}

export default EmployeeList;
