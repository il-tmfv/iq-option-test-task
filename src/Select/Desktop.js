import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
  }

  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  _onInputBlur(e) {
    this.setState({ focused: false });
  }

  _onInputFocus(e) {
    this.setState({ focused: true });
  }

  render() {
    const { placeholder, id, value, onChange } = this.props;
    const { focused } = this.state;

    return (
      <div className={classNames('select', { 'select_with-value': focused || value })}>
        <label htmlFor={id} className="placeholder">
          {placeholder}
        </label>
        <input
          value={value}
          onChange={onChange}
          type="text"
          id={id}
          onBlur={this._onInputBlur}
          onFocus={this._onInputFocus}
        />
      </div>
    );
  }
}
