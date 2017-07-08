import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import MenuActionComponent from './MenuActionComponent';

class MenuComponent extends Component {
  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    book: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    selectedAction: PropTypes.object.isRequired,
    onMenuAction: PropTypes.func.isRequired
  };

  handleChange = function(book, event) {
    this.props.onMenuAction(book, event.target.value);
  };

  render() {
    let {book, actions, selectedAction} = this.props;
    return <div className="book-shelf-changer">
      <select onChange={(event) => (this.handleChange(book, event))} value={selectedAction.key}>
        <option value="none" disabled>Move to...</option>
        {actions.map((action) => (
          <MenuActionComponent key={action.key} name={action.name} value={action.key}/>
        ))}
      </select>
    </div>
  }
}

export default MenuComponent

