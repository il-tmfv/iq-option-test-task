import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortFunc } from './Select';
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
  };

  static defaultProps = {
    maxRows: 5,
  };

  _renderMenuItems(dataSet, searchText, onClick) {
    return dataSet
      .sort(sortFunc)
      .filter(entry => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
      .map(x => (
        <MenuItem
          key={x.value}
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
    const { dataSet, open, searchText, maxRows, onClick } = this.props;

    return (
      <div
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        className="select__menu"
        style={{ display: open ? 'block' : 'none', maxHeight: ROW_HEIGHT * maxRows }}
      >
        {this._renderMenuItems(dataSet, searchText, onClick)}
      </div>
    );
  }
}
