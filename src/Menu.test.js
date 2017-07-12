import React from 'react';
import {shallow, mount} from 'enzyme';

import Menu from './Menu';

describe('MenuComponent', () => {
  const basicBook = {id: 1};
  const handlerCallback = jest.fn();

  beforeEach(() => {
    handlerCallback.mockClear();
  });

  it('renders Move to... node', () => {
    const actions = [];
    const selectedAction = {};

    const wrapper = shallow(<Menu
      book={basicBook}
      actions={actions}
      selectedAction={selectedAction}
      onMenuAction={handlerCallback}
    />);
    expect(wrapper.find('option').length).toEqual(1);
    expect(wrapper.find('option').prop('value')).toEqual('none');
    expect(wrapper.find('option').prop('disabled')).toEqual(true);
  });

  it('renders several actions', () => {
    const actions = [{key: 'one', name: 'ONE'}];
    const selectedAction = {};

    const mounted = mount(<Menu
      book={basicBook}
      actions={actions}
      selectedAction={selectedAction}
      onMenuAction={handlerCallback}
    />);

    expect(mounted.find('option').length).toEqual(2);
    expect(mounted.find('[value="' + actions[0].key + '"]').length).toBe(1);
    expect(mounted.find('[value="' + actions[0].key + '"]').prop('value')).toEqual(actions[0].key);
  });

  it('calls onShelfChange handler when value changes', () => {
    const actions = [{key: 'one', name: 'ONE'}];
    const selectedAction = {};

    const mounted = mount(<Menu
      book={basicBook}
      actions={actions}
      selectedAction={selectedAction}
      onMenuAction={handlerCallback}
    />);

    // trigger change event on option. This is propagated to the select element and then the onShelfChange callback
    // is called
    mounted.find('[value="' + actions[0].key + '"]').simulate('change');
    expect(handlerCallback.mock.calls[0]).toEqual(expect.arrayContaining([actions[0].key, basicBook]));
  });
});
