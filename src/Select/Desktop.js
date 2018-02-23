import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Menu from './Menu';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = { inputFocused: false, tempTextValue: '', menuFocused: false };
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onMenuItemClick = this._onMenuItemClick.bind(this);
    this._onMenuFocusBlur = this._onMenuFocusBlur.bind(this);
  }

  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  _onInputBlur(e) {
    if (this.state.menuFocused) {
      return;
    }

    const { onChange, dataSet } = this.props;
    const tempTextValue = this.state.tempTextValue.trim();
    const entry = dataSet.find(x => x.label.toUpperCase() === tempTextValue.toUpperCase());
    let newTextValue = '';
    let newValue = '';

    if (entry) {
      newTextValue = entry.label;
      newValue = entry.value;
    }

    this.setState({ inputFocused: false, menuFocused: false, tempTextValue: newTextValue });
    onChange && onChange(newValue);
  }

  _onInputFocus(e) {
    this.setState({ inputFocused: true });
  }

  _onInputChange(e) {
    this.setState({ tempTextValue: e.target.value });
  }

  _onMenuItemClick(value) {
    const { onChange } = this.props;
    onChange && onChange(value);
  }

  _onMenuFocusBlur(menuFocused) {
    this.setState({ menuFocused });
  }

  componentWillReceiveProps(nextProps) {
    const { dataSet } = this.props;
    const entry = dataSet.find(x => x.value === nextProps.value);

    if (entry) {
      this.setState({ tempTextValue: entry.label });
    } else {
      this.setState({ tempTextValue: '' });
    }

    this.setState({ inputFocused: false });
  }

  render() {
    const { placeholder, id, value, dataSet } = this.props;
    const { inputFocused, tempTextValue } = this.state;

    return (
      <div className={classNames('select', { 'select_with-value': inputFocused || value })}>
        <label htmlFor={id} className="placeholder">
          {placeholder}
        </label>
        <input
          value={tempTextValue}
          type="text"
          id={id}
          onChange={this._onInputChange}
          onBlur={this._onInputBlur}
          onFocus={this._onInputFocus}
        />
        <Menu
          onMenuFocusBlur={this._onMenuFocusBlur}
          dataSet={dataSet}
          searchText={tempTextValue}
          open={inputFocused}
          onClick={this._onMenuItemClick}
        />
      </div>
    );
  }
}
