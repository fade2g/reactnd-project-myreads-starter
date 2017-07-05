import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MenuActionComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool
  };

  render() {
    return this.props.disabled ? (<option value={this.props.value} disabled>{this.props.name}</option>) : (
      <option value={this.props.value} >{this.props.name}</option>);
  }
}

export default MenuActionComponent;
