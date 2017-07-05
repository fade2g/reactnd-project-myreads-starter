import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookComponent from './BookComponent';


class ShelfComponent extends Component {

  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired
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
    ));
    return <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelf.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.canonicalVolumeLink}>
              <BookComponent bookTitle={book.title} bookAuthors={book.authors}
                             bookImage={book.imageLinks.smallThumbnail }
                             actions={actions}
                             selectedActionKey="read"/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}
export default ShelfComponent;
