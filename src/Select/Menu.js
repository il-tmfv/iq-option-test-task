import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const ROW_HEIGHT = 40;

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this._onMouseEnter = this._onMouseEnter.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  static propTypes = {
    open: PropTypes.bool.isRequired,
    dataSet: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    maxRows: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    onMenuFocusBlur: PropTypes.func.isRequired,
    activeItemValue: PropTypes.string.isRequired,
  };

  static defaultProps = {
    maxRows: 5,
  };

  _renderMenuItems(dataSet, searchText, activeItemValue, onClick) {
    return dataSet.map(x => (
      <MenuItem
        key={x.value}
        isActive={activeItemValue === x.value}
        searchText={searchText}
        label={x.label}
        value={x.value}
        onClick={onClick}
      />
    ));
  }

  _onMouseLeave(e) {
    const { onMenuFocusBlur } = this.props;
    onMenuFocusBlur && onMenuFocusBlur(false);
  }

  _onMouseEnter(e) {
    const { onMenuFocusBlur } = this.props;
    onMenuFocusBlur && onMenuFocusBlur(true);
  }

  render() {
    const { dataSet, open, searchText, maxRows, onClick, activeItemValue } = this.props;

    return dataSet.length > 0 ? (
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className="select__menu"
        style={{ display: open ? 'block' : 'none', maxHeight: ROW_HEIGHT * maxRows }}
      >
        {this._renderMenuItems(dataSet, searchText, activeItemValue, onClick)}
      </div>
    ) : null;
  }
}
