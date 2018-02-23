import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sortFunc } from './Select';

export default class Mobile extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  _renderOptions(dataSet) {
    return dataSet.sort(sortFunc).map(x => (
      <option value={x.value} key={x.value}>
        {x.label}
      </option>
    ));
  }

  render() {
    const { id, dataSet, value, onChange, placeholder } = this.props;

    return (
      <div className={classNames('select', { 'select_without-value': !value })}>
        <label htmlFor={id} className="placeholder">
          {placeholder}
        </label>
        <select value={value} onChange={onChange} id={id}>
          <option value="" disabled style={{ display: value ? 'none' : 'block' }}>
            {placeholder}
          </option>
          {this._renderOptions(dataSet)}
        </select>
      </div>
    );
  }
}
