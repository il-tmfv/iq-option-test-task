import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Desktop extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  render() {
    return (
      <div className="select">
        <input type="text" />
      </div>
    );
  }
}
