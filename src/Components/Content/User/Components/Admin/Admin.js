import React, { Component } from 'react';
import AdminTab from './Components/AdminTab';
import EmployeeList from './Components/EmployeeList';
import AddEmployee from './Components/AddEmployee';
import ManageTeams from './Components/ManageTeams';

import './Style/Admin.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'employeeList'
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(nextTab) {
    this.setState({
      tab: nextTab
    });
  }

  render() {
    return (
      <div>
        <AdminTab tab={this.state.tab} changeTab={this.changeTab} />
        <div className='container'>
          {this.state.tab === 'employeeList' &&
            <EmployeeList />
          }
          {this.state.tab === 'addEmployee' &&
            <AddEmployee />
          }
          {this.state.tab === 'manageTeams' &&
            <ManageTeams />
          }
        </div>
      </div>
    );
  }
}

export default Admin;
