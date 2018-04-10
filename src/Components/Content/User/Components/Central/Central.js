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
    this.setState({
      warnings: [
        {
          id: '1',
          type: 'ALERTA',
          reason: 'reason1',
          where: 'where1',
          date: 'date1',
          who: 'who1',
          resolved: 'dateR1'
        },
        {
          id: '2',
          type: 'PARADO',
          reason: 'reason2',
          where: 'where2',
          date: 'date2',
          who: 'who2',
          resolved: ''
        },
        {
          id: '3',
          type: 'PARADO',
          reason: 'reason3',
          where: 'where3',
          date: 'date3',
          who: 'who3',
          resolved: 'dateR3'
        },
        {
          id: '4',
          type: 'ALERTA',
          reason: 'reason4',
          where: 'where4',
          date: 'date4',
          who: 'who4',
          resolved: ''
        }
      ]
    });
  }

  resolveWarning(warningId) {
    console.log(warningId);
  }

  componentDidMount() {
    setTimeout(() => {
      this.getWarnings();
    }, 3000);
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
                warningDate={warning.date}
                warningWho={warning.who}
                warningResolved={warning.resolved}
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
