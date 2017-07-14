import React from 'react';
import {shallow, mount} from 'enzyme';

jest.mock('./BooksAPI');  // mock the BooksAPI
// import * as BooksAPI from './BooksAPI'

import Search from './Search'

describe('Search component', () => {
  const shelvedBooks = [];
  const actions = [];
  const handlerFunction = jest.fn();
  const basicEvent = {
    persist: jest.genMockFn(),
    target: {
      value: 'something'
    }
  };

  // it('failes not', () => {
  //   console.log(BooksAPI);
  //   console.log(BooksAPI.search().then((response) => console.log(response)));
  //   expect(true).toEqual(true);
  // });

  it('sets state to empty array with empty result', (done) => {
    const wrapper = shallow(<Search
      shelvedBooks={shelvedBooks}
      onShelfChange={handlerFunction}
      actions={actions}
    />);
    wrapper.find('input').simulate('change', basicEvent);
    setTimeout(() => {
      console.log('after debounce should have happened');
      done();
    }, 5000);
  }, 6000);
});
