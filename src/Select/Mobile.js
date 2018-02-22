import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Mobile extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  _renderOptions(dataSet) {
    return dataSet.map(x => (
      <option value={x.value} key={x.value}>
        {x.label}
      </option>
    ));
  }

  render() {
    const { id, dataSet } = this.props;

    return (
      <div className="select">
        <select id={id}>{this._renderOptions(dataSet)}</select>
      </div>
    );
  }
}
