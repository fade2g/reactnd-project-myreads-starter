import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuActionComponent from './MenuActionComponent';


class BookComponent extends Component {
  static propTypes = {
    bookTitle: PropTypes.string.isRequired,
    bookAuthors: PropTypes.array.isRequired,
    bookImage: PropTypes.string.isRequired,
    actions: PropTypes.array,
    selectedActionKey: PropTypes.string
  };

  handleChange(event) {
    // TODO HHE Implement
    console.log(event.target.value)
  }

  render() {
    console.log(this.props.actions);
    return <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${this.props.bookImage})`
        }}/>
        <div className="book-shelf-changer">
          <select onChange={this.handleChange}>
            <option value="none" disabled>Move to...</option>
            {this.props.actions.map((action) => (
              <MenuActionComponent key={action.key} name={action.name} value={action.key} disabled={action.key === this.props.selectedActionKey}/>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{this.props.bookTitle}</div>
      <div className="book-authors">{this.props.bookAuthors.join(', ')}</div>
    </div>
  }
}

export default BookComponent;
