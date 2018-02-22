import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false, tempValue: '' };
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
  }

  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  _onInputBlur(e) {
    const { onChange, dataSet } = this.props;
    const tempValue = this.state.tempValue.trim();
    const entry = dataSet.find(x => x.label.toUpperCase() === tempValue.toUpperCase());
    let newValue = '';

    if (entry) {
      newValue = entry.label;
    }

    this.setState({ focused: false, tempValue: newValue });
    onChange && onChange(newValue);
  }

  _onInputFocus(e) {
    this.setState({ focused: true });
  }

  _onInputChange(e) {
    this.setState({ tempValue: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tempValue: nextProps.value });
  }

  render() {
    const { placeholder, id, value } = this.props;
    const { focused, tempValue } = this.state;

    return (
      <div className={classNames('select', { 'select_with-value': focused || value })}>
        <label htmlFor={id} className="placeholder">
          {placeholder}
        </label>
        <input
          value={tempValue}
          onChange={this._onInputChange}
          type="text"
          id={id}
          onBlur={this._onInputBlur}
          onFocus={this._onInputFocus}
        />
      </div>
    );
  }
}
