import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchComponent from "./SearchComponent";
import ShelvesComponent from "./ShelvesComponent";

class BooksApp extends React.Component {
  state = {
    // Holds the books retrieved from backend
    books: [],
    assignedBooks: {}
  };

  // base data with available actions. The key matches the key of the sections
  availableActions = [
    {
      key: 'currentlyReading',
      name: 'Currently Reading',
      isSection: true
    },
    {
      key: 'wantToRead',
      name: 'Want to Read',
      isSection: true
    },
    {
      key: 'read',
      name: 'Read',
      isSection: true
    },
    // special section to remove book from shelf. Not visible as a section (thus: hidden === false)
    {
      key: '',
      name: 'None',
      isSection: false
    }
  ];

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
  transformUpdateResponseToHashmap(updateResponse) {
    let hashMap = {};
    Object.getOwnPropertyNames(updateResponse).forEach((val) => {
      updateResponse[val].reduce((hashMap, id) => {
        hashMap[id] = val;
        return hashMap
      }, hashMap)
    });
    return hashMap
  }

  // This method moves the book to another shelf.
  // If the book is not yet in a shelf, it sill be added to list of available books (i.e. the props.books array)
  // it is important, that the hashmap of the assignedBooks is updated as well. It is being used by the search components
  // to figure out, if a book in the search results is already in a shelf
  handleShelfChange = (book, shelfKey) => {

    BooksAPI.update(book, shelfKey)
      .then((response) => {
        if (response.error) {
          console.warn('Error updating backend. Reset books to initial state', response.error);
          this.setInitialState();
          return;
        }
        let hashMap = this.transformUpdateResponseToHashmap(response);
        // Update state with the shelf information of the backend
        // As the information from the backend is a list of shelf assignment and not (as could be expected)
        // be "only" the updated book, it must be assumed, that other books have been moved around
        // Note: There are currently no integrity checks
        // (e.g. a book is in the shelf list that was never retrieved)
        this.setState((previousState) => {
          // If the book cannot be found in the current list of books, add it
          if(previousState.books.filter((existingBooks) => existingBooks.id === book.id).length === 0) {
            previousState.books.push(book)
          }
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
        <Route exact path="/search" render={() => (
          <SearchComponent
            shelvedBooks={this.state.books}
            actions={this.availableActions}
            onShelfChange={(book, shelfKey) => (this.handleShelfChange(book, shelfKey))}/>
        )}/>
        <Route exact path="/" render={() => (
          <ShelvesComponent
            books={this.state.books}
            actions={this.availableActions}
            onShelfChange={this.handleShelfChange}
            onShelfChange2={(book, shelfKey) => (this.handleShelfChange(book, shelfKey))}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
