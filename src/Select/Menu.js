import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

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
    rowHeight: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    onMenuFocusBlur: PropTypes.func.isRequired,
    activeItemValue: PropTypes.string.isRequired,
    openUp: PropTypes.bool,
  };

  static defaultProps = {
    maxRows: 5,
    rowHeight: 40,
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
    const { dataSet, open, searchText, maxRows, onClick, activeItemValue, rowHeight, openUp } = this.props;

    const visibleRows = dataSet.length >= maxRows ? maxRows : dataSet.length;
    const coef = visibleRows === maxRows ? 0 : 1;
    const top = openUp ? -(rowHeight * visibleRows) - coef : '100%';

    return dataSet.length > 0 ? (
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className="select__menu"
        style={{
          display: open ? 'block' : 'none',
          maxHeight: rowHeight * maxRows,
          top,
        }}
      >
        {this._renderMenuItems(dataSet, searchText, activeItemValue, onClick)}
      </div>
    ) : null;
  }
}
