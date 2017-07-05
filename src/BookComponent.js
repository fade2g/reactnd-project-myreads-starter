import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuActionComponent from './MenuActionComponent';


class BookComponent extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    book: PropTypes.object.isRequired,
    actions: PropTypes.array,
    selectedAction: PropTypes.object,
    onShelfChange: PropTypes.func.isRequired
  };

  handleChange = function(book, event) {
    this.props.onShelfChange(book, event.target.value);
  };

  render() {
    let {book, actions} = this.props;
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${book.imageLinks.smallThumbnail})`
        }}/>
        <div className="book-shelf-changer">
          <select onChange={(event) => (this.handleChange(book, event))} value={this.props.selectedAction.key}>
            <option value="none" disabled>Move to...</option>
            {actions.map((action) => (
              <MenuActionComponent key={action.key} name={action.name} value={action.key}/>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
  }
}

export default BookComponent;
