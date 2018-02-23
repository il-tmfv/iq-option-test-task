import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this._renderText = this._renderText.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
  }

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onClick: PropTypes.func.isRequired,
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

  _onItemClick(e) {
    const { onClick } = this.props;

    onClick && onClick();
  }

  render() {
    const { label, searchText } = this.props;

    return (
      <div role="button" className="menu-item" onClick={this._onItemClick}>
        {this._renderText(label, searchText)}
      </div>
    );
  }
}
