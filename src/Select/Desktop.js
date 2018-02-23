import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sortFunc } from './Select';
import Menu from './Menu';

export default class Desktop extends Component {
  constructor(props) {
    super(props);
    this.state = { inputFocused: false, tempTextValue: '', menuFocused: false, activeItemValue: '' };
    this._onInputBlur = this._onInputBlur.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onMenuItemClick = this._onMenuItemClick.bind(this);
    this._onMenuFocusBlur = this._onMenuFocusBlur.bind(this);
    this._onInputKeyDown = this._onInputKeyDown.bind(this);
    this._getInputRef = this._getInputRef.bind(this);
  }

  static propTypes = {
    dataSet: PropTypes.array.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  _onInputBlur(e) {
    if (this.state.menuFocused) {
      return;
    }

    const { onChange, dataSet } = this.props;
    const tempTextValue = this.state.tempTextValue.trim();
    const entry = dataSet.find(x => x.label.toUpperCase() === tempTextValue.toUpperCase());
    let newTextValue = '';
    let newValue = '';

    if (entry) {
      newTextValue = entry.label;
      newValue = entry.value;
    }

    this.setState({ inputFocused: false, menuFocused: false, activeItemValue: '', tempTextValue: newTextValue });
    onChange && onChange(newValue);
  }

  _onInputFocus(e) {
    this.setState({ inputFocused: true });
  }

  _onInputChange(e) {
    this.setState({ tempTextValue: e.target.value });
  }

  _onMenuItemClick(value) {
    const { onChange } = this.props;
    onChange && onChange(value);
  }

  _onMenuFocusBlur(menuFocused) {
    this.setState({ menuFocused });
  }

  _onInputKeyDown(e) {
    const { onChange, dataSet } = this.props;
    const { activeItemValue, tempTextValue } = this.state;
    const preparedDataSet = this._prepareDataSet(dataSet, tempTextValue);
    const currentlyActiveIndex = preparedDataSet.findIndex(x => x.value === activeItemValue);
    let newActiveItem = { value: '', label: '' };

    switch (e.keyCode) {
      case 38: // up
        if (currentlyActiveIndex !== -1) {
          newActiveItem =
            preparedDataSet[currentlyActiveIndex === 0 ? preparedDataSet.length - 1 : currentlyActiveIndex - 1];
        } else {
          newActiveItem = preparedDataSet[0];
        }

        this.setState({ activeItemValue: newActiveItem ? newActiveItem.value : ''});

        return false;
      case 40: // down
        if (currentlyActiveIndex !== -1) {
          newActiveItem =
            preparedDataSet[currentlyActiveIndex === preparedDataSet.length - 1 ? 0 : currentlyActiveIndex + 1];
        } else {
          newActiveItem = preparedDataSet[0];
        }

        this.setState({ activeItemValue: newActiveItem ? newActiveItem.value : ''});

        return false;
      case 13: // enter
        this.setState(
          prevState => ({
            tempTextValue:
              currentlyActiveIndex >= 0 ? preparedDataSet[currentlyActiveIndex].label : prevState.tempTextValue,
          }),
          () => {
            onChange && onChange(activeItemValue);
            this.inputRef && this.inputRef.blur();
          },
        );
        return false;
      default:
        return;
    }
  }

  _getInputRef(ref) {
    this.inputRef = ref;
  }

  _prepareDataSet(dataSet, searchText) {
    return dataSet.sort(sortFunc).filter(entry => entry.label.toUpperCase().indexOf(searchText.toUpperCase()) !== -1);
  }

  componentWillReceiveProps(nextProps) {
    const { dataSet } = this.props;
    const entry = dataSet.find(x => x.value === nextProps.value);

    if (entry) {
      this.setState({ tempTextValue: entry.label });
    } else {
      this.setState({ tempTextValue: '' });
    }

    this.setState({ inputFocused: false, activeItemValue: '' });
  }

  render() {
    const { placeholder, id, value, dataSet } = this.props;
    const { inputFocused, tempTextValue, activeItemValue } = this.state;

    return (
      <div className={classNames('select', { 'select_without-value': !inputFocused && !value })}>
        <label htmlFor={id} className="placeholder">
          {placeholder}
        </label>
        <input
          value={tempTextValue}
          type="text"
          id={id}
          onChange={this._onInputChange}
          onBlur={this._onInputBlur}
          onFocus={this._onInputFocus}
          onKeyDown={this._onInputKeyDown}
          ref={this._getInputRef}
        />
        <Menu
          onMenuFocusBlur={this._onMenuFocusBlur}
          dataSet={this._prepareDataSet(dataSet, tempTextValue)}
          searchText={tempTextValue}
          open={inputFocused}
          onClick={this._onMenuItemClick}
          activeItemValue={activeItemValue}
        />
      </div>
    );
  }
}
