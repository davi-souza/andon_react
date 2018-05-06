import React, { Component } from 'react';
import Loader from './Loader';

class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeesArrayLoaded: false,
      employeesArray: []
    };
  }

  componentWillMount() {
    fetch('/api/user/getAllUsers',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      }
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1){
            this.setState({
              employeesArrayLoaded: true
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

  render() {
    return (
      <div>
        {!this.state.employeesArrayLoaded &&
          <Loader />
        }
        {this.state.employeesArrayLoaded &&
          <table className='centered  highlight striped'>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Nível de Acesso</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeesArray.map(employee => (
                <tr key={employee.login}>
                  <td>{employee.login}</td>
                  <td>{employee.name}</td>
                  <td>{employee.job_title}</td>
                  <td>{employee.access_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    );
  }
}

export default EmployeeList;
