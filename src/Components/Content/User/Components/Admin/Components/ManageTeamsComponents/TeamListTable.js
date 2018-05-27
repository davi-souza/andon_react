import React, { Component } from 'react';
import Team from './Team.js';
import Loader from '../../../Loader';

class TeamListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamIndex: -1,
      employeeList: [],
      addToTeam: false,
    }
  }

  openModal = () => {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  }

  handleTeamSelection = (teamIndex) => {
    this.setState({
      teamIndex: teamIndex,
    })
  }

  handleClose = () => {
    this.setState({
      teamIndex: -1,
    })
  }

  handleAddTeamMemberTable = () => {
    fetch('/user/getAllUsers',{
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        filter: {
          access_level: 0
        }
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          this.setState({
            employeeList: resJson.content,
          });
        });
      }
    });
    this.setState({
      addToTeam: true,
    });
  }

  handleAddTeamMember = (employeeId) => {
    let teamId = this.props.teams[this.state.teamIndex].id;
    fetch('/team/addMember/'+teamId+'/'+employeeId,{
      method: 'post',
      credentials: 'same-origin',
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            this.props.toast({
              type: 'success',
              msg: "Funcionário adicionado com sucesso!",
            });
          }
          else {
            this.props.toast({
              type: 'error',
              msg: "Não foi possível adicionar funcionário!",
            });
          }
          this.props.loadTeams();
        });
      }
    });
  }

  handleCloseTable = () => {
    this.setState({
      addToTeam: false,
    });
  }

  render () {
    console.log(this.state.addToTeam);
    return (
      <div>
        {this.state.teamIndex !== -1 &&
          <div>
            {this.state.addToTeam &&
              <div>
                {this.state.employeeList.length === 0 &&
                  <Loader />
                }
                <div className='row' style={{textAlign:'center',marginTop:'1rem'}}>
                  <button className='btn red' onClick={this.handleCloseTable}>CANCELAR</button>
                </div>
                <table className='centered responsive-table highlight striped'>
                  <thead>
                    <tr>
                      <th>Matrícula</th>
                      <th>Nome</th>
                      <th>Função</th>
                      <th>Adicionar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.employeeList.map((employee,index) => (
                      <tr key={index}>
                        <td>{employee.login}</td>
                        <td>{employee.name}</td>
                        <td>{employee.job_title}</td>
                        <td>
                          <button className='btn green' onClick={()=>{this.handleAddTeamMember(employee.login)}}>
                            <i className='material-icons'>add</i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            <div className='row' style={{marginTop: '1rem'}}>
              <div className='col s4'></div>
              <div className='col s2'>
                <button className='btn green' onClick={this.handleAddTeamMemberTable}>
                  <i className='material-icons'>add</i>
                </button>
              </div>
              <div className='col s2'>
                <button className='btn blue' onClick={this.handleClose}>
                  <i className='material-icons'>expand_less</i>
                </button>
              </div>
              <div className='col s4'></div>
            </div>
            <Team teams={this.props.teams} teamIndex={this.state.teamIndex} parentState={this.state} />
          </div>
        }
        <div className='row'>
          {this.props.teams.map((team,index) => (
            <div className='col s12 m4 l2' key={team.id}>
              <div className='card'>
                <div className='card-content'>
                  <h6><b>Time</b></h6>
                  <p>{team.id}</p>
                </div>
                <div className='card-action'>
                  <button className='btn blue' onClick={()=>{this.handleTeamSelection(index)}}>
                    <i className='material-icons'>expand_more</i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TeamListTable;
