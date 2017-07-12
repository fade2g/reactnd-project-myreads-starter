import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Menu from "./Menu";


class Book extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    book: PropTypes.object.isRequired,
    actions: PropTypes.array,
    selectedAction: PropTypes.object,
    onShelfChange: PropTypes.func.isRequired
  };

  render() {
    let {book, actions, selectedAction, onShelfChange} = this.props;
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: book.imageLinks && book.imageLinks.smallThumbnail ? `url(${ book.imageLinks.smallThumbnail})` : ''
        }}/>
        <Menu book={book} actions={actions} selectedAction={selectedAction} onMenuAction={onShelfChange}/>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): book.authors}</div>
    </div>
  }
}

export default Book;
