import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Mobile from './Mobile';
import Desktop from './Desktop';
import './style.styl';

export const sortFunc = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }

  if (a.label > b.label) {
    return 1;
  }

  return 0;
};

export default class Select extends Component {
  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    native: PropTypes.bool,
    value: PropTypes.any,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    native: false,
    placeholder: '',
  };

  render() {
    const { native, ...other } = this.props;

    return native ? <Mobile {...other} /> : <Desktop {...other} />;
  }
}
