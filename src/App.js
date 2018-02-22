import React, { Component } from 'react';
import Select from './Select';
import './App.styl';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Select
          id="select-component"
          native
          dataSet={[
            { value: '1', label: 'Арбуз' },
            { value: '2', label: 'Груша' },
            { value: '3', label: 'Дыня' },
            { value: '4', label: 'Яблоко' },
            { value: '5', label: 'Помидор' },
            { value: '6', label: 'Слива' },
            { value: '7', label: 'Картофель' },
            { value: '8', label: 'Апельсин' },
            { value: '9', label: 'Гранат' },
            { value: '10', label: 'Вишня' },
          ]}
        />
      </div>
    );
  }
}

export default App;
