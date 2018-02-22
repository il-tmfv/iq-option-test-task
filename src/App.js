import React, { Component } from 'react';
import Select from './Select';
import './App.styl';

const detectMobile = () => {
  return window.innerWidth <= 768;
};

class App extends Component {
  constructor(props) {
    super(props);
    // TODO replace with redux
    this.state = { value: '' };
    this._onChange = this._onChange.bind(this);
  }

  // TODO replace with redux
  _onChange(e) {
    this.setState({ value: typeof e === 'string' ? e : e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Select
          id="select-component"
          native={detectMobile()}
          value={this.state.value}
          onChange={this._onChange}
          placeholder="Выберите фрукт или овощ"
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
