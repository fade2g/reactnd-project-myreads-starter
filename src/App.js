import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ShelfComponent from './ShelfComponent';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.setState({books: data});
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <ShelfComponent shelfName="Currently Reading"
                                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}/>
              </div>
              <div className="list-books-content">
                <ShelfComponent shelfName="Want to Read"
                                books={this.state.books.filter((book) => book.shelf === 'wantToRead')}/>
              </div>
              <div className="list-books-content">
                <ShelfComponent shelfName="Read"
                                books={this.state.books.filter((book) => book.shelf === 'read')}/>
              </div>
            </div>

            <div className="open-search">
              <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
