import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';

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

  handleCreation = () => {
    let name = document.getElementById('admin-addemployee-name').value;
    let login = document.getElementById('admin-addemployee-login').value;
    let password = '123';
    if(this.state.password) {
      password = document.getElementById('admin-addemployee-password').value;
    }

    let userJson = {
      login: login,
      name: name,
      password: password,
      access_level: this.state.password?1:0,
      job_title: this.state.password?'ENCARREGADO':'PEDREIRO'
    }

    fetch('/user/createUser',{
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userJson)
    }).then(res => {
      if(res.ok) {
        res.json().then(resJson => {
          if(resJson.response === 1) {
            toast.success("Funcionáro Criado!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
            document.getElementById('admin-addemployee-name').value = '';
            document.getElementById('admin-addemployee-login').value = '';
            document.getElementById('admin-addemployee-password').value = '';
          }
          else {
            toast.error("Funcionáro não Criado!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
        });
      }
    });
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
        <input type='text' placeholder='MATRÍCULA' id='admin-addemployee-login'></input>
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
        <button className='btn green admin-addemployee-confirm' onClick={this.handleCreation}>CRIAR</button>
        <ToastContainer />
      </div>
    );
  }
}

export default AddEmployee;
