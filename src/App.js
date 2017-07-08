import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import ShelfComponent from './ShelfComponent';
import OpenSearchMenuComponent from "./OpenSearchMenuComponent";
import SearchComponent from "./SearchComponent";

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
    this.setInitialState();
  }

  // Sets the initial state by loading all books from backend
  // and simply setting the state object for the books
  setInitialState = function () {
    BooksAPI.getAll().then((response) => {
      this.setState({books: response});
    })
  };

  /* This function transforms the update response from the backend.
   Backend response is {shelfName: [id1, id2, ...]
   Result will be {id1: shelfName, id2: shelfName}
   Can be used as lookup table
   */
  transformUpdaateResponseToHashmap(updateResponse) {
    let hashMap = {};
    Object.getOwnPropertyNames(updateResponse).forEach((val) => {
      updateResponse[val].reduce((hashMap, id) => {
        hashMap[id] = val;
        return hashMap
      }, hashMap)
    });
    return hashMap
  }

  handleShelfChange = function (book, newShelf) {
    BooksAPI.update(book, newShelf).then((response) => {
      if (response.error) {
        console.warn('Error updating backend. Reset books to initial state', response.error);
        this.setInitialState();
        return;
      }
      let hashMap = this.transformUpdaateResponseToHashmap(response);
      this.setState((previousState) => {
        return {
          books: previousState.books.map((newBook) => {
            newBook.shelf = hashMap[newBook.id];
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
        <Route exact path="/search" component={ SearchComponent }/>
        <Route exact path="/" render={() =>(
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
            <OpenSearchMenuComponent/>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
