import React, {Component} from 'react';
import PropTypes from 'prop-types';
import OpenSearchMenu from "./OpenSearchMenu";
import Shelf from "./Shelf";

class Shelves extends Component {

  //noinspection JSUnusedGlobalSymbols
  static propTypes = {
    books: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
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
              <Shelf shelf={section}
                              books={this.props.books.filter((book) => book.shelf === section.key)}
                              actions={actions}
                              onShelfChange={(book, shelfKey) => (this.props.onShelfChange(book, shelfKey)) }/>
            </div>
          ))
        }
      </div>
      <OpenSearchMenu/>
    </div>
  }
}

export  default Shelves
