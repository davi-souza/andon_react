import React, { Component } from 'react';

class AddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false
    };
    this.radioInputSelected = this.radioInputSelected.bind(this);
  }

  radioInputSelected(nextRadio) {
    if(nextRadio === 0) {
      this.setState({
        password: false
      });
    }
    else {
      this.setState({
        password: true
      });
    }
  }

  render() {
    const password = this.state.password;
    var passwordInput;
    if(password) {
      passwordInput = <input type='text' placeholder='SENHA' id='admin-addemployee-password'></input>
    }
    else {
      passwordInput = <input type='text' disabled placeholder='SENHA DESABILITADA' id='admin-addemployee-password'></input>
    }
    return (
      <div>
        <input type='text' placeholder='NOME' id='admin-addemployee-name'></input>
        <input type='text' placeholder='MATRÍCULA' id='admin-addemployee-id'></input>
        <div className='container admin-addemployee-radioinput'>
          <p>
            <label onClick={()=>this.radioInputSelected(0)}>
              <input name='addEmployeeGroup' type='radio' />
              <span>0 - Funcionário sem acesso</span>
            </label>
          </p>
          <p>
            <label onClick={()=>this.radioInputSelected(1)}>
              <input name='addEmployeeGroup' type='radio' />
              <span>1 - Encarregado</span>
            </label>
          </p>
        </div>
        {passwordInput}
        <button className='btn green admin-addemployee-confirm'>CRIAR</button>
      </div>
    );
  }
}

export default AddEmployee;
