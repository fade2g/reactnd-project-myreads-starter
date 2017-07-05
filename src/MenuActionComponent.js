import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MenuActionComponent extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  };

  render() {
    return (<option value={this.props.value} >{this.props.name}</option>);
  }
}

export default MenuActionComponent;
