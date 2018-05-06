import React, { Component } from 'react';
import Loader from '../Loader';
import TableRow from './Components/TableRow';

class Central extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnings: []
    };
    this.getWarnings = this.getWarnings.bind(this);
    this.resolveWarning = this.resolveWarning.bind(this);
  }

  getWarnings() {
    fetch('/api/warning/getAllWarnings',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        fields: ['id','type','reason','where','emissionDate','resolvedDate','userLogin'],
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            this.setState({
              warnings: []
            });
            for(let warning of resJson.content) {
              console.log(warning);
              let warningAux = warning;
              let warningsAux = this.state.warnings;
              warningAux.who = warning.user.name
              warningsAux.push(warningAux);
              this.setState({
                warnings: warningsAux
              });
            }
          }
        });
      }
    });
  }

  resolveWarning(warningId) {
    fetch('/api/warning/resolve/'+warningId,{
      method: 'put'
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            this.getWarnings();
          }
        });
      }
    });
  }

  componentDidMount() {
    this.getWarnings();
  }

  render() {
    return (
      <div className='container'>
        {this.state.warnings.length === 0 &&
          <Loader />
        }
        <table className='centered responsive-table highlight striped'>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Motivo</th>
              <th>Onde</th>
              <th>Quando</th>
              <th>Autor</th>
              <th>Resolvido</th>
              <th>Resolver</th>
            </tr>
          </thead>
          <tbody>
            {this.state.warnings.map((warning,index) =>
              <TableRow
                warningId={warning.id}
                warningType={warning.type}
                warningReason={warning.reason}
                warningWhere={warning.where}
                warningDate={warning.emissionDate}
                warningWho={warning.who}
                warningResolved={warning.resolvedDate}
                resolveWarning={this.resolveWarning}
                key={warning.id}
              />
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Central;
