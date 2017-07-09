import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookComponent from "./BookComponent";

class SearchComponent extends Component {

  static propTypes = {
    actions: PropTypes.array.isRequired,
    assignedBooks: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    searchTerm: '',
    books: []
  };

  handleChange = (event) => {
    let searchTerm = event.target.value;
    this.setState({searchTerm: searchTerm});
    BooksAPI.search(searchTerm, 20).then((response) => {
      if (response && response.error) {
        console.warn('Error:', response);
        return;
      }
      this.setState({books: response ? response :  []});
    })
  };

  render() {
    return <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.props.searchTerm} onChange={(event) => (this.handleChange(event))}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.map((book) => (
            <li key={book.id}>
              <BookComponent book={book}
                             actions={this.props.actions}
                             selectedAction={{key: this.props.assignedBooks[book.id] ? this.props.assignedBooks[book.id] : ''}}
                             onShelfChange={(book, shelfKey) => (this.props.onShelfChange(book, shelfKey))}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}

export default SearchComponent;
