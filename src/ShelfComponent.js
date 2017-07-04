import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from './BookComponent';


class ShelfComponent extends Component {

  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  };

  render() {
    console.log('books', this.props.books);
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.canonicalVolumeLink}>
              <BookComponent bookTitle={book.title} bookAuthors={book.authors} bookImage={book.imageLinks.smallThumbnail }/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}
export default ShelfComponent;
