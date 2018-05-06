import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BreadCrumb extends Component {
  render() {
    return (
      <nav className='indigo'>
        <div className="nav-wrapper">
          <div className="col s12">
            <Link to='#type' className='breadcrumb' onClick={()=>this.props.changeStage(0)}>Tipo</Link>
            {this.props.warningStage >= 1 &&
              <Link to='#reason' className='breadcrumb' onClick={()=>this.props.changeStage(1)}>Motivo</Link>
            }
            {this.props.warningStage >= 2 &&
              <Link to='#where' className='breadcrumb' onClick={()=>this.props.changeStage(2)}>Local</Link>
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default BreadCrumb;
