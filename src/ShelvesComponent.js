import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OpenSearchMenuComponent from "./OpenSearchMenuComponent";
import * as BooksAPI from "./BooksAPI";
import ShelfComponent from "./ShelfComponent";

class ShelvesComponent extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    books: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
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

  render() {
    let {actions} = this.props;
    return <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {
          actions.filter((action) => action.isSection).map((section) => (
            <div key={section.key} className="list-books-content">
              <ShelfComponent shelf={section}
                              books={this.props.books.filter((book) => book.shelf === section.key)}
                              actions={actions}
                              onShelfChange={(book, shelfKey) => (this.props.onShelfChange(book, shelfKey)) }/>
            </div>
          ))
        }
      </div>
      <OpenSearchMenuComponent/>
    </div>
  }
}

export  default ShelvesComponent
