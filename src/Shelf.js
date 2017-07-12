import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';


class Shelf extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  render() {
    let selectedAction = this.props.actions.filter((section) => (
      section.key === this.props.shelf.key
    ))[0];

    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <Book book={book}
                    actions={this.props.actions}
                    selectedAction={selectedAction}
                    onShelfChange={(book, newShelf) => (this.props.onShelfChange(book, newShelf))}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}
export default Shelf;
