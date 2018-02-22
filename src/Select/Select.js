import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

export default class Select extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    native: PropTypes.bool,
  };

  static defaultProps = {
    native: false,
  };

  render() {
    return <div>test</div>;
  }
}
