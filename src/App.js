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
    // Holds the books retrieved from backend
    books: [],
    // base data with the available sections
    sections: [
      {
        key: 'currentlyReading',
        title: 'Currently Reading',
        hidden: false
      },
      {
        key: 'wantToRead',
        title: 'Want to Read',
        hidden: false
      },
      {
        key: 'read',
        title: 'Read',
        hidden: false
      },
      // special section to remove book from shelf. Not visible as a section (thus: hidden === false)
      {
        key: '',
        title: 'None',
        hidden: true
      }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then((response) => {
      console.log(response);
      this.setState({books: response});
    })
  }

  handleShelfChange = function(book, newShelf) {
    BooksAPI.update(book, newShelf).then((response) => {
      console.log(response);
      // Update the shelf of the book according to the required shelf
      // Note: This does not evaluate the response, as the response
      //       has a very different structure then the original structure
      // TODO HHE Check, if structures can be unified
      //          (i.e. first transform response to simple array or make hashMap with books instead of array)
      this.setState((previousState) => {
        return {
          books: previousState.books.map((newBook) => {
            if (newBook.id === book.id) {
              newBook.shelf = newShelf
            }
            return newBook;
          })
        }
      });
    })
      .catch((error) => (
        console.log(error)
      ))
  };

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
              <ol className="books-grid">TODO</ol>
            </div>
          </div>
        ) : (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
                {
                  this.state.sections.filter((section) => !section.hidden).map((section) => (
                    <div key={section.key} className="list-books-content">
                    <ShelfComponent shelf={section}
                                    books={this.state.books.filter((book) => book.shelf === section.key)}
                                    sections={this.state.sections}
                                    onShelfChange={(book, newShelf) => (this.handleShelfChange(book, newShelf))}/>
                    </div>
                  ))
                }
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
