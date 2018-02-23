import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from './Select';
import { onChange as onChangeAction } from './actions';
import './App.styl';
import { BOTTOM, TOP } from './consts';

const detectMobile = () => {
  return window.innerWidth <= 768;
};

class App extends Component {
  constructor(props) {
    super(props);
    this._onChangeTop = this._onChangeTop.bind(this);
  }

  _onChangeTop(e) {
    const { dispatch } = this.props;

    dispatch(onChangeAction(TOP, typeof e === 'string' ? e : e.target.value));
  }

  render() {
    return (
      <div className="App">
        <Select
          id="select-component"
          native={detectMobile()}
          value={this.props[TOP]}
          onChange={this._onChangeTop}
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

export default connect(state => ({
  [TOP]: state[TOP],
  [BOTTOM]: state[BOTTOM],
}))(App);
