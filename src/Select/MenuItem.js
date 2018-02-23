import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
  static propTypes = {
    searchText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  };

  _splitLabel(label, searchText) {
    const innerAndOuter = label.split(searchText);
  }

  render() {
    const { label } = this.props;

    return <div className="menu-item">{label}</div>;
  }
}
