import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from './BookComponent';


class ShelfComponent extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  handleShelfChange = function(book, newShelf) {
    this.props.onShelfChange(book, newShelf);
  };

  render() {
    let actions = this.props.sections.map((section) => (
      {
        name: section.title,
        key: section.key
      }
    ));
    let selectedAction = this.props.sections.filter((section) => (
      section.key === this.props.shelf.key
    ))[0];

    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.canonicalVolumeLink}>
              <BookComponent book={book}
                             actions={actions}
                             selectedAction={selectedAction}
              onShelfChange={(book, newShelf) => (this.handleShelfChange(book, newShelf))}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}
export default ShelfComponent;
