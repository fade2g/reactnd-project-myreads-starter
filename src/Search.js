import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class Search extends Component {

  debounce = function (func, wait, immediate) {
    let timeout;
    return function () {
      let context = this, args = arguments;
      let later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    shelvedBooks: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  state = {
    searchTerm: '',
    books: []
  };

  handleChange = this.debounce((event) => {
    let searchTerm = event.target.value;
    this.setState({searchTerm: searchTerm});
    if (!searchTerm) {
      // No search term, no books
      this.setState({books: []});
      return;
    }
    BooksAPI.search(searchTerm, 20).then((response) => {
      if (response && response.error) {
        if (response.error === "empty query") {
          // no hit, no books but no error
          this.setState({books: []});
        } else {
          console.warn('Error:', response);
        }
        return;
      }
      this.setState({books: response ? response : []});
    })
  }, 300);

  render() {
    let assignmentHashMap = {};
    this.props.shelvedBooks.reduce((hashMap, book) => {
      hashMap[book.id] = book.shelf;
      return hashMap
    }, assignmentHashMap);

    return <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.props.searchTerm}
                 onChange={(event) => {
                   event.persist();
                   this.handleChange(event)
                 }}/>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.map((book) => (
            <li key={book.id}>
              <Book book={book}
                    actions={this.props.actions}
                    selectedAction={{key: assignmentHashMap[book.id] ? assignmentHashMap[book.id] : ''}}
                    onShelfChange={(book, shelfKey) => (this.props.onShelfChange(book, shelfKey))}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  }
}

export default Search;
