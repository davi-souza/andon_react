import React from 'react';
import { ToastContainer,toast } from 'react-toastify';

class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: this.props.teams[this.props.teamIndex].users,
    }
  }

  handleTeamRemove = (teamId,memberLogin) => {
    fetch('/team/removeMember/'+teamId+'/'+memberLogin,{
      method: 'post',
      credentials: 'same-origin',
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            toast.success("Funcionário removido com sucesso!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
          else {
            toast.error("Não foi possível remover funcionário!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
          var teamMembersAux = this.state.teamMembers;
          for(var m of teamMembersAux) {
            if(m.login === memberLogin) {
              var index = teamMembersAux.indexOf(m);
              teamMembersAux.splice(index,1);
              break;
            }
          }
          this.setState({
            teamMembers: teamMembersAux,
          });
        });
      }
    });
  }

  render () {
    var teamMembers = this.state.teamMembers;
    var teamId = this.props.teams[this.props.teamIndex].id;
    return(
      <div>
        {teamMembers.length !== 0 &&
          <table className='centered responsive-table highlight striped'>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member,index) =>
                <tr key={index}>
                  <td>{member.login}</td>
                  <td>{member.name}</td>
                  <td>
                    <button className='btn red' onClick={()=>{this.handleTeamRemove(teamId,member.login)}}>
                      <i className='material-icons'>close</i>
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        }
        <ToastContainer />
      </div>
    );
  }
}

export default Team;
