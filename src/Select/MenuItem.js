import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this._renderText = this._renderText.bind(this);
  }

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
  };

  _splitLabel(label, searchText) {
    const indexOfSubstring = label.toUpperCase().indexOf(searchText.toUpperCase());
    if (indexOfSubstring === -1) {
      return [label, '', ''];
    }

    const lengthOfSubstring = searchText.length;

    const leftPart = label.substring(0, indexOfSubstring);
    const middlePart = label.substring(indexOfSubstring, indexOfSubstring + lengthOfSubstring);
    const rightPart = label.substring(indexOfSubstring + lengthOfSubstring);

    return [leftPart, middlePart, rightPart];
  }

  _renderText(label, searchText) {
    const parts = this._splitLabel(label, searchText);
    return (
      <span>
        {parts[0]}
        <span className="menu-item__highlighted-text">{parts[1]}</span>
        {parts[2]}
      </span>
    );
  }

  render() {
    const { label, searchText } = this.props;

    return <div className="menu-item">{this._renderText(label, searchText)}</div>;
  }
}
