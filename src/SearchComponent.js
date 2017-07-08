import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchComponent extends Component {

  state = {
    searchTerm: '',
    foundBooks: []
  };

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value});
    BooksAPI.search(this.state.searchTerm, 20).then((response) => {
      this.setState({books: response});
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
        <ol className="books-grid">TODO</ol>
      </div>
    </div>
  }
}

export default SearchComponent;
