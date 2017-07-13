import React from 'react';
import {shallow, mount} from 'enzyme';

import Book from './Book';

describe('Book component', () => {
  const basicBook = {
    id: 1,
    imageLinks: {
      smallThumbnail: 'https://localhost'
    },
    title: 'react basic book',
    authors: ['author 1']
  };
  const emptyActions = [];
  const emptySelectedAction = {};
  const handlerCallback = jest.fn();

  beforeEach(() => {
    handlerCallback.mockClear();
  });

  it('renders book with core properties', () => {
    const wrapper = shallow(<Book
      book={basicBook}
      actions={emptyActions}
      selectedAction={emptySelectedAction}
      onShelfChange={handlerCallback}
    />);
    expect(wrapper.find('.book-title').text()).toEqual(basicBook.title);
    expect(wrapper.find('.book-authors').text()).toEqual(basicBook.authors[0]);
    expect(wrapper.find('.book-cover').props().style.backgroundImage).toEqual('url(' + basicBook.imageLinks.smallThumbnail + ')');
  });

  describe('render ok with book edge cases', () => {
    let edgeCasesBook;
    beforeEach(() => {
      edgeCasesBook = {
        id: 1,
        imageLinks: {
          smallThumbnail: 'https://localhost'
        },
        title: 'react basic book',
        authors: ['author 1']
      }
    });
    it('renders author name, if author is string, not array', () => {
      edgeCasesBook.authors = 'this is a string';
      const wrapper = shallow(<Book
        book={edgeCasesBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-authors').text()).toEqual(edgeCasesBook.authors);
    });

    it('renders author name as join in array', () => {
      edgeCasesBook.authors.push('author 2');
      const wrapper = shallow(<Book
        book={edgeCasesBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-authors').text()).toEqual(edgeCasesBook.authors.join(', '));
    });
  });

  describe('renders ok with data missing', () => {
    let errorBook;
    beforeEach(() => {
      errorBook = {
        id: 1,
        imageLinks: {
          smallThumbnail: 'https://localhost'
        },
        title: 'react basic book',
        authors: ['author 1']
      }
    });
    it('renders empty backgroundImage, if book has no imageLinks property', () => {
      delete errorBook.imageLinks;
      const wrapper = shallow(<Book
        book={errorBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-cover').props().style.backgroundImage).toEqual('');
    });

    it('renders empty backgroundImage, if book has imageLinks undefined', () => {
      errorBook.imageLinks = undefined;
      const wrapper = shallow(<Book
        book={errorBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-cover').props().style.backgroundImage).toEqual('');
    });

    it('renders empty backgroundImage, if book has imageLinks has falsy smallThumbnail property', () => {
      errorBook.imageLinks.smallThumbnail = undefined;
      const wrapper = shallow(<Book
        book={errorBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-cover').props().style.backgroundImage).toEqual('');
    });

    it('renders empty authors element, if book has no authors property', () => {
      delete errorBook.authors;
      const wrapper = shallow(<Book
        book={errorBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-authors').text()).toEqual('');
    });

    it('renders empty authors element, if book has empty authors array', () => {
      errorBook.authors = [];
      const wrapper = shallow(<Book
        book={errorBook}
        actions={emptyActions}
        selectedAction={emptySelectedAction}
        onShelfChange={handlerCallback}
      />);
      expect(wrapper.find('.book-authors').text()).toEqual('');
    });
  })

});
