import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import Select from './Select';
import { onChange as onChangeAction, onResize as onResizeAction } from './actions';
import './App.styl';
import { BOTTOM, TOP } from './consts';

const dataSet = [
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
];

class App extends Component {
  constructor(props) {
    super(props);
    this._onChangeTop = this._onChangeTop.bind(this);
    this._onChangeBottom = this._onChangeBottom.bind(this);
    this._onResize = debounce(this._onResize.bind(this), 250, { leading: false, trailing: true });
  }

  _onChangeTop(e) {
    const { dispatch } = this.props;

    dispatch(onChangeAction(TOP, typeof e === 'string' ? e : e.target.value));
  }

  _onChangeBottom(e) {
    const { dispatch } = this.props;

    dispatch(onChangeAction(BOTTOM, typeof e === 'string' ? e : e.target.value));
  }

  _onResize(e) {
    const { dispatch } = this.props;

    dispatch(onResizeAction());
  }

  componentDidMount() {
    const { dispatch } = this.props;

    window.addEventListener('resize', this._onResize);
    dispatch(onResizeAction());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    const { isMobile } = this.props;

    return (
      <div className="App">
        <Select
          id="select-component"
          native={isMobile}
          value={this.props[TOP]}
          onChange={this._onChangeTop}
          placeholder="Выберите фрукт или овощ"
          dataSet={dataSet}
        />
        <Select
          id="select-component"
          native={isMobile}
          value={this.props[BOTTOM]}
          onChange={this._onChangeBottom}
          placeholder="Выберите фрукт или овощ"
          dataSet={dataSet}
        />
      </div>
    );
  }
}

export default connect(state => ({
  [TOP]: state[TOP],
  [BOTTOM]: state[BOTTOM],
  isMobile: state.isMobile,
}))(App);
