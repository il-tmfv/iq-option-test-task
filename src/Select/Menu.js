import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortFunc } from './Select';
import MenuItem from './MenuItem';

const ROW_HEIGHT = 40;

export default class Menu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    dataSet: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    maxRows: PropTypes.number,
  };

  static defaultProps = {
    maxRows: 5,
  };

  _renderMenuItems(dataSet, searchText) {
    return dataSet
      .sort(sortFunc)
      .filter(entry => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) !== -1)
      .map(x => <MenuItem key={x.value} searchText={searchText} label={x.label} value={x.value} />);
  }

  render() {
    const { dataSet, open, searchText, maxRows } = this.props;

    return (
      <div className="select__menu" style={{ display: open ? 'block' : 'none', maxHeight: ROW_HEIGHT * maxRows }}>
        {this._renderMenuItems(dataSet, searchText)}
      </div>
    );
  }
}
