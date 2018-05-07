import React, { Component } from 'react';
import { ToastContainer,toast } from 'react-toastify';

import './Style/Home.css';


class HomeContent extends Component {

  constructor(props) {
    super(props);
    this.addNumber = this.addNumber.bind(this);
    this.eraseNumber = this.eraseNumber.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  addNumber(number) {
    document.getElementById('home-input-id').value = document.getElementById('home-input-id').value + number;
  }

  eraseNumber() {
    document.getElementById('home-input-id').value = document.getElementById('home-input-id').value.substring(0,document.getElementById('home-input-id').value.length-1);
  }

  handleLogin() {
    fetch('/api/login',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        login: document.getElementById('home-input-id').value,
        password: '123'
      })
    }).then(res => {
      if(res.ok) {
        res.json().then(resJSON => {
          if(resJSON.response === 1) {
            this.props.history.push('/user?login='+document.getElementById('home-input-id').value);
          }
          else if(resJSON.response === 0) {
            toast.error("Matrícula não encontrada!",{
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true
            });
          }
        });
      }
    });
    document.getElementById('home-input-id').value = '';
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col s12'>
            <input type='text' name='id' placeholder='MATRÍCULA' readOnly id='home-input-id'></input>
          </div>
        </div>
        <div className='row'>
          <div className='col s6'>
            <button className='btn green home-confirm-button' onClick={this.handleLogin}>ENTRAR</button>
          </div>
          <div className='col s6'>
            <button className='btn red home-erase-button' onClick={this.eraseNumber}>APAGAR</button>
          </div>
        </div>
        <div className='row'>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('1')}>1</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('2')}>2</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('3')}>3</button>
          </div>
        </div>
        <div className='row'>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('4')}>4</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('5')}>5</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('6')}>6</button>
          </div>
        </div>
        <div className='row'>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('7')}>7</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('8')}>8</button>
          </div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('9')}>9</button>
          </div>
        </div>
        <div className='row'>
          <div className='col s4'></div>
          <div className='col s4'>
            <button className='btn grey darken-4 home-input-button' onClick={()=>this.addNumber('0')}>0</button>
          </div>
          <div className='col s4'></div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default HomeContent;
