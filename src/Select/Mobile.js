import React, { Component } from 'react';
import PropTypes from 'prop-types';

const sortFunc = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
};

export default class Mobile extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  };

  _renderOptions(dataSet) {
    return dataSet.sort(sortFunc).map(x => (
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
