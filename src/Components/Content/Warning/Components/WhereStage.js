import React, { Component } from 'react';

class WhereStage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      block: '',
      level: ''
    };
    this.blockClicked = this.blockClicked.bind(this);
    this.levelClicked = this.levelClicked.bind(this);
    this.advanceClicked = this.advanceClicked.bind(this);
  }

  componentDidMount() {
    let existingScript = document.getElementById('collapsible');
    if(typeof(existingScript) !== 'undefined' && existingScript !== null) {
      document.body.removeChild(existingScript);
    }

    let script = document.createElement('script');
    script.src = '/js/materialize/collapsible.js';
    script.id = 'collapsible';
    document.body.appendChild(script);
  }

  blockClicked(block) {
    this.setState({
      block: block.block
    })
    document.getElementById('collapsible-blocks').click();
    // document.getElementById('collapsible-levels').click();
  }

  levelClicked(level) {
    this.setState({
      level: level.level
    })
    document.getElementById('collapsible-levels').click();
  }

  advanceClicked() {
    if(this.state.block === '' || this.state.level === '') {
      return;
    }
    this.props.changeWhere('Bloco: '+this.state.block+' - Andar: '+this.state.level);
    this.props.changeStage(3);
  }

  render() {
    let blocks = [];
    let levels = [];
    for(let i = 70 ; i>0 ; i--) {
      blocks.push(i);
    }
    for(let i = 3 ; i>0 ; i--) {
      levels.push(i);
    }
    levels.push('Térreo');
    return (
      <div className='container'>
        <ul className='collapsible popout'>
          <li>
            <div className='collapsible-header' id='collapsible-blocks'>Número do Bloco: {this.state.block}</div>
              {blocks.map(block =>
                <div className='collapsible-body' key={block} onClick={()=>this.blockClicked({block})}>{block}</div>
              )}
          </li>
          <li>
            <div className='collapsible-header' id='collapsible-levels'>Andar: {this.state.level}</div>
                {levels.map(level =>
                  <div className='collapsible-body' key={level} onClick={()=>this.levelClicked({level})}>{level}</div>
                )}
          </li>
        </ul>
        <button className='btn green where-advance-button' onClick={this.advanceClicked}>CONTINUAR</button>
      </div>
    );
  }
}

export default WhereStage;
