import React, { Component } from 'react';
import Header from './Components/Header/Header.js';
import Content from './Components/Content/Content.js';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
