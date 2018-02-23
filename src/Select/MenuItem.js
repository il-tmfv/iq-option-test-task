import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this._renderText = this._renderText.bind(this);
    this._onItemClick = this._onItemClick.bind(this);
    this._getItemRef = this._getItemRef.bind(this);
  }

  static propTypes = {
    searchText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive && !this.props.isActive) {
      this.itemRef && this.itemRef.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }

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
    const { onClick, value } = this.props;

    onClick && onClick(value);
  }

  _getItemRef(ref) {
    this.itemRef = ref;
  }

  render() {
    const { label, searchText, isActive } = this.props;

    return (
      <div
        ref={this._getItemRef}
        role="button"
        className={classNames('menu-item', { 'menu-item_active': isActive })}
        onClick={this._onItemClick}
      >
        {this._renderText(label, searchText)}
      </div>
    );
  }
}
