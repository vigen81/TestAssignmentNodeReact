import React, { Component } from 'react';
import Search from './components/Search'
import './App.css';
import './AutoCompleteText.css'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;
