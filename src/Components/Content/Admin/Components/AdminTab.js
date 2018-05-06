import React, { Component } from 'react';

class AdminTab extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    var tab = this.props.tab;
    switch(tab){
      case 'employeeList':
        tab = <ul className='tabs tabs-transparent'>
                <li className='tab'><a className='active'>Lista de Funcionário</a></li>
                <li className='tab' onClick={()=>this.props.changeTab('addEmployee')}><a>Adicionar Funcionário</a></li>
                <li className='tab' onClick={()=>this.props.changeTab('manageTeams')}><a>Gerenciar Times</a></li>
              </ul>
        break;
      case 'addEmployee':
        tab = <ul className='tabs tabs-transparent'>
                <li className='tab' onClick={()=>this.props.changeTab('employeeList')}><a>Lista de Funcionário</a></li>
                <li className='tab'><a className='active'>Adicionar Funcionário</a></li>
                <li className='tab' onClick={()=>this.props.changeTab('manageTeams')}><a>Gerenciar Times</a></li>
              </ul>
        break;
      case 'manageTeams':
        tab = <ul className='tabs tabs-transparent'>
                <li className='tab' onClick={()=>this.props.changeTab('employeeList')}><a>Lista de Funcionário</a></li>
                <li className='tab' onClick={()=>this.props.changeTab('addEmployee')}><a>Adicionar Funcionário</a></li>
                <li className='tab'><a className='active'>Gerenciar Times</a></li>
              </ul>
        break;
      default:
        tab = <h1>teste</h1>
        break;
    }
    return (
      <nav className='nav-extended indigo'>
        <div className='nav-content'>
          {tab}
        </div>
      </nav>
    );
  }
}

export default AdminTab;
