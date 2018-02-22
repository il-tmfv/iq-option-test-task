import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mobile from './Mobile';
import './style.styl';

export default class Select extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    native: PropTypes.bool,
    value: PropTypes.any,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    native: false,
  };

  render() {
    const { native, ...other } = this.props;

    return native ? <Mobile {...other} /> : <div>desktop</div>;
  }
}
