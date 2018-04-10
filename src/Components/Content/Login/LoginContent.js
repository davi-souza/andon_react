import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';

import './Style/Login.css';


class LoginContent extends Component {

  constructor(props) {
    super(props);
    this.confirmId = this.confirmId.bind(this);
  }

  confirmId() {
    fetch('/login',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        login: document.getElementById('login-input-id').value,
        password: document.getElementById('login-input-password').value
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJSON => {
          if(resJSON.response === 'loggedin') {
            this.props.history.push('/user');
          }
          else if(resJSON.response === 'invalidlogin') {
            toast.error("Matrícula não encontrada!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
          else if(resJSON.response === 'invalid_password') {
            toast.error("Senha incorreta!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
        });
      }
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <input type='text' name='id' placeholder='MATRÍCULA' id='login-input-id'></input>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <input type='password' name='id' placeholder='SENHA' id='login-input-password'></input>
          </div>
        </div>
        <div className='row'>
          <div className='col s12'>
            <button className='btn green login-input-confirm' onClick={this.confirmId}>LOG IN</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default LoginContent;
